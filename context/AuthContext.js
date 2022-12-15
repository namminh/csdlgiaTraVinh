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
    if(!UrlInfo)
    {
      setUrlInfo('http://113.160.48.98:8798');
    }
    let url = `${UrlInfo}/mwebapi/validateaccount`;
    //let url = `${appConfig.BASE_URL}/validateaccount?username=${username}&password=${password}`;
    let config = {
      headers: {
        username: username,
        password: password,
      },
    };
    console.log(url);
    let msg = "";
    await axios
      .get(url, config)
      .then((res) => {
        let userInfo = res.data.Result;
        msg = res.data.Message;
        console.log(msg);
        setUserInfo(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        setIsLoading(false);
        //console.log(userInfo);
      })
      .catch((e) => {
        console.log(`register error ${e}`);
        msg = `register error ${e}`;
        setIsLoading(false);
      });
    return msg;
    // axios
    //   .post({
    //     url: url,
    //     config: config,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     // let ret = res.data;
    //     // let userInfo = res.data.Result;
    //     // console.log(userInfo);
    //     // setUserInfo(userInfo);
    //     // AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
    //     // setIsLoading(false);
    //   })
    //   .catch((e) => {
    //     console.log(`login error ${e}`);
    //     setIsLoading(false);
    //   });
  };
  const checkUrl = async (Url) => {
    
    // console.log(Url);
    let url = `${Url}/mwebapi/validateaccount`;
    //let url = `${appConfig.BASE_URL}/validateaccount?username=${username}&password=${password}`;
    let config = {
      headers: {
        username: 'test',
        password: '123456',
      },
    };
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
        //console.log(userInfo);
      })
      .catch((e) => {
        console.log(`register error ${e}`);
        msg = `register error ${e}`;
        setIsLoading(false);
      });
    return msg;
    // axios
    //   .post({
    //     url: url,
    //     config: config,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     // let ret = res.data;
    //     // let userInfo = res.data.Result;
    //     // console.log(userInfo);
    //     // setUserInfo(userInfo);
    //     // AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
    //     // setIsLoading(false);
    //   })
    //   .catch((e) => {
    //     console.log(`login error ${e}`);
    //     setIsLoading(false);
    //   });
  };

  const logout = () => {
    setIsLoading(true);
    AsyncStorage.removeItem("userInfo");
    setUserInfo({});
    setIsLoading(false);

    // axios
    //   .post(
    //     `${appConfig.BASE_URL}/logout`,
    //     {},
    //     {
    //       headers: { Authorization: `Bearer ${userInfo.access_token}` },
    //     }
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    //     AsyncStorage.removeItem("userInfo");
    //     setUserInfo({});
    //     setIsLoading(false);
    //   })
    //   .catch((e) => {
    //     console.log(`logout error ${e}`);
    //     setIsLoading(false);
    //   });
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
