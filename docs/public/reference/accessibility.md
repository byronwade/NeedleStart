# Accessibility

Status: Planned.

Audience: app developers, docs site builders, framework contributors, AI agents.

NeedleStart accessibility tooling is planned but not implemented yet. This page summarizes the public accessibility expectations for future examples, generated pages, and docs.

## Target

NeedleStart should target WCAG 2.2 AA for official examples, generated starter pages, and public docs pages once implementation exists.

This is not a conformance claim. Do not treat any NeedleStart page as WCAG-verified until tests and review evidence exist.

## Planned Defaults

Official examples should eventually use:

- Semantic HTML before ARIA.
- Logical headings.
- Descriptive links.
- Native links and buttons.
- Labels for form controls.
- Visible focus states.
- Keyboard-operable interactive UI.
- Accessible form errors.
- Meaningful alt text for informative images.
- Reduced-motion support for non-essential animation.

## Planned Checks

Future checks should cover:

- Heading order.
- Link text.
- Image alt text.
- Form labels and error messages.
- Keyboard navigation.
- Route transition focus behavior.
- Invalid ARIA.
- Public HTML smoke checks.

## Current Reality

The repository is still Phase 0. Accessibility diagnostics, browser tests, route focus behavior, and generated reports do not exist yet.

## Related

- [Accessibility Contract](../../accessibility-contract.md)
- [Testing](testing.md)
- [SEO](seo.md)
- [Diagnostics](diagnostics.md)
