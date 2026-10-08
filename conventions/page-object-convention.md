# Page-object convention

Compiled from the lesson "Page Object Design and Generation". The workshop CLI reads these files — the convention is a contract, not a style preference.

## Naming
- Class: `PascalCase` + `Page` (`CartPage`) or `Component` (`CartItemComponent`).
- Locator fields: `readonly`, `camelCase`, a descriptive noun for the element's purpose (`checkoutButton`, not `greenButton`).
- Methods: `camelCase`, verb-first, describing the action (`addToCart()`, `selectStatus()`), never the element (`submitButton()`).

## Locators — in this order of preference
1. `data-testid`
2. ARIA role + accessible name (`getByRole('button', { name: 'Apply filters' })`)
3. Stable visible text
4. Structural CSS — only when nothing above exists, and then request a `data-testid` from the dev team in a comment.
Never invent a selector that is not in the DOM.

## Methods
- One action per method. `addItemAndCheckout()` is two methods.
- A method that stays on the page returns `this` or `Promise<void>`; a getter returns the value read from the page.
- A method that navigates returns the destination page object.
- Explicit waits live inside the method that triggers the state change.
- **No assertions.** No `expect()`, and no method that decides what "correct" looks like (`isTotalCorrect()`). Returning state (`getTotal()`) is fine; judging it is the test's job.

## Scope — the three defects
- **Too broad** — the class models a region that belongs to another page (a different URL or screen).
- **Too fragmented** — element-level objects the test has to orchestrate; a user-meaningful action has no single method.
- **Missing abstraction** — a repeated structure (rows, cards) handled as flat indexed locators instead of a component.
Scope decisions can differ and still be right; what cannot be missing is the reason.
