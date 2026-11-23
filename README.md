# UNRUSH Storefront

Headless Next.js storefront for UNRUSH — Slow Obsession™.

## Architecture

- Next.js/Vercel owns the independent storefront presentation, navigation, catalogue discovery and product storytelling.
- WooCommerce remains the system of record for products, prices, variations, stock, coupons, shipping, orders and customer accounts.
- Product catalogue is read from the public WooCommerce Store API.
- Product purchase continues through the corresponding WooCommerce product page so variation validation, cart session, shipping integrations and payment gateways remain on the existing trusted checkout.
- Cart and checkout routes in this app intentionally hand off to the existing WooCommerce cart and checkout URLs. This preserves the current Mercado Pago and Melhor Envio configuration while the headless cart/checkout integration is validated separately.

## Local development

1. Copy `.env.example` to `.env.local`.
2. Set `NEXT_PUBLIC_WC_URL=https://unrush.com.br`.
3. Run `npm install` and `npm run dev`.

## Safety

Do not change production DNS until preview testing is complete. Do not expose WooCommerce REST consumer secrets, Mercado Pago credentials, shipping credentials, or private API keys in client-side code or public GitHub files.
