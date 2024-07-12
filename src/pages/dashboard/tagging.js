"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "./layout";

const tagging = () => {
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState();
  const fetchdata = async () => {
    setloading(true);
    try {
      const response = await fetch(`/api/buiseness/tags`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setdata(data);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <DashboardLayout>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <form className="max-w-md mx-auto">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                onChange={(e) => {
                  // setInputValue(e.target.value);
                }}
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 /dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Username "
                required
              />
              <button
                // onClick={fetchData}
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 bg-gray-900"
              >
                Search
              </button>
            </div>
          </form>

          <div class="relative overflow-x-auto shadow-md sm:rounded-lg pt-12">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Username
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Publish Time
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Likes
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Comments
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Post Link
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    john_doe
                  </th>
                  <td class="px-6 py-4">2024-07-10 10:30 AM</td>
                  <td class="px-6 py-4">150</td>
                  <td class="px-6 py-4">20</td>
                  <td class="px-6 py-4">
                    <a
                      href="https://instagram.com/p/12345"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      View Post
                    </a>
                  </td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    john_doe
                  </th>
                  <td class="px-6 py-4">2024-07-10 10:30 AM</td>
                  <td class="px-6 py-4">150</td>
                  <td class="px-6 py-4">20</td>
                  <td class="px-6 py-4">
                    <a
                      href="https://instagram.com/p/12345"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      View Post
                    </a>
                  </td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    john_doe
                  </th>
                  <td class="px-6 py-4">2024-07-10 10:30 AM</td>
                  <td class="px-6 py-4">150</td>
                  <td class="px-6 py-4">20</td>
                  <td class="px-6 py-4">
                    <a
                      href="https://instagram.com/p/12345"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      View Post
                    </a>
                  </td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    john_doe
                  </th>
                  <td class="px-6 py-4">2024-07-10 10:30 AM</td>
                  <td class="px-6 py-4">150</td>
                  <td class="px-6 py-4">20</td>
                  <td class="px-6 py-4">
                    <a
                      href="https://instagram.com/p/12345"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      View Post
                    </a>
                  </td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    john_doe
                  </th>
                  <td class="px-6 py-4">2024-07-10 10:30 AM</td>
                  <td class="px-6 py-4">150</td>
                  <td class="px-6 py-4">20</td>
                  <td class="px-6 py-4">
                    <a
                      href="https://instagram.com/p/12345"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      View Post
                    </a>
                  </td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    john_doe
                  </th>
                  <td class="px-6 py-4">2024-07-10 10:30 AM</td>
                  <td class="px-6 py-4">150</td>
                  <td class="px-6 py-4">20</td>
                  <td class="px-6 py-4">
                    <a
                      href="https://instagram.com/p/12345"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      View Post
                    </a>
                  </td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    john_doe
                  </th>
                  <td class="px-6 py-4">2024-07-10 10:30 AM</td>
                  <td class="px-6 py-4">150</td>
                  <td class="px-6 py-4">20</td>
                  <td class="px-6 py-4">
                    <a
                      href="https://instagram.com/p/12345"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      View Post
                    </a>
                  </td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    john_doe
                  </th>
                  <td class="px-6 py-4">2024-07-10 10:30 AM</td>
                  <td class="px-6 py-4">150</td>
                  <td class="px-6 py-4">20</td>
                  <td class="px-6 py-4">
                    <a
                      href="https://instagram.com/p/12345"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      View Post
                    </a>
                  </td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    john_doe
                  </th>
                  <td class="px-6 py-4">2024-07-10 10:30 AM</td>
                  <td class="px-6 py-4">150</td>
                  <td class="px-6 py-4">20</td>
                  <td class="px-6 py-4">
                    <a
                      href="https://instagram.com/p/12345"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      View Post
                    </a>
                  </td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    john_doe
                  </th>
                  <td class="px-6 py-4">2024-07-10 10:30 AM</td>
                  <td class="px-6 py-4">150</td>
                  <td class="px-6 py-4">20</td>
                  <td class="px-6 py-4">
                    <a
                      href="https://instagram.com/p/12345"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      View Post
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <nav
              class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
              aria-label="Table navigation"
            >
              <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                Showing{" "}
                <span class="font-semibold text-gray-900 dark:text-white">
                  1-10
                </span>{" "}
                of{" "}
                <span class="font-semibold text-gray-900 dark:text-white">
                  1000
                </span>
              </span>
              <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                <li>
                  <a
                    href="#"
                    class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Previous
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    aria-current="page"
                    class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  >
                    3
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    4
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    5
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default tagging;
