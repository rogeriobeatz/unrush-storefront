export type StoreProduct = {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  description: string;
  short_description: string;
  images: { id: number; src: string; alt: string }[];
  prices: { price: string; currency_code: string; currency_symbol: string; currency_minor_unit: number };
  is_purchasable: boolean;
  is_in_stock: boolean;
};

const baseUrl = (process.env.NEXT_PUBLIC_WC_URL || "https://unrush.com.br").replace(/\/$/, "");

export async function getProducts(): Promise<StoreProduct[]> {
  try {
    const response = await fetch(`${baseUrl}/wp-json/wc/store/v1/products?per_page=8&orderby=popularity`, {
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return [];
    return await response.json();
  } catch {
    return [];
  }
}

export function formatPrice(product: StoreProduct) {
  const { price, currency_code, currency_minor_unit } = product.prices;
  const amount = Number(price) / Math.pow(10, currency_minor_unit);
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: currency_code }).format(amount);
}
