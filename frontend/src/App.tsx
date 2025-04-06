import AllCategoriesPage from "./routes/AllCategoriesPage";
import ProductsPage from "./routes/ProductsPage";
import { Search } from "./components/Search";

export default function App() {
  return (
    <main className="min-h-[80vh]">
      <Search />
      <AllCategoriesPage />
      <ProductsPage />
    </main>
  );
}
