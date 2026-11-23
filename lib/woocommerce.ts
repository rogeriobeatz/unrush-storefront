export type StoreImage = { id:number; src:string; thumbnail?:string; srcset?:string; alt:string; name?:string };
export type StoreProduct = {
  id:number; name:string; slug:string; type:string; permalink:string;
  description:string; short_description:string;
  prices:{price:string;regular_price:string;currency_code:string;currency_minor_unit:number};
  images:StoreImage[];
  variations:{id:number;attributes:{name:string;value:string}[]}[];
  attributes:{id:number;name:string;taxonomy:string|null;has_variations:boolean;terms:{id:number;name:string;slug:string}[]}[];
  is_purchasable:boolean; is_in_stock:boolean; has_options:boolean;
  add_to_cart?:{url:string;text:string};
  categories:{id:number;name:string;slug:string}[];
};
const baseUrl=(process.env.NEXT_PUBLIC_WC_URL||"https://unrush.com.br").replace(/\/$/,"");
const favorites=["2475","2480","2477","2478","2476","2479","23"];
const hidden=["2474"];
function rankProducts(products:StoreProduct[]) {
  return products.filter(p=>!hidden.includes(String(p.id))).sort((a,b)=>{
    const ai=favorites.indexOf(String(a.id)),bi=favorites.indexOf(String(b.id));
    return (ai<0?100:ai)-(bi<0?100:bi);
  });
}
export async function getProducts():Promise<StoreProduct[]> {
  try {
    const response=await fetch(baseUrl+"/wp-json/wc/store/v1/products?per_page=50",{next:{revalidate:60},headers:{Accept:"application/json"}});
    if(!response.ok)return [];
    const data=await response.json();
    return Array.isArray(data)?rankProducts(data):[];
  } catch { return []; }
}
export async function getProductBySlug(slug:string):Promise<StoreProduct|null> {
  try {
    const response=await fetch(baseUrl+"/wp-json/wc/store/v1/products?slug="+encodeURIComponent(slug),{next:{revalidate:60},headers:{Accept:"application/json"}});
    if(!response.ok)return null;
    const data=await response.json();
    return Array.isArray(data)?data[0]||null:null;
  } catch { return null; }
}
export function formatPrice(product:StoreProduct) {
  const minor=product.prices?.currency_minor_unit??2;
  const raw=Number(product.prices?.price||0);
  if(!raw)return "PREÇO INDISPONÍVEL";
  const amount=raw/Math.pow(10,minor);
  return new Intl.NumberFormat("pt-BR",{style:"currency",currency:product.prices?.currency_code||"BRL"}).format(amount);
}
export function stripHtml(value:string) {
  return value.replace(/<[^>]*>/g," ").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&#8211;/g,"–").replace(/&#8217;/g,"’").replace(/\s+/g," ").trim();
}