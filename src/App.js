
import EmployeesList from "./pages/list/EmployeesList";
import ServicesList from "./pages/list/ServicesList";
import Sales from "./pages/sales/Sales";
import Single from "./pages/single/Single";
import AddServices from "./pages/new/AddServices";
import AddEvent from "./pages/new/AddEvent";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {eventInput, serviceInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import Calendars from "./pages/calendar/Calenders";
import React, {Suspense, useEffect, useState}  from 'react';
import VerifyEmail from '../src/pages/register/VerifyEmail';
import Profile from './pages/profile/Profile';
import AuthPage from "./pages/login/AuthPage";
import PlatfromSettings from "./pages/settings/platfromSettings/PlatfromSettings";
import AccountSettings from "./pages/settings/accountSettings/AccountSettings";



const Home = React.lazy(() => wait(30).then(() => import('./pages/home/Home')))


function App() {
  const { darkMode } = useContext(DarkModeContext);
  const [showPopup, setShowPopup] = useState(false);
  const {currentUser} = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };



  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
         
        <Route path="/">
   
            <Route path="/login" element={<AuthPage />} />
            <Route
              index
              element={
              

           
                 
                <RequireAuth>
                  <Home />
                </RequireAuth>
            
              }
            />

             
            <Route path="/employee">
              <Route
                index
                element={
                  <RequireAuth>
                    <EmployeesList pageTitle="Legg til en ny ansatt"/>
                  </RequireAuth>
                }
              />
              <Route
                path=":employeeId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
  
            </Route>
            
            <Route path="/service">
              <Route
                index
                element={
                  <RequireAuth>
                    <ServicesList pageTitle="Legg til tjeneste" />
                  </RequireAuth>
                }
              />
              <Route
                path=":serviceId"
                element={
                  <RequireAuth>
                    <Sales />
                  </RequireAuth>
                }
              />


              

            </Route>
            <Route path="/calender">
              <Route
                index
                element={
                  <RequireAuth>
                    <Calendars/>
                   
                  </RequireAuth>
                }
              />
              <Route
                path="new-event"
                element={
                  <RequireAuth>
                    <AddEvent inputs={eventInput} title="Legg til nytt event" />
                  </RequireAuth>
                }
              />

              <Route
                path=":calenderId"
                element={
                  <RequireAuth>
                    <Sales />
                  </RequireAuth>
                }
              />
            
            </Route>

            <Route
                path="/profile"
                element={
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                }
              />

              <Route
                path="/platform-settings"
                element={
                  <RequireAuth>
                    <PlatfromSettings />
                  </RequireAuth>
                }
              />
            <Route
                path="/account-settings"
                element={
                  <RequireAuth>
                    <AccountSettings />
                  </RequireAuth>
                }
              />
         
    
            <Route path='/verify-email' element={<VerifyEmail/>} /> 
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
function wait(time) {
  return new Promise(resolve => {
    setTimeout( resolve, time)
})}
export default App;


