import type {StoreProduct} from "@/lib/woocommerce";
import {SiteHeader,SiteFooter,ShopCatalog} from "@/components/storefront-shared";

const media={
 hero:{src:"https://unrush.com.br/wp-content/uploads/2023/09/9a875e90-af5e-43e7-ab29-0f1cc72a945a-819x1024.png",srcSet:"https://unrush.com.br/wp-content/uploads/2023/09/9a875e90-af5e-43e7-ab29-0f1cc72a945a-768x960.png 768w, https://unrush.com.br/wp-content/uploads/2023/09/9a875e90-af5e-43e7-ab29-0f1cc72a945a-819x1024.png 819w"},
 manifesto:"https://unrush.com.br/wp-content/uploads/2023/09/0a610f0d-5ba5-4973-9cb7-0db4d88284d2-819x1024.png",
 garage:[
  ["https://unrush.com.br/wp-content/uploads/2023/09/6891f3f4-067d-4d41-911d-34e4cf9fb30b-1024x1024.png","01","O UNIVERSO UNRUSH"],
  ["https://unrush.com.br/wp-content/uploads/2023/09/dc3edaf7-dd10-4d06-8bc7-e43e29fb71c0-768x960.png","02","GARAGE FILES"],
  ["https://unrush.com.br/wp-content/uploads/2023/09/ce1e910c-bd36-4832-9ba2-b18346481e93-768x960.png","03","SLOW OBSESSION"]
 ],
 closing:"https://unrush.com.br/wp-content/uploads/2026/09/ChatGPT-Image-23-de-set.-de-2026-11_16_49-768x960.png"
};

export default function HomePage({products}:{products:StoreProduct[]}) {
 return <div id="unrush-storefront">
  <SiteHeader/>
  <main id="conteudo">
   <section className="unr-hero" aria-labelledby="unr-hero-title"><div className="unr-hero-content unr-container">
    <div className="unr-hero-copy">
     <p className="unr-eyebrow unr-hero-kicker"><span className="unr-dot"/>UNRUSH / DROP 001 / 2026</p>
     <h1 id="unr-hero-title">CARROS<br/>NUNCA<br/>FORAM <em>SÓ</em><br/>CARROS<span className="unr-period">.</span></h1>
     <p className="unr-hero-descr">Streetwear brasileiro para quem vive a rua, a garagem e a obsessão pelos detalhes.</p>
     <div className="unr-hero-ctas"><a className="unr-button" href="#drop">EXPLORAR O DROP <span className="unr-button-icon">↗</span></a><a href="#manifesto" className="unr-hero-textlink">CONHEÇA A UNRUSH <span>→</span></a></div>
     <div className="unr-hero-bottom"><span>SLOW OBSESSION™</span><span>01 / 04 — PRIMEIRO CAPÍTULO</span></div>
    </div>
    <div className="unr-hero-art" aria-label="Campanha editorial UNRUSH"><div className="unr-hero-photo"><img src={media.hero.src} srcSet={media.hero.srcSet} sizes="(max-width:680px) 100vw,45vw" width="819" height="1024" alt="UNRUSH — fotografia editorial da campanha, ensaio 01" fetchPriority="high"/></div><span className="unr-art-top">GARAGE FILES / 001</span><span className="unr-art-stamp">NÃO É STATUS. É PAIXÃO.</span><div className="unr-hero-art-number">01<span>/ 08</span></div></div>
   </div></section>
   <div className="unr-marquee" aria-label="Slow Obsession — Garage Files — Curitiba — Community Over Status"><div className="unr-marquee-track">{Array.from({length:4},(_,i)=><span key={i}>SLOW OBSESSION™ <i>✳</i> GARAGE FILES <i>✳</i> COMMUNITY OVER STATUS <i>✳</i> CURITIBA — BR <i>✳</i> </span>)}</div></div>
   <section id="drop" className="unr-drop unr-section" aria-labelledby="unr-drop-title"><div className="unr-container">
    <div className="unr-section-head"><div><p className="unr-eyebrow">01 / O PRIMEIRO CAPÍTULO</p><h2 id="unr-drop-title" className="unr-display">DROP <em>001</em><span className="unr-period">.</span></h2></div><p className="unr-section-subtitle">Conheça as estampas por todos os ângulos. Deslize para girar, toque para explorar.</p></div>
    <div className="unr-shop-instructions"><span>↔ DESLIZE NA FOTO PARA GIRAR A CAMISETA</span><span>COSTAS EM DESTAQUE · VISTA FRONTAL NO VERSO</span></div>
    {products.length?<ShopCatalog products={products}/>:<div className="unr-state"><strong>A GARAGEM ESTÁ EM MANUTENÇÃO</strong><p>Não conseguimos carregar o catálogo agora. Tente novamente em instantes.</p><a className="unr-button" href="https://unrush.com.br/shop/">ACESSAR LOJA</a></div>}
   </div></section>
   <section className="unr-manifesto" id="manifesto"><div className="unr-container unr-manifesto-grid">
    <div className="unr-manifesto-image"><img src={media.manifesto} width="819" height="1024" alt="UNRUSH — fotografia editorial da campanha, ensaio 02" loading="lazy"/><span>SLOW OBSESSION™ / ARCHIVE 002</span></div>
    <div className="unr-manifesto-copy"><p className="unr-eyebrow">02 / O QUE NOS MOVE</p><h2 className="unr-display">SLOW<br/><em>OBSESSION.</em><span className="unr-manifesto-asterisk">✳</span></h2><p className="unr-manifesto-lead">Carros nunca foram só carros.</p><p>São projetos construídos aos poucos, noites na garagem, encontros, histórias e detalhes que só quem vive essa cultura entende.</p><p>A UNRUSH nasceu para vestir essa obsessão. Sem pressa, sem pose e sem a necessidade de impressionar ninguém.</p><a href="#dna" className="unr-underlined">ENTENDA NOSSO DNA <span>↗</span></a></div>
   </div></section>
   <section id="garage-files" className="unr-garage unr-section"><div className="unr-container">
    <div className="unr-section-head"><div><p className="unr-eyebrow">03 / NOSSO ARQUIVO VISUAL</p><h2 className="unr-display">GARAGE <em>FILES.</em></h2></div><p className="unr-section-subtitle">A estética da UNRUSH para além da estampa. Imagens do nosso universo, entre cultura e obsessão.</p></div>
    <div className="unr-garage-grid">{media.garage.map(([src,num,label])=><figure key={num} className={"unr-garage-tile unr-garage-tile--"+num}><img src={src} alt={"UNRUSH — arquivo visual editorial "+num} loading="lazy"/><figcaption><span>ARCHIVE {num} / UNRUSH</span><strong>{label}</strong></figcaption></figure>)}</div><p className="unr-garage-note">UNRUSH® / SLOW OBSESSION™ / 2026</p>
   </div></section>
   <section className="unr-dna unr-section" id="dna"><div className="unr-container"><p className="unr-eyebrow">04 / NOSSOS PRINCÍPIOS</p><h2 className="unr-display">NÃO É <em>SÓ ROUPA.</em></h2>
    <div className="unr-dna-grid">{[["01","OBSESSÃO POR DETALHES","O desenho da roda, a altura da carroceria, a história de cada projeto."],["02","CARROS DE VERDADE","Garagem, posto, pista, encontros e estradas. O que a comunidade vive."],["03","DESIGN COM HISTÓRIA","Uma estampa precisa contar algo antes de querer chamar atenção."],["04","RESPEITO NÃO SE COMPRA","Paixão e autenticidade falam mais alto que status."]].map(x=><div key={x[0]} className="unr-dna-card"><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></div>)}</div>
   </div></section>
   <section className="unr-quality unr-section" id="qualidade"><div className="unr-container unr-quality-grid">
    <div><p className="unr-eyebrow">05 / NOSSO PROCESSO</p><h2 className="unr-display">FEITA COM<br/><em>CALMA.</em></h2><p className="unr-quality-intro">Da primeira ideia ao último detalhe, cada etapa existe por um motivo. As boas coisas pedem tempo.</p><a className="unr-button" href="#drop">ESCOLHA SUA PEÇA <span>↗</span></a></div>
    <div className="unr-quality-rows">{[["01","MODELAGEM","Uma peça precisa vestir bem antes de qualquer coisa."],["02","MATERIAL","A escolha do tecido faz parte do projeto."],["03","ESTAMPA","Cada composição nasce para ser observada de perto."],["04","IDENTIDADE","Um detalhe que só quem vive a cultura reconhece."]].map(x=><div className="unr-quality-row" key={x[0]}><span>{x[0]}</span><div><h3>{x[1]}</h3><p>{x[2]}</p></div></div>)}</div>
   </div></section>
   <section className="unr-finale"><div className="unr-container unr-finale-content"><p className="unr-eyebrow">06 / A GARAGEM ESTÁ ABERTA</p><h2>ENTRE NA<br/>GARAGEM<span>.</span></h2><p>A cultura não para na garagem. Ela vai com você.</p><a className="unr-button" href="/loja">VER O DROP COMPLETO <span>↗</span></a></div><div className="unr-finale-photo" aria-hidden="true"><img src={media.closing} width="768" height="960" alt="" loading="lazy"/></div></section>
  </main>
  <SiteFooter/>
  <nav className="unr-mobile-dock" aria-label="Navegação rápida do aplicativo"><a href="/" aria-label="Início">⌂<span>INÍCIO</span></a><a href="/loja" aria-label="Ver o drop">⌕<span>DROP</span></a><a href="https://unrush.com.br/cart-2/" aria-label="Abrir carrinho">♧<span>CARRINHO</span></a><a href="https://unrush.com.br/my-account-2/" aria-label="Minha conta">↗<span>CONTA</span></a></nav>
 </div>;
}