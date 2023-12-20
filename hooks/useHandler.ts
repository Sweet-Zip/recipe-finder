import { DataModel } from "@/models/DataModel";
import { ChangeEvent, useEffect, useState } from "react";

export function useHandler(data: DataModel[]) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filteredData = data.filter((item) => {
      const itemTitle = item.title.toLowerCase();
      const searchTermLower = term.toLowerCase(); // Use the updated term here
      return (
        itemTitle.includes(searchTermLower) || itemTitle === searchTermLower
      );
    });

    console.log(filteredData); // You can use the filteredData as needed
  };
  return { searchTerm, handleSearch };
}

export function useColumnChange() {
  const [columns, setColumns] = useState(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const savedColumns = window.localStorage.getItem("columns");
      return savedColumns ? parseInt(savedColumns) : 3;
    } else {
      return 3; // Default value if localStorage is not available
    }
  });

  const handleColumnChange = (colCount: number) => {
    setColumns(colCount);
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem("columns", colCount.toString());
    }
  };

  return { columns, handleColumnChange };
}
