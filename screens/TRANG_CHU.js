import React from "react";
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
const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();

const TRANG_CHU = () => {
  return <WebView source={{ uri: "http://113.160.48.98:8790/adHome2.aspx" }} />;
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
