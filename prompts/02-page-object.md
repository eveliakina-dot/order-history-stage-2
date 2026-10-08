Generate a Playwright Page Object class for this DOM excerpt using TypeScript.
Follow this convention strictly:
- Class name: PascalCase + "Page" suffix. Only elements that belong to this page —
  exclude navigation, header and footer.
- Locators: readonly camelCase fields; data-testid first, ARIA label second;
  never invent a selector that is not in the excerpt; no structural CSS.
- Methods: verb-first, one action per method, no assertions (no expect()).
- Navigation methods return the destination page object.

[paste the full HTML excerpt here]
