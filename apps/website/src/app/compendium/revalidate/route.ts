import { revalidateTag } from 'next/cache';
import { CACHE_TAG } from '../github-source';

// Called by the compendium repo's notify-website workflow after a docs push, so the running
// instance re-fetches content from GitHub without a redeploy.
export async function POST(request: Request) {
  const token = process.env.REVALIDATE_TOKEN;
  if (!token) return new Response('Revalidation is not configured', { status: 503 });
  if (request.headers.get('authorization') !== `Bearer ${token}`) {
    return new Response('Unauthorized', { status: 401 });
  }
  revalidateTag(CACHE_TAG, 'max');
  return Response.json({ revalidated: true });
}
