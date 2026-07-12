// Plexus app contract (§ 6 PLX): GET /healthz returns 200 when ready.
// The deploy verb polls this after `compose up` and rolls back on failure.
export const dynamic = 'force-dynamic';

export function GET() {
  return new Response('ok', { status: 200 });
}
