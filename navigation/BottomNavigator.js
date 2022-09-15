//import 'react-native-gesture-handler';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { COLORS } from '../constants';
import { TabButton, BIcons } from '../components';

//import { View } from 'react-native';
import TRANG_CHU from '../screens/TRANG_CHU';
import KT_THEO_BIEU_MAU from '../screens/KT_THEO_BIEU_MAU';
import BaoCaoTongHopGiaDangKy from '../screens/BaoCaoTongHopGiaDangKy';
import Login from '../screens/Login';
import Profile from '../screens/Profile';
import TRANG_CHUStack from '../navigation/Screens';
import BaoCaoGiaThiTruong116 from '../screens/BaoCaoGiaThiTruong116';

const TabArr = [
  {
    route: 'TRANG_CHU',
    label: 'Trang chủ',
    type: BIcons.Ionicons,
    activeIcon: 'home',
    inActiveIcon: 'home-outline',
    component: BaoCaoTongHopGiaDangKy,
  },
  {
    route: 'KT_THEO_BIEU_MAU',
    label: 'Khai thác theo biểu mẫu',
    type: BIcons.MaterialCommunityIcons,
    activeIcon: 'list-circle-sharp',
    inActiveIcon: 'list-circle-outline',
    component: KT_THEO_BIEU_MAU,
  },
  {
    route: 'Login',
    label: 'Đăng nhập',
    type: BIcons.Ionicons,
    activeIcon: 'log-in',
    inActiveIcon: 'log-in-outline',
    component: Login,
  },
  //{ route: 'Account', label: 'Account', type: Icons.FontAwesome, activeIcon: 'user-circle', inActiveIcon: 'user-circle-o', component: ColorScreen },
];

const Tab = createBottomTabNavigator();

function BottomNavigator(props) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 50,
          backgroundColor: COLORS.PRIMARY,
          position: 'absolute',
          //bottom: 0,
          //right: 16,
          //left: 16,
          //borderRadius: 16,
        },
      }}
    >
      {TabArr.map((item, index) => {
        //console.log(item);
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

export default BottomNavigator;

// const BottomNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarShowLabel: false,
//         tabBarStyle: {
//           backgroundColor: COLORS.PRIMARY,
//           height: 60,
//           position: 'absolute',
//           bottom: 10,
//           right: 16,
//           left: 16,
//           borderRadius: 16,
//         },
//         tabBarInactiveTintColor: '#fff',
//         tabBarActiveTintColor: 'yellow',
//       }}
//     >
//       <Tab.Screen
//         name="TRANG_CHU"
//         component={TRANG_CHU}
//         options={({ route }) => ({
//           // tabBarStyle: {
//           //   display: getTabBarVisibility(route),
//           //   backgroundColor: COLORS.PRIMARY,
//           // },
//           tabBarIcon: ({ focused, color, size }) => (
//             <Icon
//               name="home"
//               family="Font-Awesome"
//               size={24}
//               //style={{ borderColor: 'rgba(0,0,0,0.5)', opacity: 0.5 }}
//               color={focused ? COLORS.WHITE : COLORS.BORDER}
//             />
//           ),
//         })}
//       />
//       <Tab.Screen
//         name="KT_THEO_BIEU_MAU"
//         component={KT_THEO_BIEU_MAU}
//         options={({ route }) => ({
//           // tabBarStyle: {
//           //   display: getTabBarVisibility(route),
//           //   backgroundColor: COLORS.PRIMARY,
//           // },
//           tabBarIcon: ({ focused, color, size }) => (
//             <Icon
//               name="file-text-o"
//               family="Font-Awesome"
//               size={18}
//               //style={{ borderColor: 'rgba(0,0,0,0.5)', opacity: 0.5 }}
//               color={focused ? COLORS.WHITE : COLORS.BORDER}
//             />
//           ),
//         })}
//       />

//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={({ route }) => ({
//           // tabBarStyle: {
//           //   display: getTabBarVisibility(route),
//           //   backgroundColor: COLORS.PRIMARY,
//           // },
//           tabBarIcon: ({ focused, color, size }) => (
//             <Icon
//               name="user-o"
//               family="Font-Awesome"
//               size={18}
//               //style={{ borderColor: 'rgba(0,0,0,0.5)', opacity: 0.5 }}
//               color={focused ? COLORS.WHITE : COLORS.BORDER}
//             />
//           ),
//         })}
//       />
//       <Tab.Screen
//         name="Login"
//         component={Login}
//         options={({ route }) => ({
//           // tabBarStyle: {
//           //   display: getTabBarVisibility(route),
//           //   backgroundColor: COLORS.PRIMARY,
//           // },
//           tabBarIcon: ({ focused, color, size }) => (
//             <Icon
//               name="sign-in"
//               family="Font-Awesome"
//               size={18}
//               //style={{ borderColor: 'rgba(0,0,0,0.5)', opacity: 0.5 }}
//               color={focused ? COLORS.WHITE : COLORS.BORDER}
//             />
//           ),
//         })}
//       />
//     </Tab.Navigator>
//   );
// };

// const getTabBarVisibility = (route) => {
//   // console.log(route);
//   const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
//   // console.log(routeName);

//   if (routeName == 'KT_THEO_BIEU_MAU') {
//     return 'none';
//   }
//   return 'flex';
// };

// export default BottomNavigator;
