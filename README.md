# Chon tiene espacio

Demo web simple de una venta ficticia de espacios publicitarios en el cono y la pechera de Chon.

## Estado real

- Es una aplicación frontend hecha con React y Vite.
- No tiene backend, base de datos, persistencia ni analytics.
- No procesa pagos reales.
- El botón `Pagar con Mercado Pago` abre el aviso final de la demo y no contacta a Mercado Pago.
- Los archivos elegidos se usan sólo para previsualizar el sticker en el navegador.

## Desarrollo

```bash
npm install
npm run dev
```

Para crear y verificar el build:

```bash
npm run build
npm run verify
```

## Estructura

- `src/`: aplicación React y estilos.
- `public/`: favicon, video, foto de Chon y ocho vistas del selector.
- `scripts/verify-production.mjs`: verificación básica del build.

## Licencia y autoría

Proyecto personal de Lucas Malizia.
