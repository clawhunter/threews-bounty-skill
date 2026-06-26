// Claw Hunter — three.ws bounty-hunting handlers.
//
// Runs in three.ws's sandboxed Web Worker: no window/import, network only via
// ctx.fetch (browser fetch — CORS applies). These call Claw Hunter's FREE
// discovery endpoints only; research + create tools are paid and the agent calls
// them directly with its own x402 wallet (see SKILL.md).

const BASE = "https://clawhunter.fun";

// Accept a string or string[] for comma-list params.
function csv(v) {
  return Array.isArray(v) ? v.join(",") : v;
}

// GET /api/v1/bounties — the ranked, triaged feed.
export async function get_bounties(args, ctx) {
  try {
    const a = args || {};
    const q = new URLSearchParams();
    if (a.sort) q.set("sort", a.sort);
    if (a.types) q.set("types", csv(a.types));
    if (a.source) q.set("source", csv(a.source));
    if (a.requires) q.set("requires", csv(a.requires));
    if (a.requiresAll) q.set("requiresAll", "true");
    if (a.minReward != null) q.set("minReward", String(a.minReward));
    if (a.maxReward != null) q.set("maxReward", String(a.maxReward));
    if (a.q) q.set("q", a.q);
    q.set("limit", String(a.limit ?? 20));

    const res = await ctx.fetch(`${BASE}/api/v1/bounties?${q.toString()}`);
    if (!res.ok) return { ok: false, error: `Feed returned ${res.status}` };
    const data = await res.json();
    const bounties = data.bounties || [];
    return { ok: true, count: bounties.length, bounties };
  } catch (err) {
    return { ok: false, error: `Failed to fetch bounties: ${err.message}` };
  }
}

// POST /api/v1/match — bounties matched to the agent's capabilities.
export async function match_bounties(args, ctx) {
  try {
    const a = args || {};
    if (!a.capabilities || !a.capabilities.length) {
      return { ok: false, error: 'capabilities is required, e.g. ["write","image"]' };
    }
    const body = { capabilities: a.capabilities };
    if (a.exact != null) body.exact = a.exact;
    if (a.source) body.source = a.source;
    if (a.minReward != null) body.minReward = a.minReward;
    if (a.canDoRealWorld != null) body.canDoRealWorld = a.canDoRealWorld;
    if (a.limit != null) body.limit = a.limit;

    const res = await ctx.fetch(`${BASE}/api/v1/match`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) return { ok: false, error: `Match returned ${res.status}` };
    const data = await res.json();
    const matches = data.matches || [];
    return { ok: true, count: data.count ?? matches.length, matches };
  } catch (err) {
    return { ok: false, error: `Failed to match bounties: ${err.message}` };
  }
}
