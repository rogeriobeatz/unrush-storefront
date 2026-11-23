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
 const cleanDescription=stripHtml(product.description||product.short_description);
 const related=allProducts.filter(p=>p.id!==product.id&&p.categories?.some(c=>product.categories?.some(pc=>pc.id===c.id))).slice(0,4);
 return <div id="unrush-storefront"><SiteHeader/><main id="conteudo" className="unr-product-page"><div className="unr-container">
  <div className="unr-breadcrumb"><a href="/">INÍCIO</a> / <a href="/loja">DROP 001</a> / {stripHtml(product.name).toUpperCase()}</div>
  <div className="unr-product-layout">
   <div className="unr-product-gallery"><ProductGallery images={product.images||[]} name={stripHtml(product.name)}/></div>
   <section className="unr-product-info-panel">
    <p className="unr-eyebrow">UNRUSH / DROP 001 / GARAGE FILES</p>
    <h1>{stripHtml(product.name.replace(/^Camiseta /i,""))}</h1>
    <p className="unr-product-price-line">{Number(product.prices?.price||0)>0?formatPrice(product):"PREÇO INDISPONÍVEL"}</p>
    <p className="unr-product-description">{cleanDescription}</p>
    <div className="unr-product-meta">
     <div><strong>DESIGN ORIGINAL</strong><span>Inspirado na cultura automotiva</span></div>
     <div><strong>COMPRA SEGURA</strong><span>Checkout protegido UNRUSH</span></div>
    </div>
    {Number(product.prices?.price||0)>0?<ProductPurchase product={product}/>:<div className="unr-state"><strong>INDISPONÍVEL NO MOMENTO</strong><p>Esta peça está sem preço ou configuração de compra no WooCommerce. Não vamos permitir uma compra com valor incorreto.</p></div>}
    <p className="unr-eyebrow" style={{marginTop:35}}>SLOW OBSESSION™ — CURITIBA / BR</p>
   </section>
  </div>
 </div>
 {related.length>0&&<section className="unr-product-related"><div className="unr-container"><p className="unr-eyebrow">CONTINUE EXPLORANDO</p><h2>MAIS DA GARAGEM.</h2><ProductGrid products={related}/></div></section>}
 </main><SiteFooter/></div>;
}