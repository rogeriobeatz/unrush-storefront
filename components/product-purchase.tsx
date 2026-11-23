"use client";
import {useMemo,useState} from "react";
import type {StoreProduct} from "@/lib/woocommerce";

export default function ProductPurchase({product}:{product:StoreProduct}) {
 const sizeAttribute=product.attributes?.find(a=>a.has_variations);
 const variations=product.variations||[];
 const sizes=(sizeAttribute?.terms||[]).map(term=>term.name);
 const [selected,setSelected]=useState(sizes[0]||"");
 const selectedVariation=useMemo(()=>variations.find(v=>v.attributes.some(a=>a.value.toLowerCase()===selected.toLowerCase())),[variations,selected]);
 const unavailable=!product.is_purchasable||!product.is_in_stock||(product.type==="variable"&&!selectedVariation);
 const addUrl=useMemo(()=>{
  const url=new URL("https://unrush.com.br/cart-2/");
  url.searchParams.set("add-to-cart",String(selectedVariation?.id||product.id));
  url.searchParams.set("quantity","1");
  return url.toString();
 },[product.id,selectedVariation]);
 return <div className="unr-purchase-panel">
  {sizes.length>0&&<div><p className="unr-eyebrow">SELECIONE O TAMANHO</p><div className="unr-size-list" role="group" aria-label="Selecionar tamanho">
   {sizes.map(size=><button type="button" key={size} className={"unr-size-option"+(selected===size?" active":"")} aria-pressed={selected===size} onClick={()=>setSelected(size)}>{size}</button>)}
  </div></div>}
  {unavailable?<div className="unr-state"><strong>INDISPONÍVEL NO MOMENTO</strong><p>Esta peça ou variação não está liberada para compra no WooCommerce.</p></div>:<a className="unr-button unr-add-to-cart" href={addUrl}>ADICIONAR AO CARRINHO <span>↗</span></a>}
  <p className="unr-commerce-note">O carrinho abre na loja segura da UNRUSH. Frete, estoque, cupons e pagamento continuam sendo processados pelo WooCommerce, Melhor Envio e Mercado Pago.</p>
 </div>;
}