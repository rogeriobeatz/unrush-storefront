import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {getProductBySlug,formatPrice,stripHtml} from "@/lib/woocommerce";
import {SiteHeader,SiteFooter} from "@/components/storefront-shared";
import ProductPurchase from "@/components/product-purchase";

export const revalidate=60;
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params,product=await getProductBySlug(slug);
 if(!product)return {title:"Peça não encontrada — UNRUSH"};
 return {title:stripHtml(product.name)+" — UNRUSH",description:stripHtml(product.short_description||product.description).slice(0,155),openGraph:{images:product.images?.[0]?.src?[product.images[0].src]:[]}};
}
export default async function ProductPage({params}:{params:Promise<{slug:string}>}) {
 const {slug}=await params,product=await getProductBySlug(slug);
 if(!product)notFound();
 const cleanDescription=stripHtml(product.description||product.short_description);
 return <div id="unrush-storefront"><SiteHeader/><main id="conteudo" className="unr-product-page"><div className="unr-container">
  <div className="unr-breadcrumb"><a href="/">INÍCIO</a> / <a href="/loja">DROP 001</a> / {stripHtml(product.name).toUpperCase()}</div>
  <div className="unr-product-layout">
   <div className="unr-product-gallery">{(product.images||[]).map((image,i)=><img key={image.id||i} src={image.src} alt={image.alt||stripHtml(product.name)+" — imagem "+(i+1)} loading={i===0?"eager":"lazy"}/>)}</div>
   <section className="unr-product-info-panel">
    <p className="unr-eyebrow">DROP 001 / GARAGE FILES / PEÇA ORIGINAL</p>
    <h1>{stripHtml(product.name.replace(/^Camiseta /i,""))}</h1>
    <p className="price">{Number(product.prices?.price||0)>0?formatPrice(product):"PREÇO INDISPONÍVEL"}</p>
    <p className="unr-product-description">{cleanDescription}</p>
    {Number(product.prices?.price||0)>0?<ProductPurchase product={product}/>:<div className="unr-state"><strong>INDISPONÍVEL NO MOMENTO</strong><p>Esta peça está sem preço ou configuração de compra no WooCommerce. Não vamos permitir uma compra com valor incorreto.</p></div>}
    <p className="unr-eyebrow" style={{marginTop:35}}>SLOW OBSESSION™ — CURITIBA / BR</p>
   </section>
  </div>
 </div></main><SiteFooter/></div>;
}