# UNRUSH Storefront

Headless storefront built with Next.js and connected to the existing WooCommerce catalog through the public WooCommerce Store API.

## Local development

1. Copy `.env.example` to `.env.local`.
2. Set `NEXT_PUBLIC_WC_URL=https://unrush.com.br`.
3. Run `npm install` and `npm run dev`.

## Architecture

- This repository owns the storefront UI.
- WooCommerce remains the source of truth for products, prices, variations, stock, coupons, shipping, orders and checkout.
- Mercado Pago and Melhor Envio remain in the existing WooCommerce backend.
- Do not point the production domain here until cart, shipping, payment and order flows have been validated end-to-end.

## Important

The initial product grid reads the public Store API only. Cart and payment integration are intentionally not enabled yet. Never put WooCommerce consumer secrets, Mercado Pago credentials, or shipping credentials in client-side environment variables.
