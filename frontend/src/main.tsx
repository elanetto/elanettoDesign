import React from "react";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import AddProductPage from "./routes/AddProductPage";
import CartPage from "./routes/CartPage";
import CheckoutPage from "./routes/CheckoutPage";
import CheckoutSuccessPage from "./routes/CheckoutSuccessPage";
import EditProductPage from "./routes/UpdateProductPage";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import ProductsPage from "./routes/ProductsPage";
import ProfilePage from "./routes/ProfilePage";
import SpecificProductPage from "./routes/SpecificProductPage";
import AllCategoriesPage from "./routes/AllCategoriesPage";
import CategoryDetailsPage from "./routes/CategoryDetailsPage";
import Layout from "./Layout";
import { Toaster } from "react-hot-toast";
import AccountPage from "./routes/AccountPage";
import FavouritesPage from "./routes/FavouritesPage";
import NotFoundPage from "./routes/NotFoundPage";
import ShopPage from "./routes/ShopPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "category/:product_type",
        element: <AllCategoriesPage />,
      },
      {
        path: "category/:categoryId/:product_type",
        element: <CategoryDetailsPage />,
      },
      {
        path: "products",
        element: <ShopPage />,
      },
      {
        path: "products/:productId",
        element: <SpecificProductPage />,
      },
      {
        path: "productspage",
        element: <ProductsPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/checkout-success",
        element: <CheckoutSuccessPage />,
      },
      {
        path: "favourites",
        element: <FavouritesPage />,
      },
      {
        path: "profile/:userId",
        element: <ProfilePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "account",
        element: <AccountPage />,
      },
      {
        path: "add-new-product",
        element: <AddProductPage />,
      },
      {
        path: "update/:productId",
        element: <EditProductPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      }
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </StrictMode>
);