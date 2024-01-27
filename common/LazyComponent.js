import React from "react";
import Image from "next/image";
import FavoriteBtn from "@/app/product/components/FavoriteBtn";

const LazyComponent = ({ img, title }) => {
  return (
    <>
      <div className="grid rounded-md place-items-center">
        <Image
          className="aspect-square"
          src={img}
          alt=""
          width={320}
          height={150}
        />
      </div>
    </>
  );
};

export default LazyComponent;
