import Image from "next/image";
import { formatPrice, getProducts } from "@/lib/woocommerce";

export default async function Home() {
  const products = await getProducts();
  return (
    <main>
      <div className="announcement">SLOW OBSSESSION™ — BUILT AROUND THE CULTURE</div>
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="UNRUSH home">UN<span>R</span>USH<span className="tm">™</span></a>
        <nav><a href="#shop">SHOP</a><a href="#manifesto">MANIFESTO</a><a href="https://www.instagram.com/unrushco/" target="_blank" rel="noreferrer">INSTAGRAM ↗</a></nav>
        <a className="bag" href="https://unrush.com.br/carrinho/">BAG <span>↗</span></a>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">AUTOMOTIVE CULTURE / EST. CURITIBA</p>
          <h1>NO RUSH.<br/><em>ALL IN.</em></h1>
          <p className="hero-description">Not made to follow. Made for those who live every detail.</p>
          <a className="primary-link" href="#shop">EXPLORE THE DROP <span>↘</span></a>
        </div>
        <div className="hero-art" aria-label="UNRUSH visual identity">
          <div className="orbit orbit-one"/><div className="orbit orbit-two"/>
          <div className="hero-stamp">SLOW<br/>OBSESSION<span>™</span></div>
          <div className="hero-index">UR—001<br/>43°18' S / 65° W</div>
          <div className="hero-vertical">DRIVE YOUR OWN PACE</div>
        </div>
        <div className="hero-bottom"><span>INDEPENDENT APPAREL LABEL</span><span>CURITIBA — BRASIL</span><span>SCROLL TO DISCOVER ↓</span></div>
      </section>

      <section className="ticker"><div>BUILT NOT BOUGHT ✳ SLOW OBSESSION™ ✳ BUILT NOT BOUGHT ✳ SLOW OBSESSION™ ✳</div></section>

      <section className="shop-section" id="shop">
        <div className="section-heading"><div><p className="eyebrow">01 / THE COLLECTION</p><h2>SELECTED<br/><em>GOODS.</em></h2></div><p className="section-note">Pieces for the ones who<br/>know what moves them.</p></div>
        {products.length ? <div className="product-grid">{products.map((product) => (
          <a className="product-card" href={product.permalink} key={product.id}>
            <div className="product-image">{product.images[0] ? <Image src={product.images[0].src} alt={product.images[0].alt || product.name} fill sizes="(max-width: 700px) 50vw, 25vw" /> : <div className="image-placeholder">UNRUSH</div>}<span className="product-arrow">↗</span></div>
            <div className="product-meta"><h3>{product.name}</h3><span>{formatPrice(product)}</span></div>
            <p className="product-state">{product.is_in_stock ? "AVAILABLE NOW" : "SOLD OUT"}</p>
          </a>
        ))}</div> : <div className="catalog-empty"><span>CATALOG CONNECTION</span><p>Estamos preparando a próxima seleção.</p><small>O catálogo da loja será carregado automaticamente do WooCommerce.</small></div>}
        <a className="all-products" href="https://unrush.com.br/loja/">VIEW ALL PRODUCTS <span>↗</span></a>
      </section>

      <section className="manifesto" id="manifesto">
        <p className="eyebrow">02 / THE MINDSET</p>
        <h2>IT'S NOT ABOUT<br/>GETTING THERE.<br/><em>IT'S ABOUT THE WAY.</em></h2>
        <div className="manifesto-foot"><span>UNRUSH — SLOW OBSESSION™</span><p>Automotive roots. Streetwear attitude.<br/>A culture built around the details.</p></div>
      </section>

      <footer><a className="wordmark" href="/">UN<span>R</span>USH<span className="tm">™</span></a><span>© 2026 UNRUSH. SLOW OBSESSION™.</span><a href="https://www.instagram.com/unrushco/" target="_blank" rel="noreferrer">FOLLOW THE CULTURE ↗</a></footer>
    </main>
  );
}