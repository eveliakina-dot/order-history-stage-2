# Order History, Stage 2: Page Object from the DOM

⌨️ **Stage 2 of 4.** Your test steps say what a tester does on the order-history page. Now build the class that does it.

The DOM will show you every element on the page. It will not tell you which ones belong together. That part is yours — and it's the part that decides whether a future UI change breaks one place or eleven.

**You'll need:** a fork of `order-history-stage-2` · `dom/order-history.html` · your `tests/steps/TECH-342.md`, copied from your Stage 1 fork into `tests/steps/` · `conventions/page-object-convention.md` · `prompts/02-page-object.md` · `samples/cart-page-*` · a new Claude conversation.


### 1. Read the page, draw the lines

Open `dom/order-history.html`. Read it to the end, including the comments.

In `review-notes.md › Stage 2 › Before generating`, write:
- **Regions → homes.** For each part of the page: stays in `OrderHistoryPage`, becomes a component, or belongs to another page. One line of why, each.
- **The odd one out.** One button has no `data-testid`. Which locator will you use, and what would you ask the devs for?

Then open your Stage 1 steps. Every Action in them needs a method somewhere in your map. Note the ones that don't have an obvious home yet.

### 2. Let Claude draft it

New conversation. Paste `prompts/02-page-object.md` with the DOM in the slot. Nothing else — no map, no hints. You want to see what the model does with the DOM alone.

Save the whole exchange, untouched, as `claude-runs/02-page-object.md`.

### 3. Review the draft — two lenses

**Lens 1, the convention.** One right answer per line. Names, `readonly`, locator style, one action per method, return types, no assertions — it's all in `conventions/page-object-convention.md`, and you've used it before. Two things that models get wrong most often: a selector that isn't in the DOM at all, and a method that *checks* something instead of *doing* something.

**Lens 2, scope.** Defensible answers, reasons required. Too broad? Too fragmented? Missing abstraction? Look at how the draft handled the repeated order rows.

Every finding goes in `Stage 2 › Defects found`: *draft line · what's wrong · what I changed* — and tag it **convention** or **judgment**. If you agree with a scope call the model made, say so; that's a finding too.

### 4. Deliver

`src/pages/OrderHistoryPage.ts`, plus `src/components/<Name>Component.ts` for anything you extracted. Draft-with-fixes or rewrite, your call. Three things the reviewer will hold you to:
- nothing you flagged survives into the files;
- every locator exists in the DOM; the testid-less button gets a role locator and a one-line comment naming the testid you'd request;
- every Stage 1 Action has a method.

### 5. Control pass

`samples/cart-page-ai-draft.ts` is a model's `CartPage` for a page you haven't built. Review it with both lenses. At least three findings in `Stage 2 › Control pass`, at least one of them a scope judgment. No rewrite — just find what's wrong.

### 6. One sentence

`Stage 2 › Hardest call`: the design decision you'd defend most confidently, and why. "I used data-testids" is following a rule. "I extracted the row because it repeats N times" is a decision.

### Submit

Commit, push, submit the repo link. The reviewer reads `src/`, `claude-runs/02-page-object.md` and your Stage 2 notes. Critical comments mean it comes back; fix them, note what changed under *Second pass*, resubmit.

### ✅ Before you submit

- `claude-runs/02-page-object.md` — exact prompt, full response, untouched
- Notes › Before generating — a home for every region, the testid-less button handled
- Class and components follow the convention; every locator is in the DOM; no assertions
- Every extraction made or declined has its one-line reason
- Every Stage 1 Action has a method
- Notes › Defects found — each tagged convention/judgment, each fixed in the files
- Notes › Control pass — 3+ findings, at least one scope judgment
- Notes › Hardest call — one decision, one structural reason
