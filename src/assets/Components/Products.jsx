import { useState, useEffect, useRef, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../Api/ProductsApi";
import { MyContext } from "../../Context";

export function Products() {
  const {
    page,
    setPage,
    search,
    setSearch,
    debouncedSearch,
    setDebouncedSearch,
    selectedProduct,
    setSelectedProduct,
    lightMode,
  } = useContext(MyContext);

  const inputRef = useRef(null);

  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(0);
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["products", { page, search: debouncedSearch }],
    queryFn: () =>
      fetchProducts({
        pageParam: page,
        queryKey: ["products", { search: debouncedSearch }],
      }),
    keepPreviousData: true,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div id={lightMode ? "products-container-light" : "products-container-dark"}>
      
      <form
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type="text"
          className="search-bar"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      
      <div className="one-product-container">
        {data.products.map((product) => (
          <div key={product.id} className="one-product">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="product-image"
              onClick={() => setSelectedProduct(product)}
            />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">${product.price}</p>
          </div>
        ))}
      </div>

      
      {selectedProduct && (
        <div
          className="pop-out-image"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="pop-out-information"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedProduct.title}</h2>
            <img
              src={selectedProduct.thumbnail}
              alt={selectedProduct.title}
            />
            <p><strong>Price:</strong> ${selectedProduct.price}</p>
            <p><strong>Description:</strong> {selectedProduct.description}</p>
            <p><strong>Brand:</strong> {selectedProduct.brand}</p>
            <p><strong>Category:</strong> {selectedProduct.category}</p>

            <button
              onClick={() => setSelectedProduct(null)}
              
            >
              Close
            </button>
          </div>
        </div>
      )}

      
      <div>
        <button
          className="previous"
          onClick={() => setPage(data.prevPage)}
          disabled={data.prevPage === null || isFetching}
        >
          Previous
        </button>
        <button
          className="next"
          onClick={() => setPage(data.nextPage)}
          disabled={data.nextPage === null || isFetching}
        >
          Next
        </button>
        {isFetching && <span>Loading page...</span>}
      </div>
    </div>
  );
}