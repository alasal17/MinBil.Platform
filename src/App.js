// import 'devextreme/dist/css/dx.common.css';
// import 'devextreme/dist/css/dx.light.css';
import Home from "./pages/home/Home";
// import Register from "./pages/login/Register";
// import EmployeesList from "./pages/list/EmployeesList";
// import ServicesList from "./pages/list/ServicesList";
import Sales from "./pages/sales/Sales";
// import Single from "./pages/single/Single";
// import AddServices from "./pages/new/AddServices";
// import AddEvent from "./pages/new/AddEvent";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {eventInput, serviceInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import Calendars from "./pages/calendar/Calenders";
import React  from 'react';
import VerifyEmail from '../src/pages/register/VerifyEmail';
import Profile from './pages/profile/Profile';
import AuthPage from "./pages/login/AuthPage";


const EmployeesList = React.lazy(() => import("./pages/list/EmployeesList"));
const ServicesList = React.lazy(() => import("./pages/list/ServicesList"));
const Single = React.lazy(() => import("./pages/single/Single"));
const AddServices = React.lazy(() => import("./pages/new/AddServices"));
const AddEvent = React.lazy(() => import("./pages/new/AddEvent"));

function App() {
  const { darkMode } = useContext(DarkModeContext);

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
              {/* <Route
                path="new-employee"
                element={
                  <RequireAuth>
                    <New inputs={employeeInput} title="Legg til ny ansatt"/>
                  </RequireAuth>
                }
              /> */}
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
              <Route
                path="new-service"
                element={
                  <RequireAuth>
                    <AddServices inputs={serviceInputs} title="Legg til nytt tjeneste" />
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


            
         
            {/* <Route path="/register">
              <Route
                index
                element={
                 
                    <Register/>
                 
                }
              />

            </Route> */}
            <Route path='/verify-email' element={<VerifyEmail/>} /> 
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
