"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";

const Mainheader = () => {
  const [myCookie, setmyCookie] = useState();
  useEffect(() => {
    setmyCookie(Cookies.get("accessToken"));
  }, []);
  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
              title=""
              width={50}
              height={50}
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            href="/user"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            User Page
          </Link>
          <Link
            href="/checkout"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Subscritpion
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {myCookie ? (
            <Link
              href="/auth/signin"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          ) : (
            <Link
              href="/auth/signin"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Logout <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
          {/* <a
      href="/auth/signup"
      className="text-sm font-semibold leading-6 text-gray-900"
    >
      Sign up <span aria-hidden="true">&rarr;</span>
    </a> */}
        </div>
      </nav>
    </header>
  );
};

export default Mainheader;
