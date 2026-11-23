"use client";
import {useMemo,useState} from "react";
import type {StoreProduct} from "@/lib/woocommerce";

export default function ProductPurchase({product}:{product:StoreProduct}) {
 const sizeAttribute=product.attributes?.find(a=>a.has_variations);
 const variations=product.variations||[];
 const availableSizes=useMemo(()=>variations.map(v=>{
  const value=v.attributes.find(a=>a.name.toLowerCase()===(sizeAttribute?.name||"tamanho").toLowerCase())?.value||v.attributes[0]?.value||"";
  return {id:v.id,value,slug:value.toLowerCase()};
 }),[variations,sizeAttribute]);
 const [selected,setSelected]=useState(availableSizes[0]?.value||"");
 const selectedVariation=availableSizes.find(v=>v.value.toLowerCase()===selected.toLowerCase());
 const unavailable=!product.is_purchasable||!product.is_in_stock||(product.type==="variable"&&!selectedVariation);
 const addUrl=useMemo(()=>{
  const url=new URL("https://unrush.com.br/cart-2/");
  url.searchParams.set("add-to-cart",String(product.id));
  url.searchParams.set("variation_id",String(selectedVariation?.id||""));
  url.searchParams.set("quantity","1");
  if(sizeAttribute?.taxonomy)url.searchParams.set("attribute_"+sizeAttribute.taxonomy,selectedVariation?.slug||"");
  return url.toString();
 },[product.id,selectedVariation,sizeAttribute]);
 return <div className="unr-purchase-panel">
  {availableSizes.length>0&&<div><p className="unr-eyebrow">SELECIONE O TAMANHO</p><div className="unr-size-list" role="group" aria-label="Selecionar tamanho">
   {availableSizes.map(size=><button type="button" key={size.id} className={"unr-size-option"+(selected===size.value?" active":"")} aria-pressed={selected===size.value} onClick={()=>setSelected(size.value)}>{size.value}</button>)}
  </div></div>}
  <div className="unr-product-actions">
   {unavailable?<div className="unr-state"><strong>INDISPONÍVEL NO MOMENTO</strong><p>Esta peça ou variação não está liberada para compra no WooCommerce.</p></div>:<a className="unr-button unr-add-to-cart" href={addUrl}>ADICIONAR AO CARRINHO <span>↗</span></a>}
  </div>
  <p className="unr-product-shipping-note">Frete calculado no carrinho conforme o CEP. Pagamento, estoque e pedido são processados com segurança pela estrutura WooCommerce da UNRUSH.</p>
 </div>;
}