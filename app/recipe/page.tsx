"use client";
import React, { useState } from "react";
import { Pagination } from "antd";
import { Dropdown } from "@mui/base/Dropdown";
import { useTheme } from "@mui/system";
function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === "dark";
}
import { IoIosMenu } from "react-icons/io";
import { IoGrid } from "react-icons/io5";
import { useSearchParams } from "next/navigation";
import { LoadingComponent } from "@/components/LoadingComponent";
import Link from "next/link";
import "./styles.css";

import { useColumnChange } from "@/hooks/useHandler";
import useFetchAllData from "@/hooks/useFetchAllData";
import { Menu, MenuButton, MenuItem } from "@/components/MenuComponent";

export default function page() {
  const {
    data,
    setCurrentPage,
    isLoaded,
    currentPage,
    handleSortDefault,
    handleSortByNameAscending,
    handleSortByNameDescending,
    handlePageChange,
  } = useFetchAllData();

  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const { columns, handleColumnChange } = useColumnChange();

  // Calculate the current data slice based on currentPage and itemsPerPage
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;

  const filteredData = data.filter((item) => {
    const itemTitle = item.title.toLowerCase();
    const searchTermLower = search
      ? search.toLowerCase()
      : searchTerm.toLowerCase();
    return itemTitle.includes(searchTermLower) || itemTitle === searchTermLower;
  });

  const currentData = filteredData.slice(startIndex, endIndex);

  if (isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className="max-w-7xl justify-center items-center mx-auto">
      <div className={`flex justify-end gap-2 `}>
        <Pagination
          className="md:flex justify-center items-center mx-auto hidden"
          current={currentPage}
          pageSize={itemsPerPage}
          total={
            search === "" || search === null
              ? data.length // Show total length of all items when search is empty or null
              : filteredData.length // Show total length of filtered data when search is active
          }
          showSizeChanger
          showQuickJumper
          showTotal={(total) => `Total ${total} items`}
          onChange={handlePageChange}
          onShowSizeChange={(current, pageSize) => {
            setCurrentPage(1);
            setItemsPerPage(pageSize);
          }}
        />
        {/* <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={handleSearch}
        /> */}
        <div className="flex mx-5 xl:mx-0">
          <div className="mr-2">
            <Dropdown>
              <MenuButton>
                <IoIosMenu className="xl:text-2xl md:text-lg text-base" />
              </MenuButton>
              <Menu>
                <MenuItem
                  onClick={handleSortDefault}
                  style={{ cursor: "pointer" }}
                >
                  Defualt
                </MenuItem>
                <MenuItem
                  className="cursor-pointer"
                  style={{ cursor: "pointer" }}
                  onClick={handleSortByNameAscending}
                >
                  A-Z
                </MenuItem>
                <MenuItem
                  className="cursor-pointer"
                  style={{ cursor: "pointer" }}
                  onClick={handleSortByNameDescending}
                >
                  Z-A
                </MenuItem>
              </Menu>
            </Dropdown>
          </div>
          <div>
            <Dropdown>
              <MenuButton>
                <IoGrid className="xl:text-2xl md:text-lg text-base" />
              </MenuButton>
              <Menu>
                <MenuItem
                  onClick={() => handleColumnChange(3)}
                  style={{ cursor: "pointer" }}
                >
                  3 Columns
                </MenuItem>
                <MenuItem
                  onClick={() => handleColumnChange(4)}
                  style={{ cursor: "pointer" }}
                >
                  4 Columns
                </MenuItem>
                <MenuItem
                  onClick={() => handleColumnChange(5)}
                  style={{ cursor: "pointer" }}
                >
                  5 Columns
                </MenuItem>
              </Menu>
            </Dropdown>
          </div>
        </div>
      </div>
      <div
        className={`grid grid-cols-${columns} lg:gap-5 gap-2 mt-5 mx-5 xl:mx-0`}
      >
        {currentData.map((item) => (
          <div key={item.title} className="my-2">
            <Link href={`/recipe/${item.id}`} className="item">
              <div className="">
                <img
                  className={`item-image object-cover rounded-md w-[800px]`}
                  src={`food-images/${item.imageName}.jpg`}
                  alt={item.title}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = "images/image-not-found.jpg";
                  }}
                />
                <p
                  className={`line-clamp-2 ${
                    columns === 4
                      ? "lg:text-xl text-xs md:text-base"
                      : columns === 5
                      ? "lg:text-lg text-xs md:text-base"
                      : "lg:text-2xl text-xs md:text-base"
                  } font-bold mt-2`}
                >
                  {item.title}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="mx-5 xl:mx-0">
        <Pagination
          className="my-10 flex justify-center items-center mx-auto"
          current={currentPage}
          pageSize={itemsPerPage}
          total={
            search === "" || search === null
              ? data.length // Show total length of all items when search is empty or null
              : filteredData.length // Show total length of filtered data when search is active
          }
          showSizeChanger
          showQuickJumper
          showTotal={(total) => `Total ${total} items`}
          onChange={handlePageChange}
          onShowSizeChange={(current, pageSize) => {
            setCurrentPage(1); // Reset to the first page when changing the page size
            setItemsPerPage(pageSize); // Update the items per page
          }}
        />
      </div>
    </div>
  );
}
