import { DataModel } from "@/models/DataModel";
import { LoadDataService } from "@/services/LoadDataService";
import { useEffect, useState } from "react";

export const useFetchById = (id: string | string[]) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<DataModel>();
  const loadDataService = new LoadDataService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoaded(true);
        const res = await loadDataService.loadCSVById(id);
        if (res) {
          setData(res);
          setIsLoaded(false);
        } else {
          console.log("Item not found");
        }
      } catch (error) {
        console.log("Error:", error);
        setIsLoaded(false);
      }
    };
    fetchData();
  }, []);
  return { isLoaded, data };
};
