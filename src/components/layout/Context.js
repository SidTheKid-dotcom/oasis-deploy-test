'use'
import { createContext, useState, useEffect } from "react";
import axios from "axios";
const BASE_URL = 'http://3.110.161.150:4000'
export const Context = createContext();

export const AppContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [navBarData, setNavBarData] = useState({});
  
  useEffect(() => {
    navBarText()
  }, [])
  const navBarText = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(BASE_URL+"/api/user/navbar",{
          headers: {
            Authorization: token,
          },
        })
        const {data,status} = await response
        if(status === 200 && data){
            setNavBarData(data)
        }
    } catch (error) {
        console.log(error)
    }
}
  return (
    <Context.Provider
      value={{
        loading,
        setLoading,
        mobileMenu,
        setMobileMenu,
        navBarData
      }}
    >
      {children}
    </Context.Provider>
  );
};


