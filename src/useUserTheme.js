// useUserTheme.js
import { useState, useEffect } from "react";
import { fetchDocument } from "./fetchData"; // Juster stien etter behov

export const useUserTheme = (userID) => {
  const [colorTheme, setColorTheme] = useState('green-theme');
  const [loadingTheme, setLoadingTheme] = useState(true);
  const [themeError, setThemeError] = useState(null);

  useEffect(() => {
    const getUserTheme = async () => {
      try {
        const themeData = await fetchDocument("userTheme", userID);
        if (themeData) {
          setColorTheme(themeData.baseColor || 'green-theme');
        } else {
          console.warn("Ingen bruker-tema funnet for bruker:", userID);
        }
      } catch (err) {
        console.error("Feil ved henting av brukertema:", err);
        setThemeError(err);
      } finally {
        setLoadingTheme(false);
      }
    };
    getUserTheme();
  }, [userID]);

  return { colorTheme, loadingTheme, themeError };
};
