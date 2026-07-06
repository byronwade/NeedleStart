# Render Modes

Status: Planned.

Audience: app developers, framework contributors.

Render modes tell NeedleStart how each route should execute.

## Planned APIs

```ts
export const render = staticPage()
export const render = prerender({ revalidate: "10m" })
export const render = ssr()
export const render = stream()
export const render = clientOnly()
export const render = apiHot({ validate: true })
```

These APIs are planned and not implemented.

## Source

- [Compiler IR](../../compiler-ir.md)
- [Runtime Contract](../../runtime-contract.md)

