// useCompanyData.js
import { useState, useEffect } from "react";
import { fetchDocument } from "./fetchData"; // Juster stien hvis nødvendig

export const useCompanyData = (userID) => {
  const [companyData, setCompanyData] = useState(null);
  const [loadingCompanyData, setLoadingCompanyData] = useState(true);
  const [companyDataError, setCompanyDataError] = useState(null);

  useEffect(() => {
    const getCompanyData = async () => {
      try {
        const data = await fetchDocument("company", userID);
        if (data) {
          setCompanyData(data);
        } else {
          console.warn("Ingen firmadata funnet for bruker:", userID);
        }
      } catch (err) {
        console.error("Feil ved henting av firmadata:", err);
        setCompanyDataError(err);
      } finally {
        setLoadingCompanyData(false);
      }
    };
    getCompanyData();
  }, [userID]);

  return { companyData, loadingCompanyData, companyDataError };
};
