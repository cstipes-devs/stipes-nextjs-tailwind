# Flow doc template

Structure for `docs/CRITICAL_FLOWS.md`. Replace bracketed placeholders. Keep
section order stable so regenerating produces a clean diff.

---

```markdown
# Critical Flows — [Project Name]

> **For coding agents:** read this before changing anything under `app/`,
> `lib/`, or `tests/`. Each flow lists invariants that other code and tests
> depend on. If your change alters an invariant, update this document in the
> same change and re-run the smoke suite.

| | |
|---|---|
| Generated | [YYYY-MM-DD] |
| Commit | `[short SHA]` |
| Verified against | [deployed URL, or "source only — not verified against a deployment"] |
| Regenerate with | `/document-flows [url]` |

## Flow summary

| # | Flow | Criticality | Entry point | External deps |
|---|---|---|---|---|
| 1 | [name] | P0 | `[route]` | [service, or "none"] |

## How to use this document

- **Before editing** a file listed under any flow, read that flow's Invariants.
- **When an invariant must change**, change it deliberately: update the
  invariant here, update the covering tests, and note it in the commit.
- **After deploying**, run `SMOKE_BASE_URL=https://<deployment> npm run smoke`.
- **Criticality:** P0 breaks the site for every visitor or depends on an
  external service; P1 is significant but self-contained; P2 is peripheral.

---

## Flow [N]: [Name]

**Criticality:** P[0-2]
**Verified:** [live against <url> on YYYY-MM-DD | source-only]

### What the user does

[Two or three sentences of observable behavior, no implementation detail.]

### Implementation chain

[Ordered path through the code, each step a real file path with what it does.]

1. `[file]` — [role]
2. `[file]` — [role]

### Network and external dependencies

[Each request: method, path, handler, and what it ultimately calls. State
"none — fully static" when there are none.]

### Invariants — do not break these

[The core of the document. Each entry: the constraint, then why it exists.
Anything selected on by a test, any defensive fallback, any status-code
contract, any env var and its default.]

- **[Constraint].** [Why it exists / what breaks without it.]

### Covering tests

| Test | File | What it certifies |
|---|---|---|
| [name] | `[path]` | [assertion] |

### Failure modes

[What a user sees when this flow breaks, and the first place to look.]

---

<!-- manual -->
## Notes

Content between the manual markers is preserved verbatim when this document is
regenerated. Put human-authored context here.

<!-- /manual -->
```

## Rules

- **Every flow needs an Invariants section.** A flow section without one has
  not done its job.
- **File paths must be real and current.** Verify each path exists before
  writing it.
- **Prefer specifics over prose.** `aria-label="Open Stipes bot"` is useful;
  "the chat button has an accessible label" is not.
- **Record drift, do not resolve it.** When live behavior contradicts source,
  write `⚠️ **Drift:** [observed] vs [expected in source]` in that flow.
