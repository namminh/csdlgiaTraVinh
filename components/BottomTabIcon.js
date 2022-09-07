import { React } from 'react';
import { View, Text, Image } from 'react-native';
import { COLORS } from '../constants/Theme';

const BottomTabIcon = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.BLACK,
      }}
    >
      <Text style={{ color: COLORS.WHITE }}>Tab</Text>
    </View>
  );
};

export default BottomTabIcon;

// import React from "react";
// import {
//     TouchableOpacity,
// } from "react-native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

// import { Home, Profile } from "../screens"
// import { COLORS } from "../constants"

// const Tab = createBottomTabNavigator()

// const Tabs = () => {

//     return (
//         <Tab.Navigator
//             tabBarOptions={{
//                 style: {
//                     backgroundColor: COLORS.primary,
//                     borderTopColor: "transparent",
//                 }
//             }}
//         >
//             <Tab.Screen
//                 name="Home"
//                 component={Home}
//             />
//             <Tab.Screen
//                 name="Portfolio"
//                 component={Portfolio}
//             />
//             <Tab.Screen
//                 name="Trade"
//                 component={Home}
//             />
//             <Tab.Screen
//                 name="Market"
//                 component={Market}
//             />
//             <Tab.Screen
//                 name="Profile"
//                 component={Profile}
//             />
//         </Tab.Navigator>
//     )
// }

// export default Tabs;
