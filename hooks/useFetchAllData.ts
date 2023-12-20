import { DataModel } from "@/models/DataModel";
import { LoadDataService } from "@/services/LoadDataService";
import { useEffect, useState } from "react";

const useFetchAllData = () => {
  const [data, setData] = useState<DataModel[]>([]);
  const loadDataService = new LoadDataService();
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoaded(true);
        const res = await loadDataService.loadCSV();
        const filteredRes = res.filter((item) => item.title); // Filter items with titles
        setData(filteredRes);
        setCurrentPage(1);
        setIsLoaded(false);
      } catch (error) {
        console.log("Error:", error);
        setIsLoaded(false);
      }
    };
    fetchData();
  }, []);

  const handleSortDefault = () => {
    const sortedDataById = [...data].sort(
      (a, b) => parseInt(a.id) - parseInt(b.id)
    );
    setData(sortedDataById);
  };
  const handleSortByNameAscending = () => {
    const sortedDataByName = [...data].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setData(sortedDataByName);
  };

  const handleSortByNameDescending = () => {
    const sortedDataByNameDescending = [...data].sort((a, b) =>
      b.title.localeCompare(a.title)
    );
    setData(sortedDataByNameDescending);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    data,
    setCurrentPage,
    isLoaded,
    currentPage,
    handleSortDefault,
    handleSortByNameAscending,
    handleSortByNameDescending,
    handlePageChange,
  };
};

export default useFetchAllData;
