import HomePage from "@/components/home-page";
import {getProducts} from "@/lib/woocommerce";

export const revalidate = 60;

export default async function Home() {
  const products = await getProducts();
  return <HomePage products={products}/>;
}