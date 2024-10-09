// AccountProfileDetails.js
import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useCompanyData } from "../../../useCompanyData";
import { useUserTheme } from "../../../useUserTheme";
import RegistrationForm from '../../../components/popup/RegistrationForm';
export const AccountProfileDetails = (props) => {
  const { currentUser } = useContext(AuthContext);
  const userID = currentUser.uid;

  const { companyData, loadingCompanyData, companyDataError } = useCompanyData(userID);
  const { colorTheme, loadingTheme, themeError } = useUserTheme(userID);

  if (loadingCompanyData || loadingTheme) {
    return <div>Laster...</div>;
  }

  if (companyDataError || themeError) {
    return (
      <div>
        Feil ved lasting av data: {companyDataError?.message || themeError?.message}
      </div>
    );
  }

  if (!companyData) {
    // Render registreringsskjemaet hvis ingen firmadata finnes
    return <RegistrationForm />;
  }

  // Render profilinformasjon hvis firmadata finnes
  return (
    <div className={`profile-container ${colorTheme}`}>
      {/* Profilinformasjon JSX */}
      <h2>Din profil</h2>
      {/* Vis companyData */}
      <p>Bedriftsnavn: {companyData.companyName}</p>
      <p>Adresse: {companyData.streetAddress}, {companyData.zipCode} {companyData.region}</p>
      {/* Legg til mer profilinformasjon etter behov */}
    </div>
  );
};