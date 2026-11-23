import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {getProductBySlug,getProducts,formatPrice,stripHtml} from "@/lib/woocommerce";
import {SiteHeader,SiteFooter,ProductGrid} from "@/components/storefront-shared";
import ProductPurchase from "@/components/product-purchase";
import ProductGallery from "@/components/product-gallery";

export const revalidate=60;
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params,product=await getProductBySlug(slug);
 if(!product)return {title:"Peça não encontrada — UNRUSH"};
 return {title:stripHtml(product.name)+" — UNRUSH",description:stripHtml(product.short_description||product.description).slice(0,155),openGraph:{images:product.images?.[0]?.src?[product.images[0].src]:[]}};
}
export default async function ProductPage({params}:{params:Promise<{slug:string}>}) {
 const {slug}=await params;
 const [product,allProducts]=await Promise.all([getProductBySlug(slug),getProducts()]);
 if(!product)notFound();
 const name=stripHtml(product.name.replace(/^Camiseta /i,""));
 const description=stripHtml(product.description||product.short_description);
 const related=allProducts.filter(p=>p.id!==product.id&&p.categories?.some(c=>product.categories?.some(pc=>pc.id===c.id))).slice(0,4);
 const price=Number(product.prices?.price||0)>0?formatPrice(product):"PREÇO INDISPONÍVEL";
 const heroImage=product.images?.[0]?.src;
 return <div id="unrush-storefront"><SiteHeader/><main id="conteudo" className="unr-product-page">
  <section className="unr-pdp-hero">
   <div className="unr-container">
    <div className="unr-pdp-topline"><span>UNRUSH / GARAGE FILES</span><span>DROP 001 — 2026</span><span>CURITIBA / BR</span></div>
    <div className="unr-pdp-grid">
     <div className="unr-pdp-visual">
      <div className="unr-pdp-visual-index"><span>PRODUCT ARCHIVE</span><strong>001<span> / 026</span></strong></div>
      <ProductGallery images={product.images||[]} name={name}/>
      <div className="unr-pdp-image-foot"><span>FRONT / BACK / DETAILS</span><span>DESIGNED TO BE WORN. BUILT TO BE REMEMBERED.</span></div>
     </div>
     <section className="unr-pdp-info">
      <p className="unr-eyebrow"><span className="unr-dot"/> GARAGE FILES / {product.categories?.[0]?.name?.toUpperCase()||"STREET CULTURE"}</p>
      <h1>{name}<span className="unr-period">.</span></h1>
      <p className="unr-pdp-intro">{description}</p>
      <div className="unr-pdp-price-row"><strong>{price}</strong><span>PREÇO UNITÁRIO</span></div>
      {Number(product.prices?.price||0)>0?<ProductPurchase product={product}/>:<div className="unr-state"><strong>INDISPONÍVEL</strong><p>Esta peça está sem preço ou configuração de compra.</p></div>}
      <div className="unr-pdp-trust"><span>↗ COMPRA SEGURA</span><span>↗ FRETE POR CEP</span><span>↗ PRODUÇÃO LOCAL</span></div>
      <p className="unr-pdp-code">UNR / {String(product.id).padStart(5,"0")} — SLOW OBSESSION™</p>
     </section>
    </div>
   </div>
  </section>
  <div className="unr-pdp-ticker"><div>NOT JUST A T-SHIRT <i>✳</i> AUTOMOTIVE CULTURE <i>✳</i> SLOW OBSESSION™ <i>✳</i> NOT JUST A T-SHIRT <i>✳</i> AUTOMOTIVE CULTURE <i>✳</i> SLOW OBSESSION™ <i>✳</i></div></div>
  <section className="unr-pdp-story"><div className="unr-container unr-pdp-story-grid">
   <div><p className="unr-eyebrow">01 / THE STORY BEHIND</p><h2>MAIS QUE<br/><em>UMA ESTAMPA.</em></h2></div>
   <div><p className="unr-pdp-story-lead">{description}</p><p>Criada para quem reconhece a história por trás das linhas, dos detalhes e das máquinas que marcaram gerações. Uma peça do universo UNRUSH, feita para carregar essa cultura para além da garagem.</p><a className="unr-underlined" href="/#manifesto">CONHEÇA A UNRUSH <span>↗</span></a></div>
  </div></section>
  <section className="unr-pdp-details"><div className="unr-container">
   <div className="unr-pdp-details-head"><p className="unr-eyebrow">02 / PRODUCT NOTES</p><h2>OS DETALHES<br/><em>IMPORTAM.</em></h2></div>
   <div className="unr-pdp-detail-grid">
    <div><span>01</span><strong>DESIGN AUTORAL</strong><p>Uma composição visual inspirada pela cultura automotiva e pela obsessão por detalhes.</p></div>
    <div><span>02</span><strong>IDENTIDADE UNRUSH</strong><p>Garage Files — um arquivo vivo de referências, histórias e máquinas.</p></div>
    <div><span>03</span><strong>ESCOLHA SEU TAMANHO</strong><p>Consulte as opções disponíveis e selecione sua variação antes de adicionar ao carrinho.</p></div>
   </div>
  </div></section>
  {related.length>0&&<section className="unr-product-related"><div className="unr-container"><div className="unr-pdp-related-head"><div><p className="unr-eyebrow">03 / KEEP EXPLORING</p><h2>MAIS DA<br/><em>GARAGEM.</em></h2></div><a className="unr-underlined" href="/loja">VER TODO O DROP <span>↗</span></a></div><ProductGrid products={related}/></div></section>}
  <section className="unr-pdp-end"><div className="unr-container"><p className="unr-eyebrow">UNRUSH® — SLOW OBSESSION™</p><h2>VISTA SUA<br/><em>OBSESSÃO.</em></h2><a className="unr-button" href="/loja">EXPLORAR DROP 001 <span>↗</span></a></div></section>
 </main><SiteFooter/></div>;
}