/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import category from "../mockData/category.json";
import catalog from "../mockData/catalog.json";
import httpService from "../services/http.service";

const useMockData = () => {
  const statusConst = {
    idle: "Not Satarted",
    pending: "In Progress",
    success: "Completed",
    error: "Error",
  };
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(statusConst.idle);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const summaryCount = category.length + catalog.length;
  const incrementCount = () => {
    setCount((prevState) => prevState + 1);
  };
  const updateProgress = () => {
    if (count !== 0 && status === statusConst.idle) {
      setStatus(statusConst.pending);
    }
    const newProgress = Math.floor((count / summaryCount) * 100);
    if (progress < newProgress) {
      setProgress(() => newProgress);
    }
    if (newProgress === 100) {
      setStatus(statusConst.success);
    }
  };

  useEffect(() => {
    updateProgress();
  }, [count]);

  async function initialize() {
    try {
      for (const categ of category) {
        await httpService.put("category/" + categ.id, category);
        incrementCount();
      }
      for (const cat of catalog) {
        await httpService.put("catalog/" + cat.id, cat);
        incrementCount();
      }
    } catch (error) {
      setError(error);
      setStatus(statusConst.error);
    }
  }

  return { error, initialize, progress, status };
};

export default useMockData;
