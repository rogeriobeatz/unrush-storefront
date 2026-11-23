"use client";
import Link from "next/link";
import {useRef,useState} from "react";
import type {CSSProperties,PointerEvent,KeyboardEvent} from "react";
import type {StoreProduct} from "@/lib/woocommerce";
import {formatPrice,stripHtml} from "@/lib/woocommerce";

export function Icon({name,size=20}:{name:string;size?:number}) {
 const paths:Record<string,React.ReactNode>={
  bag:<><path d="M4 8h16l-1.4 12H5.4L4 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>,
  search:<><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></>,
  menu:<path d="M3 6h18M3 12h18M3 18h18"/>,
  close:<path d="M5 5l14 14M19 5 5 19"/>,
  arrow:<path d="M4 12h16m-7-7 7 7-7 7"/>,
  diagonal:<path d="M5 19 19 5M6 5h13v13"/>,
  plus:<path d="M12 5v14M5 12h14"/>
 };
 return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]||paths.arrow}</svg>;
}
export function Brand({invert=false}:{invert?:boolean}) {
 return <Link className={"unr-brand"+(invert?" unr-brand-light":"")} href="/" aria-label="UNRUSH — início"><img className="unr-brand-image" src="https://unrush.com.br/wp-content/uploads/2026/09/Logotipo-oficial.png" alt="UNRUSH — logotipo oficial" width="886" height="150"/></Link>;
}
export function SiteHeader() {
 const [searchOpen,setSearchOpen]=useState(false),[menuOpen,setMenuOpen]=useState(false),[term,setTerm]=useState("");
 return <>
  <a className="unr-skip" href="#conteudo">Pular para o conteúdo</a>
  <div className="unr-topline"><span>CULTURA AUTOMOTIVA BRASILEIRA</span><span>SLOW OBSESSION™ — CURITIBA / PR</span><span>DROP 001 — GARAGE FILES</span></div>
  <header className="unr-header"><div className="unr-header-grid unr-container">
   <button className="unr-mobile-menu unr-icon-btn" type="button" onClick={()=>setMenuOpen(!menuOpen)} aria-label={menuOpen?"Fechar menu":"Abrir menu"} aria-expanded={menuOpen}><Icon name={menuOpen?"close":"menu"}/></button>
   <Brand/>
   <nav className={"unr-nav"+(menuOpen?" is-open":"")} aria-label="Navegação principal">
    <Link href="/loja">O DROP</Link><a href="/#manifesto" onClick={()=>setMenuOpen(false)}>MANIFESTO</a><a href="/#garage-files" onClick={()=>setMenuOpen(false)}>GARAGE FILES</a><a href="/#qualidade" onClick={()=>setMenuOpen(false)}>A PEÇA</a>
   </nav>
   <div className="unr-header-actions">
    <button className="unr-icon-btn" type="button" aria-label="Buscar produtos" aria-expanded={searchOpen} onClick={()=>setSearchOpen(!searchOpen)}><Icon name={searchOpen?"close":"search"} size={22}/></button>
    <a href="https://unrush.com.br/cart-2/" className="unr-cart-btn" aria-label="Abrir carrinho"><Icon name="bag" size={21}/></a>
   </div>
  </div>
  {searchOpen&&<form className="unr-searchbar unr-container" action="/loja"><Icon name="search" size={19}/><input type="search" name="q" autoFocus placeholder="BUSQUE UMA ESTAMPA, CARRO OU CULTURA..." value={term} onChange={e=>setTerm(e.target.value)} aria-label="Buscar produtos"/><button type="submit">VER RESULTADOS <Icon name="diagonal" size={16}/></button></form>}
  </header>
 </>;
}
export function SiteFooter() {
 return <footer className="unr-footer"><div className="unr-container">
  <div className="unr-footer-top">
   <div><Brand invert/><p>Streetwear automotivo brasileiro.<br/>Curitiba / PR. SLOW OBSESSION™</p></div>
   <div><h3>EXPLORE</h3><Link href="/loja">Drop 001</Link><a href="/#manifesto">Nossa história</a><a href="/#qualidade">Qualidade</a></div>
   <div><h3>SUA CONTA</h3><a href="https://unrush.com.br/my-account-2/">Minha conta</a><a href="https://unrush.com.br/cart-2/">Carrinho</a><a href="https://unrush.com.br/checkout-2/">Checkout</a></div>
   <div><h3>COMUNIDADE</h3><a href="https://instagram.com/unrushco" target="_blank" rel="noreferrer">Instagram @unrushco</a><Link href="/loja">Loja online</Link></div>
  </div>
  <div className="unr-footer-bottom"><span>© {new Date().getFullYear()} UNRUSH. TODOS OS DIREITOS RESERVADOS.</span><span>STATUS NÃO COMPRA RESPEITO. PAIXÃO, SIM.</span></div>
 </div></footer>;
}
function categoryFor(p:StoreProduct) {
 const n=p.name.toLowerCase();
 if(/skyline|lewis|verstappen|formula|honda/.test(n))return "pista";
 if(/orbital|chevette|uno|peugeot|nsx/.test(n))return "garagem";
 return "cultura";
}
export function ProductSpin({product,large=false}:{product:StoreProduct;large?:boolean}) {
 const [reversed,setReversed]=useState(false),down=useRef<{x:number;y:number}|null>(null);
 const images=product.images||[],back=images[1]||images[0],front=images[0]||images[1],two=Boolean(images[1]);
 const pointerDown=(e:PointerEvent<HTMLDivElement>)=>{if(e.button===0)down.current={x:e.clientX,y:e.clientY}};
 const pointerUp=(e:PointerEvent<HTMLDivElement>)=>{if(!down.current)return;const dx=e.clientX-down.current.x,dy=e.clientY-down.current.y;down.current=null;if(Math.abs(dx)>42&&Math.abs(dx)>Math.abs(dy)*1.25)setReversed(v=>!v)};
 const keyDown=(e:KeyboardEvent<HTMLDivElement>)=>{if(two&&(e.key==="Enter"||e.key===" ")){e.preventDefault();setReversed(v=>!v)}};
 return <div className={"unr-product-spin"+(large?" unr-product-spin--large":"")+(reversed?" is-reversed":"")}
  role={two?"button":"img"} tabIndex={two?0:undefined} aria-label={two?"Girar camiseta "+product.name+". Arraste lateralmente ou pressione Enter.":product.name}
  onPointerDown={pointerDown} onPointerUp={pointerUp} onPointerCancel={()=>{down.current=null}}
  onPointerEnter={e=>{if(e.pointerType==="mouse"&&two)setReversed(true)}}
  onPointerLeave={e=>{if(e.pointerType==="mouse"&&two)setReversed(false);down.current=null}}
  onClick={()=>{if(two)setReversed(v=>!v)}} onKeyDown={keyDown}>
  <span className="unr-spin-stage"><span className="unr-spin-inner">
   <span className="unr-spin-face unr-spin-face--back">{back?<img src={large?back.src:(back.thumbnail||back.src)} srcSet={back.srcset||undefined} sizes={large?"(max-width:680px) 100vw,45vw":"(max-width:680px) 46vw,23vw"} alt={(back.alt||product.name)+" — costas"} loading="lazy" draggable={false}/>:<span className="unr-spin-placeholder">UNRUSH</span>}</span>
   {two&&<span className="unr-spin-face unr-spin-face--front"><img src={large?front.src:(front.thumbnail||front.src)} srcSet={front.srcset||undefined} sizes={large?"(max-width:680px) 100vw,45vw":"(max-width:680px) 46vw,23vw"} alt={(front.alt||product.name)+" — frente"} loading="lazy" draggable={false}/></span>}
  </span></span>
  {two&&<span className="unr-spin-hint"><Icon name="arrow" size={13}/>{large?"DESLIZE PARA GIRAR":"ARRASTE PARA GIRAR"}</span>}
  <span className="unr-spin-side">{two?(reversed?"FRENTE · 2/2":"COSTAS · 1/2"):"VISÃO ÚNICA"}</span>
 </div>;
}
export function ProductCard({product,index=0}:{product:StoreProduct;index?:number}) {
 const category=categoryFor(product);
 return <article className="unr-product-card" style={{"--idx":index} as CSSProperties}>
  <div className="unr-product-image"><span className="unr-product-corner">{String(index+1).padStart(2,"0")} / DROP 001</span>
   <Link href={"/produto/"+product.slug} aria-label={"Ver "+stripHtml(product.name)}><ProductSpin product={product}/></Link>
   <Link className="unr-product-more" href={"/produto/"+product.slug}>VER DETALHES <Icon name="diagonal" size={17}/></Link>
  </div>
  <div className="unr-product-info"><div><span className="unr-product-kind">{category==="pista"?"TRACK CULTURE":category==="garagem"?"GARAGE CULTURE":"STREET CULTURE"}</span><Link href={"/produto/"+product.slug} className="unr-product-name">{stripHtml(product.name.replace(/^Camiseta /i,""))}</Link></div><strong className="unr-product-price">{formatPrice(product)}</strong></div>
  <Link className="unr-product-quick" href={"/produto/"+product.slug}>VER CAMISETA <Icon name="diagonal" size={17}/></Link>
 </article>;
}
export function ProductGrid({products}:{products:StoreProduct[]}) {
 return <div className="unr-products-grid">{products.map((p,i)=><ProductCard key={p.id} product={p} index={i}/>)}</div>;
}
export function ShopCatalog({products,initialQuery=""}:{products:StoreProduct[];initialQuery?:string}) {
 const [category,setCategory]=useState("todos"),[limit,setLimit]=useState(8),[term,setTerm]=useState(initialQuery);
 const normalize=(s:string)=>s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
 const filtered=products.filter(p=>(category==="todos"||categoryFor(p)===category)&&normalize(stripHtml(p.name)).includes(normalize(term)));
 return <><div className="unr-filter-bar"><div className="unr-filter-chips" role="group" aria-label="Filtrar por inspiração">
  {([["todos","TODAS AS PEÇAS"],["garagem","GARAGEM"],["pista","PISTA"],["cultura","CULTURA DE RUA"]] as const).map(c=><button key={c[0]} type="button" className={"unr-chip"+(category===c[0]?" active":"")} onClick={()=>{setCategory(c[0]);setLimit(8)}} aria-pressed={category===c[0]}>{c[1]}</button>)}
 </div><span className="unr-resultcount">{String(filtered.length).padStart(2,"0")} PEÇAS</span></div>
 <div className="unr-searchbar unr-catalog-search"><Icon name="search" size={18}/><input type="search" placeholder="BUSCAR ESTAMPA, CARRO OU CULTURA..." value={term} onChange={e=>setTerm(e.target.value)}/></div>
 {filtered.length?<><div className="unr-products-grid">{filtered.slice(0,limit).map((p,i)=><ProductCard key={p.id} product={p} index={i}/>)}</div><div className="unr-shop-actions">{filtered.length>limit?<button className="unr-button unr-button-dark" onClick={()=>setLimit(v=>v+8)}>VER MAIS PEÇAS <Icon name="plus" size={18}/></button>:<span className="unr-resultcount">FIM DO DROP — {filtered.length} PEÇAS</span>}</div></>:<div className="unr-state"><strong>NENHUMA PEÇA ENCONTRADA</strong><p>Tente outra busca ou explore todas as estampas.</p><button onClick={()=>{setTerm("");setCategory("todos")}}>LIMPAR FILTROS</button></div>}
 </>;
}