# Reto Técnico

App de cotización de seguros construida con **Next.js 16**, **React 19**, **TypeScript** y **Tailwind v4**, usando el design system **Ride** de Rimac.

## Requisitos

- Node.js 20+
- [pnpm](https://pnpm.io/) 10+

## Instalación

```bash
pnpm install
```

## Ejecución

Modo desarrollo:

```bash
pnpm dev
```

La app queda disponible en [http://localhost:3000](http://localhost:3000).

## Build de producción

```bash
pnpm build
pnpm start
```

## Estructura

```
app/
├── cotizacion/   Formulario inicial
├── productos/    Selección de plan
├── resumen/      Resumen final
├── components/   PageHeader, StepNav
└── lib/          store, helpers
```
