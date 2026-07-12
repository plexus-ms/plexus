// The ISR cache dies with the container, reverting docs to build-time content on restart.
// Self-revalidate on boot so every container start refreshes the compendium from GitHub.
export function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;
  const token = process.env.REVALIDATE_TOKEN;
  if (!token) return;
  const port = process.env.PORT ?? '3000';

  void (async () => {
    for (let attempt = 1; attempt <= 5; attempt++) {
      // register() runs before the server listens; wait, then retry with backoff.
      await new Promise((resolve) => setTimeout(resolve, attempt * 2000));
      try {
        const res = await fetch(`http://127.0.0.1:${port}/compendium/revalidate`, {
          method: 'POST',
          headers: { authorization: `Bearer ${token}` },
        });
        if (res.ok) return;
      } catch {
        // Server not listening yet.
      }
    }
    console.error('compendium: startup revalidation failed');
  })();
}
