"use client";
import Image from "next/image";
import Link from "next/link";

import ImageOne from "../public/imageOne.svg";
import FeatureProduct from "@/common/FeatureProduct";

export default function Home() {
  return (
    <>
      <div className="grid px-4 md:px-8 lg:px-12 place-items-center">
        <div className="flex items-center justify-center min-h-screen max-w-7xl">
          <div className="z-10 py-12 mt-16 overflow-hidden md:mt-0 md:py-20">
            <header className="z-0 grid gap-12 grid-cols-homepageLayoutHero1 place-items-center md:gap-16 lg:gap-20">
              <div className="z-0 animate-moveUp">
                <div>
                  <h2 className="text-4xl font-extrabold text-left text-transparent uppercase bg-gradient-to-r from-natural2 to-natural1 bg-clip-text md:text-5xl lg:text-7xl">
                    Welcome to our Valley
                  </h2>
                </div>

                <p className="py-4 text-sm text-left text-natural2 sm:text-base md:text-base line-clamp-2" >
                Revolutionize your style at our cutting-edge online store. Explore a curated fusion of fashion and tech. Elevate your lifestyle with seamless shopping—trends delivered to your doorstep. Click, shop, and redefine chic effortlessly.
                Elevate Your Wardrobe, Elevate Your Home: Navigate Trends with Our E-Commerce Elegance!
                </p>
                <p className="pb-4 text-sm text-left text-nutral2 sm:text-base md:text-base">
                Discover the Future of Shopping: Elevate Your Lifestyle with Our Trendsetting Online Emporium!
                </p>
                <div className="">
                  <li className="flex w-max cursor-pointer justify-start rounded-md bg-primary px-8 py-3 font-semibold text-natural3 drop-shadow-md transition-colors duration-300 ease-in-out hover:bg-[#11338b] hover:text-natural3">
                    <Link href="/product">
                      <button className="flex items-center justify-between gap-2 capitalize">
                        shop now{" "}
                      </button>
                    </Link>
                  </li>
                </div>
              </div>
              <div className="max-w-sm md:m-8 lg:m-12 md:max-w-3xl">
                <Image src={ImageOne} alt="" width={700} height={700} />
              </div>
            </header>
          </div>
          {/* <HomeTopratedProduct /> */}
          {/* <div className="z-0">
            <Subscribe />
          </div> */}
        </div>
        
      </div>
    </>
  );
}
/* 
<Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
*/
