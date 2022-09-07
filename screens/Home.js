import React from 'react';
import { StyleSheet, Dimensions, View, ScrollView, SafeAreaView } from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import { WebView } from 'react-native-webview';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Card, Button } from '../components';
import articles from '../constants/articles';
const { width } = Dimensions.get('screen');

import Tabs from '../components/Tabs';

const Stack = createStackNavigator();

class Home extends React.Component {
  renderArticles = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
        <Block flex>
          <Card item={articles[0]} horizontal />
          <Block flex row>
            <Card item={articles[1]} style={{ marginRight: theme.SIZES.BASE }} />
            <Card item={articles[2]} />
          </Block>
          <Card item={articles[3]} horizontal />
          <Card item={articles[4]} full />
        </Block>
      </ScrollView>

      // <NavigationContainer>
      //   <Stack.Navigator
      //     screenOptions={{
      //       headerShown: false,
      //     }}
      //     initialRouteName={'MainLayout'}
      //   >
      //     <Stack.Screen name="MainLayout" component={Tabs} />
      //   </Stack.Navigator>
      // </NavigationContainer>
    );
  };

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderArticles()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular',
  },
});

export default Home;

// import React, { Component } from 'react';
// import { WebView } from 'react-native-webview';

// class Home extends React.Component {

//   render() {

//     return <WebView source={{ uri: 'http://113.160.48.98:8790/' }} />;

//   }

// }

// export default Home;
