import { Search } from "../../components/Search";
import ProductsPage from "../ProductsPage"; // This still works fine!

export default function ShopPage() {
  return (
    <>
      <Search />
      <h1 className="flex text-2xl font-bold text-center justify-center">
        Browse all products
      </h1>
      <ProductsPage />
    </>
  );
}
