import React, { useContext } from "react";
import ProductList from "../components/ProductList";
import { ProductContext } from "../contexts/ProductContext";

export default function ShopPage() {
  const { state } = useContext(ProductContext);
  return (
    <div>
      <div>
        <h1 className="font-bold text-xl">Tất cả sản phẩm</h1>
        <div className="max-w-screen-xl mx-auto flex items-center flex-wrap pt-4 pb-12">
          {state.products.map((product) => (
            <ProductList key={product.id} data={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
