"use client";
import {useState} from "react";
import type {StoreImage} from "@/lib/woocommerce";

export default function ProductGallery({images,name}:{images:StoreImage[];name:string}) {
 const [active,setActive]=useState(0);
 const current=images[active]||images[0];
 if(!current)return <div className="unr-gallery-main"><div className="unr-state">IMAGEM INDISPONÍVEL</div></div>;
 return <div>
  <div className="unr-product-gallery-shell">
   <div className="unr-gallery-thumbs" role="group" aria-label="Escolher imagem do produto">
    {images.map((image,index)=><button type="button" key={image.id||index} className={"unr-gallery-thumb"+(active===index?" active":"")} onClick={()=>setActive(index)} aria-label={"Ver imagem "+(index+1)+" de "+images.length} aria-pressed={active===index}><img src={image.thumbnail||image.src} alt="" loading="lazy"/></button>)}
   </div>
   <div className="unr-gallery-main"><img src={current.src} srcSet={current.srcset||undefined} sizes="(max-width:900px) 100vw,60vw" alt={current.alt||name+" — imagem "+(active+1)} fetchPriority="high"/></div>
  </div>
  <div className="unr-product-gallery-caption"><span>{name.toUpperCase()}</span><span>{String(active+1).padStart(2,"0")} / {String(images.length).padStart(2,"0")}</span></div>
 </div>;
}