"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { buttonData } from "../../Data/buttonData";
import CartContextProvider from "../../context/cartContext";
import Example from "./components/productDropDown";
import Loading from "./loading";
import ProductCategory from "./components/productCategory";
import ProductOfList from "./components/ProductOfList";
import Pagination from "./components/Pagination";
import SortData from "@/common/SortData";

function sortingProductByCriteria(data, sortValue) {
  return data.sort((a, b) => {
    if (sortValue === "price") return a.price - b.price;
    if (sortValue === "category") return a.category.localeCompare(b.category);
    if (sortValue === "rating") return a.rating.rate - b.rating.rate;
    return 0;
  });
}

const Page = () => {
  const sectionRef = useRef(null);
  const { cart, searchProduct } = useContext(CartContextProvider);

  const params = useSearchParams();
  const sortValue = params.get("Sort");

  const [button, setButton] = useState([]);
  const [cartValue, setCartValue] = cart;
  const [filterProduct, setFilterProduct] = useState("All");
  const [productValue, setProductValue] = useState([]);
  const [searchProducts, setSearchProducts] = searchProduct;
  const [sortedData, setSortedData] = useState([]);
  // !! Fetching Data from API.

  const fetchData = async () => {
    const res = await fetch("https://fakestoreapi.com/products");

    const data = await res.json();
    if (!res.ok) throw Error("Url might be not found.");

    let unique = [...new Set(data?.map((item) => item.category))];
    setButton(unique);

    setProductValue([...data]);

    return data;
  };

  // ?? Setting up the Data using TanStack Query.
  const { data, isLoading, error } = useQuery({
    queryKey: ["productData"],
    queryFn: fetchData,
  });

  // !! Back To Top
  const handleTop = () => {
    sectionRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };
  // !! Fetching the Unique Category Product >>>
  const handleClick = (e) => {
    setFilterProduct(e.target.dataset.name);
  };

  const handleOptionChange = (e) => {
    setFilterProduct(e.target.value);
  };

  
  useEffect(() => {
    if (data && data.length > 0) {
      const x = sortingProductByCriteria(data, sortValue);
      setSortedData(x);
    } else {
      console.warn('Data is not available or empty.');
    }
  },[data,sortValue])
  return (
    <div className="grid w-full min-h-screen px-3 py-8 place-items-center sm:py-4 sm:pb-12 md:px-0">
      <div ref={sectionRef} className="mt-12 md-4 sm:mt-16 md:mb-20">
        <h2 className="text-2xl font-extrabold text-left text-transparent uppercase bg-gradient-to-r from-natural1 to-natural2 bg-clip-text md:text-center md:text-4xl lg:text-6xl">
          Get your desired Item.
        </h2>
      </div>
      {/* <div className="hidden md:block">
        <div id="buttonSection" className="flex flex-wrap items-center justify-center w-full gap-4 mt-4 md:mt-0 max-w-7xl">
          {button && (
            <button
              className={
                filterProduct === "All"
                  ? " cursor-pointer rounded-md border-2 border-natural3 shadow-md bg-natural3 px-8 py-2 text-center font-bold capitalize text-natural2  hover:border-transparent hover:bg-natural3 hover:text-primary"
                  : "cursor-pointer rounded-md border-2 border-primary/50 bg-transparent px-8 py-2 text-center font-bold capitalize text-natural2  hover:border-transparent hover:bg-natural3 hover:text-primary"
              }
              onClick={handleClick}
              data-name="All"
            >
              All
            </button>
          )}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {button.length !== 0
              ? button.map((btns, i) => {
                  return (
                    <>
                      <button
                        key={i}
                        className={
                          filterProduct === btns
                            ? " cursor-pointer border-2 border-natural3 rounded-md shadow-md bg-natural3 px-8 py-2 text-center font-bold capitalize text-natural2  hover:border-transparent hover:bg-nutral3 hover:text-primary"
                            : " cursor-pointer rounded-md border-2 border-primary/50 bg-transparent px-8 py-2 text-center font-bold capitalize text-natural2 hover:border-transparent hover:bg-natural3 hover:text-primary"
                        }
                        onClick={handleClick}
                        data-name={btns}
                      >
                        {btns}
                      </button>
                    </>
                  );
                })
              : buttonData.map((btns, i) => {
                  return (
                    <>
                      <button
                        key={i}
                        className={
                          filterProduct === btns
                            ? " cursor-pointer rounded-md border-2 border-natural3 shadow-md bg-natural3 px-8 py-2 text-center font-bold capitalize text-natural2 hover:border-transparent hover:bg-natural3 hover:text-primary"
                            : " cursor-pointer rounded-md border-2 border-primary/50 bg-transparent px-8 py-2 text-center font-bold capitalize text-natural2 hover:border-transparent hover:bg-natural3 hover:text-primary"
                        }
                        onClick={handleClick}
                        data-name={btns}
                      >
                        {btns}
                      </button>
                    </>
                  );
                })}
          </div>
        </div>
      </div> */}

      <div className="z-20 flex items-baseline justify-between w-full gap-2 px-6 lg:px-0 max-w-7xl">
        <div className="w-1/2 my-4 ">
          <Example
            setFilterProduct={setFilterProduct}
            people={buttonData || button}
            handleOptionChange={handleOptionChange}
          />
        </div>
        <div className="w-1/2">
          <SortData />
        </div>
      </div>

      {/* !! fetching product categorically */}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div
            ref={sectionRef}
            className="z-10 grid w-full gap-4 px-6 mt-10 overflow-hidden xl:px-0 max-w-7xl grid-cols-productLayout place-items-center"
          >
            {filterProduct === "All" ? (
              <>
                <ProductOfList
                  filterProduct={filterProduct}
                  product={
                    searchProducts.length > 0
                      ? searchProducts
                      : sortedData.length > 0
                      ? sortedData
                      : data
                  }
                  isLoading={isLoading}
                  cart={cartValue}
                  setCart={setCartValue}
                />
              </>
            ) : (
              <ProductCategory
                filterProduct={filterProduct}
                product={data}
                isLoading={isLoading}
                cart={cartValue}
                setCart={setCartValue}
              />
            )}
          </div>
        </>
      )}

      <div className="hidden py-4 mt-12">
        {filterProduct === "All" && <Pagination product={data} />}
      </div>
    </div>
  );
};

export default Page;
