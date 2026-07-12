import type { CompendiumSource } from './compendium';

const REPO = 'plexus-ms/compendium';
const REF = process.env.COMPENDIUM_REF ?? 'main';

const TOKEN = process.env.GITHUB_TOKEN;

interface TreeEntry {
  path: string;
  type: string;
}

// All compendium fetches share one cache tag so POST /compendium/revalidate can purge them together.
export const CACHE_TAG = 'compendium';

// Parallel prerender workers can burst enough requests to draw transient 429/403 rate limits from GitHub.
async function fetchWithRetry(url: string, accept?: string): Promise<Response> {
  const headers: Record<string, string> = {};
  if (TOKEN) headers.authorization = `Bearer ${TOKEN}`;
  if (accept) headers.accept = accept;
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(url, { headers, cache: 'force-cache', next: { tags: [CACHE_TAG] } });
    const rateLimited = res.status === 429 || res.status === 403;
    if (res.ok || attempt >= 4 || (!rateLimited && res.status < 500)) return res;
    const retryAfter = Number(res.headers.get('retry-after')) || 2 ** attempt;
    await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
  }
}

async function list(): Promise<string[]> {
  const res = await fetchWithRetry(`https://api.github.com/repos/${REPO}/git/trees/${REF}?recursive=1`);
  if (!res.ok) throw new Error(`Compendium tree fetch failed: ${res.status} ${res.statusText}`);
  const { tree } = (await res.json()) as { tree: TreeEntry[] };
  return tree.filter((entry) => entry.type === 'blob' && /\.mdx?$/.test(entry.path)).map((entry) => entry.path);
}

// With a token, the API contents endpoint allows 5000 req/h; the anonymous raw CDN rate-limits bursts per IP.
async function read(path: string): Promise<string> {
  const res = TOKEN
    ? await fetchWithRetry(
        `https://api.github.com/repos/${REPO}/contents/${path}?ref=${REF}`,
        'application/vnd.github.raw+json',
      )
    : await fetchWithRetry(`https://raw.githubusercontent.com/${REPO}/${REF}/${path}`);
  if (!res.ok) throw new Error(`Compendium fetch failed for ${path}: ${res.status} ${res.statusText}`);
  return res.text();
}

export const githubSource: CompendiumSource = { list, read };
