import React from "react";
import ProductList from "../components/ProductList";
import Slider from "../components/Slider";
export default function HomePage({ data }) {
  return (
    <div>
      <div className="max-w-screen-xl mx-auto">
        <Slider />
      </div>

      <section className="bg-white py-8">
        <div className="max-w-screen-xl mx-auto flex items-center flex-wrap pt-4 pb-12">
          <nav id="store" className="w-full z-30 top-0 px-6 py-1">
            <div className="w-full max-w-screen-xl mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
              <a
                className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
                href="#"
              >
                Store
              </a>
            </div>
          </nav>
          {data.slice(0, 8).map((product) => (
            <ProductList key={product.id} data={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
