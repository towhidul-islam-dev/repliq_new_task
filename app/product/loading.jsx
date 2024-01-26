"use client";
import React from "react";
import { useProductData } from "../../Data/productData";

const Loading = () => {
  const { data } = useProductData();
  return (
    <>
      <div className="flex items-center justify-center w-full mt-8">
        <div className="container grid gap-4 my-16 grid-cols-productLayout">
          {data?.map((product) => {
            const { id } = product;
            return (
              <div key={id} className="z-10 p-3 bg-gray-200 rounded-md animate-moveUp">
                <div className="flex flex-col items-center justify-between h-full gap-2">
                  <div>
                    <div className="p-4 m-auto mb-2 overflow-hidden bg-gray-300 rounded-md h-44 w-60 animate-pulse"></div>
                    <div className="z-20 w-full pt-2 pb-4 rounded-md">
                      <div>
                        <h2 className="w-full h-5 bg-gray-300 animate-pulse"></h2>
                      </div>
                      <div className="flex items-center justify-between gap-4 py-2">
                        <h2 className="w-full h-5 bg-gray-300 animate-pulse"></h2>
                        <p className="w-full h-5 bg-gray-300 animate-pulse"></p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full h-8 px-4 pb-4 bg-gray-300 rounded-md animate-pulse">
                    <button
                      type="button"
                      onClick={() => addToCart(id)}
                      className="w-full text-sm font-bold capitalize transition-all duration-200 ease-in-out bg-transparent rounded-md cursor-pointer text-lime-900"
                    ></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Loading;
