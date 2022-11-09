import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Block, theme, Text } from "galio-framework";
import { WebView } from "react-native-webview";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { Card, Button } from "../components";
import articles from "../constants/articles";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();

const TRANG_CHU = () => {
  const [UrlInfo, seturl] = useState([]);  

  async function isLoggedIn(){
    
    try {

      let UrlInfo = await AsyncStorage.getItem("Dia_chi_Url");
      seturl(UrlInfo);

     
      console.log(`TRANG CHU in Url ${UrlInfo}`);


    } catch (e) {
      console.log(`is logged in error ${e}`);
    }
  };
  useEffect(() => {
    isLoggedIn();
   
  }, []);
  return <WebView source={{ uri: `${UrlInfo}/adHome2.aspx?` }} />;
  // return (
  //   <Block flex center style={styles.home}>
  //     {this.renderArticles()}
  //   </Block>
  // );
};

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: "montserrat-regular",
  },
});

export default TRANG_CHU;

// import React, { Component } from 'react';
// import { WebView } from 'react-native-webview';

// class Home extends React.Component {

//   render() {

//     return <WebView source={{ uri: 'http://113.160.48.98:8790/' }} />;

//   }

// }

// export default Home;
