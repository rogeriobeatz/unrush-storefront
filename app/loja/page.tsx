import type {Metadata} from "next";
import {getProducts} from "@/lib/woocommerce";
import {SiteHeader,SiteFooter,ShopCatalog} from "@/components/storefront-shared";

export const metadata:Metadata={title:"Loja — UNRUSH",description:"Explore o Drop 001 da UNRUSH. Streetwear automotivo brasileiro, Slow Obsession™."};
export const revalidate=60;

export default async function ShopPage({searchParams}:{searchParams:Promise<{q?:string}>}) {
 const [{q},products]=await Promise.all([searchParams,getProducts()]);
 return <div id="unrush-storefront"><SiteHeader/><main id="conteudo" className="unr-shop-page"><div className="unr-container">
  <p className="unr-eyebrow">UNRUSH / GARAGE FILES / 2026</p>
  <h1>DROP <em>001.</em></h1>
  <div className="unr-section-head"><p className="unr-section-subtitle">Peças criadas a partir da cultura automotiva. Escolha sua estampa, explore os detalhes e encontre a sua.</p><p className="unr-resultcount">CURITIBA — BR / SLOW OBSESSION™</p></div>
  {products.length?<ShopCatalog products={products} initialQuery={q||""}/>:<div className="unr-state"><strong>CATÁLOGO INDISPONÍVEL</strong><p>Não foi possível consultar o WooCommerce agora.</p><a href="https://unrush.com.br/shop/" className="unr-button">ACESSAR LOJA ORIGINAL</a></div>}
 </div></main><SiteFooter/></div>;
}