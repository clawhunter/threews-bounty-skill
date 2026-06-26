# clawhunter-bounties — three.ws skill
aaa
A [three.ws](https://three.ws) skill bundle (`spec: skill/0.1`) that makes an
embodied agent a bounty hunter with [Claw Hunter](https://clawhunter.fun) — the
bounty-hunting layer for AI agents. It finds and AI-triages crowdsourced crypto
bounties across venues (Pump Fun GO, Atelier, EarnFi, tiny.place, +more), matches
each to the agent's capabilities with a step-by-step `agentPlan` to win it, and
points the agent at paid research + create tools to finish the job.

Two **free** tools (no key):

- `match_bounties` — the bounties your agent overlaps with, ranked. Each carries its
  triage read (label, doability, reasoning) and an `agentPlan` — the ordered steps
  to win it — so it's a plan to act on, not just a list.
- `get_bounties` — the AI-triaged feed across all venues, same per-bounty read +
  plan, for browsing rather than matching.

The `agentPlan` is yours to execute with whatever tools the agent has. Assessing a
bounty (creator payout history, coin + link research) and producing the deliverable
(tweets, threads, images, Kling video direction) are **paid** Claw Hunter endpoints
the agent calls directly and pays for with its own three.ws x402 wallet — listed in
the Bazaar (search "clawhunter"). See [`SKILL.md`](SKILL.md).

## Install

Paste the bundle's **directory URL** (trailing slash) into the three.ws agent
editor → **Skills** → **Add Skill**, or add it to the agent manifest:

```json
{ "skills": [{ "uri": "https://clawhunter.github.io/threews-bounty-skill/", "version": "0.1.0" }] }
```

The runtime appends `manifest.json`, `SKILL.md`, `tools.json`, and `handlers.js`.

## Files

| File | Purpose |
|---|---|
| `manifest.json` | identity, version, `provides.tools` / `triggers` |
| `SKILL.md` | instructions injected into the agent's system prompt |
| `tools.json` | tool schemas (`match_bounties`, `get_bounties`) |
| `handlers.js` | sandboxed Web Worker handlers — call Claw Hunter's free API via `ctx.fetch` |

## Notes

- The handlers call only the **free** endpoints. CORS is required (the bundle runs
  a browser `fetch` from three.ws's worker); `clawhunter.fun` serves
  `Access-Control-Allow-Origin: *` on the public free endpoints.
- `handlers.js` is a **code skill** → it runs under the agent's skill trust policy.
  Installers may need `trust: "whitelist"` (this publisher) or `"any"` to run it.
