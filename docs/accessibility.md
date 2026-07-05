# Accessibility Strategy

NeedleStart is SEO-first, but public pages should not only be crawlable. They should also be semantic, keyboard-friendly, inspectable, and safe for agents to modify without quietly damaging accessibility.

Accessibility behavior is planned. This document defines the target strategy for diagnostics, route checks, agent notes, and examples.

## Goals

- Encourage semantic HTML by default.
- Make accessibility checks visible in diagnostics.
- Keep accessibility tied to route, component, SEO, and map outputs.
- Help agents avoid destructive copy and metadata edits.
- Provide stable JSON output for accessibility findings.
- Avoid claiming full automated accessibility coverage.

## Non-Goals

Initially out of scope:

- Complete WCAG certification.
- Full browser-based accessibility audit engine.
- Visual regression testing.
- Screen reader simulation.
- Automatic remediation for complex UI patterns.
- Replacing human accessibility review.

## Principles

- Semantic HTML first.
- Keyboard access matters.
- Public pages should have clear headings and landmarks.
- Images need useful alt text or intentional decorative marking.
- Forms need labels and error messages.
- Client-only rendering can create accessibility and SEO risk.
- Agent edits must preserve accessibility-related fields.

## Route-Level Checks

Planned checks:

| Check | Purpose |
| --- | --- |
| Heading structure | Detect missing `h1` or suspicious heading jumps. |
| Landmarks | Encourage `main`, `nav`, `header`, and `footer` where appropriate. |
| Image alt text | Detect missing alt text for meaningful images. |
| Link text | Detect empty or vague link text. |
| Form labels | Detect unlabeled form controls. |
| Button names | Detect buttons without accessible names. |
| Client-only risk | Warn when public pages skip meaningful server HTML. |
| Metadata consistency | Ensure SEO title/copy changes do not contradict visible page purpose. |

These checks should start as diagnostics, not as a claim of complete accessibility validation.

## Public Page Expectations

Public indexable routes should prefer:

- One clear `h1`.
- Meaningful server-rendered content.
- Descriptive title and metadata.
- Semantic landmarks.
- Descriptive links.
- Alt text for meaningful images.
- Decorative images marked intentionally.

## Component Contract Integration

Component contracts may eventually include accessibility notes.

Example:

```ts
export default componentContract({
  name: "ProductCard",
  accessibility: {
    imageAltRequired: true,
    interactive: false,
    landmark: false,
  },
})
```

Needle Map can connect components to accessibility impact through semantic edges once contracts exist.

## Agent Context

Route context capsules should eventually include accessibility summary:

```json
{
  "route": "/pricing",
  "accessibility": {
    "status": "warn",
    "checks": {
      "h1": "pass",
      "imageAlt": "warn",
      "linkText": "pass"
    }
  },
  "checks": ["seo", "accessibility", "render"]
}
```

Agents should be instructed not to remove:

- Alt text.
- Labels.
- Landmark elements.
- Visible headings.
- Error message relationships.
- Accessible button or link names.

## Safe Edit Relationship

Safe edits that touch copy, metadata, or structured blocks should preserve accessibility fields.

Examples:

- Updating hero copy must not remove the `h1`.
- Updating image props must preserve or improve alt text.
- Updating CTA copy must keep link purpose clear.
- Adding a form block requires labels and validation messaging.

Medium or high-risk safe edits should be required for structural accessibility changes once safe edit support exists.

## SEO Relationship

Accessibility and SEO overlap, but they are not the same.

Shared concerns:

- Meaningful HTML.
- Clear headings.
- Descriptive links.
- Image text alternatives.
- Page purpose.

SEO checks must not be treated as accessibility proof.

## Diagnostics

Potential diagnostic codes:

| Code | Meaning |
| --- | --- |
| `NS_A11Y_MISSING_H1` | Public page appears to be missing an `h1`. |
| `NS_A11Y_HEADING_JUMP` | Heading levels appear to skip unexpectedly. |
| `NS_A11Y_IMAGE_ALT_MISSING` | Meaningful image appears to be missing alt text. |
| `NS_A11Y_LINK_TEXT_WEAK` | Link text is empty or too vague. |
| `NS_A11Y_FORM_LABEL_MISSING` | Form control lacks a label. |
| `NS_A11Y_BUTTON_NAME_MISSING` | Button lacks accessible name. |
| `NS_A11Y_CLIENT_ONLY_PUBLIC` | Public page is client-only and may lack meaningful initial HTML. |
| `NS_A11Y_SAFE_EDIT_RISK` | Safe edit may remove accessibility-relevant structure. |

## Testing Requirements

Accessibility tests should eventually cover:

- Missing `h1` diagnostics.
- Missing image alt diagnostics.
- Vague link text diagnostics.
- Unlabeled form diagnostics.
- Client-only public page warning.
- Stable JSON output.
- Safe edit preserving alt text.
- Safe edit preserving heading structure.

## Example Requirements

Examples should include accessible patterns:

- `basic`: clear `main` and `h1`.
- `blog-seo`: semantic article structure.
- `ecommerce`: product image alt text.
- `dashboard`: labeled controls.
- `agent-demo`: safe edits that preserve accessibility fields.

## Documentation Rule

Update this file when:

- Route-level diagnostics change.
- SEO checks start reporting accessibility-adjacent warnings.
- Safe edit fields include accessibility-sensitive props.
- Examples add reusable accessibility patterns.
