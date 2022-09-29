import { Animated, Dimensions, Easing } from 'react-native';
// header for screens
import { Header, Icon } from '../components';
import { nowTheme, tabs } from '../constants';
import Tabs from '../components/Tabs';
import BottomNavigator from '../navigation/BottomNavigator';

import Articles from '../screens/Articles';
import { Block } from 'galio-framework';
import Components from '../screens/Components';
// drawer
import CustomDrawerContent from './Menu';
// screens
import Onboarding from '../screens/Onboarding';
import Pro from '../screens/Pro';
import Profile from '../screens/Profile';
import React from 'react';
import Register from '../screens/Register';
import Login from '../screens/Login';
import TRANG_CHU from '../screens/TRANG_CHU';
import KT_THEO_BIEU_MAU from '../screens/KT_THEO_BIEU_MAU';
import BaoCaoTongHopGiaDangKy from '../screens/BaoCaoTongHopGiaDangKy';
import BaoCaoTongHopGiaKeKhai from '../screens/BaoCaoTongHopGiaKeKhai';
import KhaiThacGiaVLXD from '../screens/KhaiThacGiaVLXD';
import BaoCaoGiaThiTruong116 from '../screens/BaoCaoGiaThiTruong116';
import BaoCaoGiaThiTruongLanhDaoUBND from '../screens/BaoCaoGiaThiTruongLanhDaoUBND';
import BaoCaoGiaThiTruong142 from '../screens/BaoCaoGiaThiTruong142';
import TraCuuGiaHHDVNhaNuocDinhGia from '../screens/TraCuuGiaHHDVNhaNuocDinhGia';
import BaoCaoGiaThiThuongTongHop from '../screens/BaoCaoGiaThiThuongTongHop';
import BaoCaoTongHopGiaTaiSanTDG from '../screens/BaoCaoTongHopGiaTaiSanTDG';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

const { width } = Dimensions.get('screen');

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function TRANG_CHUStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="TRANG_CHU"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="TRANG_CHU"
        component={TRANG_CHU}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Trang chủ" search options navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
    </Stack.Navigator>
  );
}

function BaoCaoGiaThiTruong116Stack(props) {
  return (
    <Stack.Navigator
      initialRouteName="BaoCaoGiaThiTruong116"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="BaoCaoGiaThiTruong116"
        component={BaoCaoGiaThiTruong116}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Báo cáo giá thị trường TT116" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
      {/* <Stack.Screen name="Home" component={BottomNavigator} /> */}
    </Stack.Navigator>
  );
}

function BaoCaoGiaThiTruong142Stack(props) {
  return (
    <Stack.Navigator
      initialRouteName="BaoCaoGiaThiTruong142"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="BaoCaoGiaThiTruong142"
        component={BaoCaoGiaThiTruong142}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Báo cáo giá thị trường TT142" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
      {/* <Stack.Screen name="Home" component={BottomNavigator} /> */}
    </Stack.Navigator>
  );
}

function BaoCaoTongHopGiaDangKyStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="BaoCaoTongHopGiaDangKy"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="BaoCaoTongHopGiaDangKy"
        component={BaoCaoTongHopGiaDangKy}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Khai thác dữ liệu theo chỉ tiêu" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
      {/* <Stack.Screen name="Home" component={BottomNavigator} /> */}
    </Stack.Navigator>
  );
}
function BaoCaoTongHopGiaKeKhaiStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="BaoCaoTongHopGiaKeKhai"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="BaoCaoTongHopGiaKeKhai"
        component={BaoCaoTongHopGiaKeKhai}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Báo cáo Tổng hợp giá kê khai" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
      {/* <Stack.Screen name="Home" component={BottomNavigator} /> */}
    </Stack.Navigator>
  );
}

function KhaiThacGiaVLXDStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="KhaiThacGiaVLXD"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="KhaiThacGiaVLXD"
        component={KhaiThacGiaVLXD}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Khai Thác Giá Vật Liệu Xây Dựng" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
      {/* <Stack.Screen name="Home" component={BottomNavigator} /> */}
    </Stack.Navigator>
  );
}

function BaoCaoGiaThiTruongLanhDaoUBNDStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="BaoCaoGiaThiTruongLanhDaoUBND"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="BaoCaoGiaThiTruongLanhDaoUBND"
        component={BaoCaoGiaThiTruongLanhDaoUBND}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Chức năng Báo cáo phục vụ lãnh đạo STC, UBND"
              navigation={navigation}
              scene={scene}
            />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
      {/* <Stack.Screen name="Home" component={BottomNavigator} /> */}
    </Stack.Navigator>
  );
}

function TraCuuGiaHHDVNhaNuocDinhGiaStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="TraCuuGiaHHDVNhaNuocDinhGia"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="TraCuuGiaHHDVNhaNuocDinhGia"
        component={TraCuuGiaHHDVNhaNuocDinhGia}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Báo cáo Giá hàng hóa định giá" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
      {/* <Stack.Screen name="Home" component={BottomNavigator} /> */}
    </Stack.Navigator>
  );
}
function BaoCaoGiaThiThuongTongHopStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="BaoCaoGiaThiThuongTongHop"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="BaoCaoGiaThiThuongTongHop"
        component={BaoCaoGiaThiThuongTongHop}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Báo cáo tổng hợp giá thị trường" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
      {/* <Stack.Screen name="Home" component={BottomNavigator} /> */}
    </Stack.Navigator>
  );
}

function BaoCaoTongHopGiaTaiSanTDGStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="BaoCaoGiaThiThuongTongHop"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="BaoCaoTongHopGiaTaiSanTDG"
        component={BaoCaoTongHopGiaTaiSanTDG}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Báo cáo tổng hợp giá trị tài sản TĐG"
              navigation={navigation}
              scene={scene}
            />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
      {/* <Stack.Screen name="Home" component={BottomNavigator} /> */}
    </Stack.Navigator>
  );
}

function KT_THEO_BIEU_MAUStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="KT_THEO_BIEU_MAU"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="KT_THEO_BIEU_MAU"
        component={KT_THEO_BIEU_MAU}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Khai thác theo biểu mẫu" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
}

function ComponentsStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Components"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Components"
        component={Components}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Components" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
      {/* <Stack.Screen name="Home" component={BottomNavigator} /> */}
    </Stack.Navigator>
  );
}

function ArticlesStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Articles"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Articles" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
}

function AccountStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Account"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Account"
        component={Register}
        options={{
          header: ({ navigation, scene }) => (
            <Header transparent title="Create Account" navigation={navigation} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}
function LoginStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        mode: 'card',
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          header: ({ navigation, scene }) => (
            <Header transparent title="Đăng nhập" navigation={navigation} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header transparent white title="Profile" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="" back white transparent navigation={navigation} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  //console.log(props);
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: nowTheme.COLORS.PRIMARY,
        width: width * 0.8,
      }}
      screenOptions={{
        //drawerContentOptions={{
        activeTintcolor: nowTheme.COLORS.WHITE,
        inactiveTintColor: nowTheme.COLORS.WHITE,
        activeBackgroundColor: 'transparent',
        itemStyle: {
          width: width * 0.75,
          backgroundColor: 'transparent',
          //backgroundColor: nowTheme.COLORS.PRIMARY,
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: 'normal',
        },
      }}
      initialRouteName="TRANG_CHU"
    >
      <Drawer.Screen
        name="TRANG_CHU"
        component={TRANG_CHUStack}
        options={{
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="BaoCaoGiaThiTruong116"
        component={BaoCaoGiaThiTruong116Stack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="BaoCaoGiaThiTruong142"
        component={BaoCaoGiaThiTruong142Stack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="BaoCaoTongHopGiaDangKy"
        component={BaoCaoTongHopGiaDangKyStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="BaoCaoGiaThiTruongLanhDaoUBND"
        component={BaoCaoGiaThiTruongLanhDaoUBNDStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="BaoCaoTongHopGiaKeKhai"
        component={BaoCaoTongHopGiaKeKhaiStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="TraCuuGiaHHDVNhaNuocDinhGia"
        component={TraCuuGiaHHDVNhaNuocDinhGiaStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="BaoCaoGiaThiThuongTongHop"
        component={BaoCaoGiaThiThuongTongHopStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="KhaiThacGiaVLXD"
        component={KhaiThacGiaVLXDStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="BaoCaoTongHopGiaTaiSanTDG"
        component={BaoCaoTongHopGiaTaiSanTDGStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="KT_THEO_BIEU_MAU"
        component={KT_THEO_BIEU_MAUStack}
        options={{
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="Components"
        component={ComponentsStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Articles"
        component={ArticlesStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Account"
        component={AccountStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Login"
        component={LoginStack}
        options={{
          headerShown: false,
        }}
      />
      {/* <Drawer.Screen
        name="BottomNavigator"
        component={BottomNavigator}
        options={{
          headerShown: false,
        }}
      /> */}
    </Drawer.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: 'card',
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        option={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}
