import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import React, {useContext}  from 'react';

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("users")) || null,
};

export const AuthContext = createContext(INITIAL_STATE);
export function useAuthValue(){
  return useContext(AuthContext)
}
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );

  
};
