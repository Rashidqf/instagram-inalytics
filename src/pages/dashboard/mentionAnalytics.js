"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "./layout";
import { useGlobalContext } from "@/context/GlobalContext";
import Link from "next/link";
import Image from "next/image";
import ImpressionsBarChart from "@/component/chart/customLineChart";

const Tagging = () => {
  const { data } = useGlobalContext();

  return (
    <DashboardLayout>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="flex justify-center flex-wrap ">
            {/* {post.length > 0 &&
              post.map((post, index) => ( */}
            {data ? (
              <Link
                href={data.url || "#"}
                //   href={post.permalink}
                //   key={post.id}
                className="container p-5 bg-white rounded-xl shadow-lg transform transition duration-500   w-full sm:w-1/2"
              >
                <div>
                  <h1 className="text-2xl mt-2 ml-4 font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100">
                    {data.ownerFullName ||
                      data.ownerUsername ||
                      "Name Not Fount"}
                  </h1>
                  {data.hashtags && data.hashtags.length > 0 ? (
                    data.hashtags.map((hashtag, index) => (
                      <span
                        key={index}
                        className="ml-4 mt-1 mb-2 text-gray-700 hover:underline cursor-pointer inline-block mr-2"
                      >
                        #{hashtag}
                      </span>
                    ))
                  ) : (
                    <span className="ml-4 mt-1 mb-2 text-gray-700">#</span>
                  )}

                  {data ? (
                    data.taggedUsers.map((user) => (
                      <span
                        key={user.id}
                        className="ml-1 mt-1 mb-2 mr-2 text-gray-700 hover:underline cursor-pointer inline-block"
                      >
                        {`@${user.full_name}` || "#"}
                      </span>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
                {/* <img src={data?.displayUrl || "#"} /> */}
                <div className="relative w-full ">
                  <Image
                    src={data?.displayUrl}
                    alt="#"
                    title="#"
                    layout="responsive"
                    width={100}
                    height={20}
                    className="object-contain"
                  />
                </div>
                <div className="flex p-4 justify-between">
                  <div className="flex items-center space-x-2">
                    {/* <Image
                          src={post.media_url}
                          alt=""
                          title=""
                          width="100%"
                          height="100%"
                          layout="responsive"
                          objectFit="contain"
                        /> */}
                    <h2 className="text-gray-800 font-bold cursor-pointer">
                      test
                    </h2>
                  </div>
                </div>
                <div className="flex space-x-2 pl-4">
                  <div className="flex space-x-1 items-center">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7 text-gray-600 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </span>
                    <p className="text-black">{data.commentsCount || 0}</p>
                  </div>
                  <div className="flex space-x-1 items-center">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7 text-red-500 hover:text-red-400 transition duration-100 cursor-pointer"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <p className="text-black">{data.likesCount || 0}</p>
                  </div>
                </div>
              </Link>
            ) : (
              <></>
            )}

            {data ? (
              <div className="container p-5 bg-white rounded-xl shadow-lg transform transition duration-500  hover:shadow-2xl w-full sm:w-1/2">
                <ImpressionsBarChart
                  data={data?.userData?.followers_count || "0"}
                  name="Follower Impressions Over Time"
                />
              </div>
            ) : (
              <></>
            )}
            {/* <div class="card-body flex flex-col items-center justify-center">
              <div class="flex items-center justify-center mb-1">
                <span class="b-avatar badge-light-success rounded-full flex items-center justify-center">
                  <span class="b-avatar-custom">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21px"
                      height="21px"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-users"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </span>
                </span>
              </div>
              <div class="text-center">
                <h2 class="mb-2 font-bold text-xl">-1</h2>
                <span class="text-center text-sm">Followers Growth Rate</span>
              </div>
            </div>
            <div class="card-body flex flex-col items-center justify-center">
              <div class="flex items-center justify-center mb-1">
                <span class="b-avatar badge-light-success rounded-full flex items-center justify-center">
                  <span class="b-avatar-custom">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21px"
                      height="21px"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-trending-up"
                    >
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                      <polyline points="17 6 23 6 23 12"></polyline>
                    </svg>
                  </span>
                </span>
              </div>
              <div class="text-center">
                <h2 class="mb-2 font-bold text-xl">-1</h2>
                <span class="text-center text-sm">Followers Growth </span>
              </div>
            </div> */}

            {/* ))} */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Tagging;
