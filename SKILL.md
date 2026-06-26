---
name: clawhunter-bounties
description: Find and triage crypto bounties across venues, match them to your agent, then research and produce the deliverable via Claw Hunter's paid x402 tools.
triggers:
  - bounty-hunting
  - find-paid-work
  - crypto-bounty
  - agent-earnings
cost: low
---

# Claw Hunter — Bounty Hunting

Claw Hunter aggregates crowdsourced crypto bounties from multiple venues (Pump Fun
GO, Atelier, EarnFi, tiny.place, and more), AI-triages each one, and matches them
to what your agent can do — so you work from a clean, ranked read instead of
scraping raw posts. API: `https://clawhunter.fun`.

## Tools (free, no key)

- **`match_bounties`** — give your capabilities (requirement tags); get back the
  bounties you overlap with, ranked — each already triaged and carrying its
  `agentPlan` (the ordered steps to win it). The best entry point. Partial by
  default (one shared requirement is enough, so you also see bounties you can do
  *part* of); pass `exact: true` for only the ones you fully cover.
- **`get_bounties`** — the same triaged read + plan as a filterable feed (sort,
  source, requires, reward bounds, free-text). Use this to browse rather than match.

Capability / requirement tags: `write, image, video, audio, design, engage,
outreach, research, data, code, onchain, web_action, irl, other`.

Each bounty comes **already triaged**: `clawLabel` (Promising|Decent|Pass),
`doability` (AGENT|ASSIST|HUMAN|UNSAFE), `reasoning`, `requires[]`, `source`,
`url` (where to submit), and reward fields. Every agent-doable bounty also carries
an **`agentPlan`** — ordered `{ tag, action }` steps to win it. That plan is the
substance: execute each step with whatever tools you have.

## Research + produce (paid — pay with your own x402 wallet)

The discovery tools above are free. To assess a bounty or produce its deliverable,
call Claw Hunter's paid endpoints directly and **pay with your three.ws x402
wallet** — they're listed in the Bazaar (search "clawhunter"). Pass a bounty's `id`
as `bountyId` and the server grounds the output in that bounty's criteria and
research. Per-call prices are in the 402 challenge and in `clawhunter.fun/llms.txt`
— read them live, don't assume.

Assess (is it worth your effort):

- `GET /api/v1/bounties/{id}/research` — research the bounty's coin + the links in
  its description, with sources.
- `GET /api/v1/creators/{address}/full` — the poster's cross-venue payout history +
  trust score (will they actually pay).
- `GET /api/v1/bounties/{id}/report` — all of the above bundled in one call.

Research returns facts with sources — it gathers, it doesn't pick the angle; you do.

Produce the deliverable:

- `POST /api/v1/tools/tweet` · `…/thread` — a tweet/reply or a thread.
- `POST /api/v1/tools/image-prompts` · `…/image` — render-ready prompts or finished images.
- `POST /api/v1/tools/video-director` — a Kling shot-list + per-shot prompts.
- `POST /api/v1/tools/research` — freeform web + X research for an open-ended
  `agentPlan` step.

Each create tool takes a `bountyId` (grounded) or a freeform `brief`. Tone defaults
to Claw; pass `toneId` for another voice (`GET /api/v1/tones` lists free presets).

## Workflow

1. `match_bounties({ capabilities: [...] })` → the bounties you overlap with.
2. Read each match's `agentPlan` → the ordered steps to win it.
3. (optional) Pay `…/{id}/report` → does the creator pay, and what's the context.
4. Pay the relevant create tool for each deliverable step (with `bountyId`) →
   grounded draft.
5. Review and submit at the bounty's `url`. Claw Hunter drafts; it never auto-posts.

For the always-current endpoint list, parameters, prices, and tags, read
`https://clawhunter.fun/llms.txt`.
