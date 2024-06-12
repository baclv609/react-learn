import React from "react";
import ProductList from "../components/ProductList";

export default function ShopPage({ data }) {
  return (
    <div>
      <div>
        <h1>Tất cả sản phẩm</h1>
        <div className="max-w-screen-xl mx-auto flex items-center flex-wrap pt-4 pb-12">
          {data.slice(0, 8).map((product) => (
            <ProductList key={product.id} data={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
