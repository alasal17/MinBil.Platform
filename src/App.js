import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import ProductsList from "./pages/list/ProductsList";
import Sales from "./pages/sales/Sales";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import UpdateProducts from "./pages/new/UpdateProducts";
import AddProduct from "./pages/new/AddProduct";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs, productUpdate } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import Calendars from "./pages/single/Calenders";

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
            <Route path="/login" element={<Login />} />
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="/users">
              <Route
                index
                element={
                  <RequireAuth>
                    <List pageTitle="Legg til en ny bruker"/>
                  </RequireAuth>
                }
              />
              <Route
                path=":userId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <New inputs={userInputs} title="Legg til ny bruker"/>
                  </RequireAuth>
                }
              />
            </Route>
            
            <Route path="/products">
              <Route
                index
                element={
                  <RequireAuth>
                    <ProductsList pageTitle="Legg til produkt" />
                  </RequireAuth>
                }
              />
              <Route
                path=":productId"
                element={
                  <RequireAuth>
                    <Sales />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <AddProduct inputs={productInputs} title="Legg til nytt produkt" />
                  </RequireAuth>
                }
              />

<Route
                path="update"
                element={
                  <RequireAuth>
                    <UpdateProducts inputs={productInputs} title="Endre produkt" />
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
            
            </Route>
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
