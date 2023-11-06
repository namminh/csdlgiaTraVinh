import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { appConfig } from "../constants";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [UrlInfo, setUrlInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  
  const register = (name, email, password) => {
    setIsLoading(true);
    console.log(`set UrlInfo ${UrlInfo}`);
    axios
      .post(`${UrlInfo}/mwebapi/register`, {
        name,
        email,
        password,
      })
      .then((res) => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        setIsLoading(false);
        console.log(userInfo);
      })
      .catch((e) => {
        console.log(`register error ${e}`);
        setIsLoading(false);
      });
  };

  const changepass = async (username, password, newpassword) => {
    setIsLoading(true);
    let config = {
      headers: {
        username: username,
        password: password,
        newpassword: newpassword,
      },
      params: {
       
        
      },
    };
    let msg = "Thất bại";
    await axios
      .get(`${UrlInfo}/mwebapi/changepass`, config)
      .then((res) => {
        let userInfo = res.data.Result;
        //console.log(userInfo);
        // If success
        if (userInfo && userInfo.access_token) {
          msg = "Đổi mật khẩu thành công";
          console.log("Xoa storage");
          AsyncStorage.removeItem("userInfo");
          setUserInfo({});
        }
        setIsLoading(false);
      })
      .catch((e) => {
        msg = `Thất bại: ${e}`;
        console.log(msg);
        setIsLoading(false);
      });
    return msg;
  };

  const login = async (username, password) => {
    setIsLoading(true);
    AsyncStorage.setItem("Dia_chi_Url", "http://113.160.48.98:8794");

    setUrlInfo('http://113.160.48.98:8794');
      
    
    let url = `${UrlInfo}/mwebapi/validateaccount`;
    //let url = `${appConfig.BASE_URL}/validateaccount?username=${username}&password=${password}`;
    let config = {
      headers: {
        username: username,
        password: password,
      },
      params: {
       
        
      },
    };
    console.log(url);
    let msg = "";
    try {
      const res = await axios.get(url, config);
      const userInfo = res.data.Result;
      msg = res.data.Message;
      console.log(msg);
      setUserInfo(userInfo);
       AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
    } catch (e) {
      console.log(`register error ${e}`);
      msg = `register error ${e}`;
    } finally {
      setIsLoading(false);
    }
    return msg;
   
  };
  const checkUrl = async (Url) => {
    
    
    let url = `http://113.160.48.98:8794/mwebapi/validateaccount`;
    
    //let url = `${appConfig.BASE_URL}/validateaccount?username=${username}&password=${password}`;
    let config = {
      headers: {
        
        'Content-Type': 'multipart/form-data',
        'Accept': "application/json",
        username: 'admin',
        password: 'csdl@123',
      },
      params: {
        
        country:'',
        apiKey: '',
        },
    };
    console.log(url);
    console.log(config);
    let msg = "";
   

    
    await axios
      .get(url, config)
      .then((res) => {
        // let userInfo = res.data.Result;
        msg = res.data.Message;
        console.log(msg);
        setUrlInfo(Url);
        
          AsyncStorage.setItem("Dia_chi_Url", Url);
        
        
       
        // setIsLoading(false);
        console.log(msg);
      })
      .catch((e) => {
        AsyncStorage.setItem("Dia_chi_Url", Url);
        console.log(`register error ${e}`);
        msg = `register error ${e}`;
        setIsLoading(false);
      });
    return msg;
    
  };

  const logout = () => {
    setIsLoading(true);
    AsyncStorage.removeItem("userInfo");
    setUserInfo({});
    setIsLoading(false);

   
  };

  const isLoggedIn = async () => {
    try {
      console.log(`Check login status: ${splashLoading}`);
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem("userInfo");
      let UrlInfo = await AsyncStorage.getItem("Dia_chi_Url");
      userInfo = JSON.parse(userInfo);
      setUrlInfo(UrlInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }
     

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, [UrlInfo]);
  
  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        UrlInfo,
        splashLoading,
        checkUrl,
        login,
        logout,
        register,
        changepass,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
