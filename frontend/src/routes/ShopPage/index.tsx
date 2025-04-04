import { Search } from "../../components/Search";
import ProductsPage from "../ProductsPage"; // This still works fine!

export default function ShopPage() {
  return (
    <>
      <Search />
      <ProductsPage />
    </>
  );
}
