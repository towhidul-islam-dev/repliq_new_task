"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { usePathname} from "next/navigation";

import { VscAccount } from "react-icons/vsc";
import { RiShoppingBagFill } from "react-icons/ri";
import { FaBars } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

import SearchButton from "../SearchButton";

const NavbarMain = ({ params }) => {
  const currentPath = usePathname();
  const [toggleNav, setToggleNav] = useState(false);

  // ? Navbar Toggle Functionality...
  const handleToggle = () => {
    setToggleNav(!toggleNav);
  };
  const toggleMobNav = () => {
    setToggleNav(true);
  };

  useEffect(() => {
    setToggleNav(true)
  },[])

  return (
    <div className="fixed left-0 top-0 z-[999] w-full bg-baseClr1 md:relative md:bg-transparent">
      <div className="flex justify-center py-4 bg-gray-100 ">
        <nav className="hidden w-full gap-2 px-8 xl:px-0 md:flex md:items-center md:justify-between max-w-7xl">
          <div>
            <Link href="/" className="flex items-center justify-center">
              <span className="text-4xl text-primary">
                <RiShoppingBagFill />
              </span>
              <h2 className="text-3xl font-bold uppercase text-primary">
                valley
              </h2>
            </Link>
          </div>
          <div className="flex justify-between gap-3">
            <Link
              className={
                currentPath === "/"
                  ? "navList navLink text-primary"
                  : "navLink navList"
              }
              href="/"
            >
              Home
            </Link>
            <Link
              className={
                currentPath === "/product"
                  ? "navLink navList text-primary"
                  : "navLink navList"
              }
              href="/product"
            >
              Product
            </Link>
            
          </div>
          {currentPath === "/product" && (
            <div className="gap-4 ">
              
                <SearchButton />
            </div>
          )}
          <div className="gap-4 flexRow">
            <li className="flex items-center gap-2">
              <Link
                className={
                  currentPath === "/register"
                    ? "flex items-center font-semibold text-primary"
                    : "flex items-center"
                }
                href="/register"
              >
                {" "}
                <span>
                  <span>
                    <VscAccount className="pr-2 text-3xl" />
                  </span>
                </span>
                Sign Up
              </Link>
            </li>
            
          </div>
        </nav>
        <nav className="z-[999] flex w-full items-center px-4 justify-between md:hidden">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold uppercase text-primary">
              <span className="text-primary">
                <RiShoppingBagFill />
              </span>
              valley
            </h2>
          </div>
          <div
            className="z-[110] cursor-pointer font-bold text-nutral2 md:hidden"
            onClick={handleToggle}
          >
            {toggleNav ? <FaBars /> : <RxCross1 />}
          </div>
          <div
            className={
              !toggleNav
                ? "fixed inset-y-0 right-0 w-full bg-nutral3 px-6 py-28 backdrop-blur-md transition-all duration-500 ease-in-out md:static md:px-4 md:py-4"
                : "fixed inset-y-0 -right-full w-full bg-nutral3 px-6 py-28 backdrop-blur-md transition-all delay-100 duration-500 ease-in-out md:bg-transparent md:px-4 md:py-0"
            }
          >
            <div className="">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <Link
                  onClick={toggleMobNav}
                  className={
                    currentPath === "/"
                      ? "navLink navList text-primary"
                      : "navLink navList  text-nutral2"
                  }
                  href="/"
                >
                  Home
                </Link>
                <Link
                  onClick={toggleMobNav}
                  className={
                    currentPath === "/product"
                      ? "navLink navList text-primary"
                      : "navLink navList text-nutral2"
                  }
                  href="/product"
                >
                  Product
                </Link>
                
                <li className="flex items-center justify-start gap-2 py-2 navList">
                  <Link
                    onClick={toggleMobNav}
                    className={
                      currentPath === "/register"
                        ? "flex items-center  hover:text-nutral3 transition-all ease-in-out duration-200 text-primary"
                        : "flex items-center text-nutral2 hover:text-nutral3 transition-all ease-in-out duration-200"
                    }
                    href="/register"
                  >
                    {" "}
                    <span>
                      <VscAccount className="pr-2 text-2xl" />{" "}
                    </span>{" "}
                    Sign Up
                  </Link>
                </li>{" "}

              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavbarMain;