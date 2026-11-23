# UNRUSH — Ecommerce launch checklist

This checklist is the release gate. A successful Vercel build is not equivalent to a fully tested ecommerce release. The production domain must remain on the current WooCommerce storefront until all required checks below pass.

## 1. Storefront experience
- [x] Rebuild the official editorial homepage structure and visual language.
- [x] Replace ultra-condensed display typography with a more legible Barlow + DM Sans system.
- [x] Use one shared header, navigation, footer and mobile navigation across home, catalogue and product pages.
- [x] Responsive catalogue, search and category filters.
- [x] Product detail page with image gallery, product information and related products.
- [x] Keyboard-visible focus states and reduced-motion handling in the existing design system.
- [ ] Visual review at 360px, 390px, 768px, 1024px and 1440px.
- [ ] Test iOS Safari, Android Chrome and desktop Chrome/Firefox/Safari.
- [ ] Verify image crops, font loading and layout shift with real devices.

## 2. Product data and merchandising
- [x] Catalogue reads product data from WooCommerce Store API.
- [x] Product page reads price, images, description, options and stock state from WooCommerce.
- [x] Honda NSX is featured and visible in catalogue at R$ 79,90.
- [x] Honda NSX variation prices set to R$ 79,90 for P, M, G and GG.
- [x] Do not display XG as purchasable: no XG variation exists in WooCommerce.
- [ ] Audit every published product for price, images, SKU, category, variation and stock consistency.
- [ ] Confirm product descriptions, sizing guidance, fabric, measurements and care instructions.
- [ ] Confirm every product card and detail page uses the intended front/back image order.

## 3. Cart, checkout and payment
- [x] Keep WooCommerce as the system of record.
- [x] Preserve the existing WooCommerce cart and checkout as the payment handoff.
- [x] Add-to-cart URL carries parent product, variation ID, attribute and quantity.
- [ ] End-to-end test each NSX size add-to-cart against a real WooCommerce session.
- [ ] Test quantity changes, remove item, cart persistence and empty cart.
- [ ] Test coupons and promotional rules.
- [ ] Test Mercado Pago Pix, credit card and any enabled payment methods in sandbox/test mode.
- [ ] Verify successful, pending, declined, cancelled and expired payment states.
- [ ] Verify order creation, inventory decrement/restock, confirmation page and transactional emails.
- [ ] Test guest checkout and customer-account checkout.

## 4. Shipping and fulfilment
- [x] Keep Melhor Envio and current WooCommerce shipping configuration intact.
- [ ] Test CEP quoting for capitals, interior, remote regions and multiple items.
- [ ] Verify shipping price, delivery estimate, free-shipping threshold and unavailable routes.
- [ ] Verify package weight and dimensions for each product.
- [ ] Test order tracking, fulfilment status and customer notifications.

## 5. Legal, trust and customer support
- [ ] Confirm Privacy Policy, Terms of Use, exchange/return policy and shipping policy are published and linked.
- [ ] Confirm CNPJ/business identity and customer-support contact details.
- [ ] Verify LGPD consent and data-handling disclosures where applicable.
- [ ] Verify refund, cancellation, chargeback and consumer-support procedures.
- [ ] Check footer links, social links and account links on every page.

## 6. Technical quality, SEO and operations
- [x] Next.js production build succeeds on the latest reviewed deployment.
- [x] Shared metadata and product-specific metadata.
- [x] Custom not-found page.
- [ ] Add automated route and interaction tests (home, catalogue, product, cart handoff, checkout handoff).
- [ ] Validate robots.txt, sitemap.xml, canonical URLs, Open Graph and product structured data.
- [ ] Check accessibility with automated audit and keyboard-only navigation.
- [ ] Check performance/Core Web Vitals, image payloads and caching/revalidation.
- [ ] Configure analytics and consent-aware tracking.
- [ ] Configure uptime/error monitoring and review runtime logs.
- [ ] Confirm repository privacy and ensure no API secrets are committed.
- [ ] Verify Vercel environment variables and preview/production separation.
- [ ] Final regression test after all fixes.

## Release rule
Do not point unrush.com.br to the new storefront until all unchecked launch-critical tests are completed, recorded, and signed off. Keep the existing WooCommerce site available as the rollback path.
