import { useContext, useState } from "react";
import "./login.scss";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import {AuthContext} from "../../context/AuthContext"
import React from 'react';
import {
  collection,
  getDoc,
  deleteDoc,
  doc,
  onSnapshot
} from "firebase/firestore";
import { DataGrid } from "@mui/x-data-grid";
import { employeesColums, userColumns } from "../../datatablesource";
import Register from './Register'
import { db } from "../../firebase";
const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const [data, setData] = useState([]);
  const navitage = useNavigate()

  const {dispatch} = useContext(AuthContext)


  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({type:"LOGIN", payload:user})
        navitage("/")
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  };



  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="on"
        />
        <button type="submit">Login</button>
        {error && <span>Wrong email or password!</span>}
      </form>
      <div className="datatable">
      <div className="datatableTitle">
      
      {/* <Link
                to="/register"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                Don't have an account? Register
              </Link> */}
      </div>
   
    </div>
    </div>
  );
};

export default Login;
