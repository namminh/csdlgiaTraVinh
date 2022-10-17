import { Block, Text, theme } from "galio-framework";
import { Linking, StyleSheet, TouchableOpacity } from "react-native";

import Icon from "./Icon";
import { BIcon } from ".";
import React, { useContext } from "react";
import nowTheme from "../constants/Theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";
//import Login from '../screens/Login';

const DrawerItem = (props) => {
  renderIcon = () => {
    const { name, title, focused } = props;
    switch (name) {
      case "TRANG_CHU":
        return (
          <BIcon
            name="md-home-outline"
            //family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.8 }}
          />
        );
      case "BaoCaoTongHopGiaDangKy":
        return (
          <Icon
            name="paper"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.8 }}
          />
        );
      case "BaoCaoTongHopGiaKeKhai":
        return (
          <Icon
            name="briefcase-242x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.8 }}
          />
        );

      case "BaoCaoGiaThiTruong142":
        return (
          <BIcon
            name="md-today-outline"
            //family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.8 }}
          />
        );
      case "TraCuuGiaHHDVNhaNuocDinhGia":
        return (
          <BIcon
            name="md-open-outline"
            //family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.8 }}
          />
        );
      case "BaoCaoGiaThiThuongTongHop":
        return (
          <BIcon
            name="md-file-tray-stacked-outline"
            //family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.8 }}
          />
        );
      case "KhaiThacGiaVLXD":
        return (
          <BIcon
            name="md-cog"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.8 }}
          />
        );
      case "BaoCaoTongHopGiaTaiSanTDG":
        return (
          <BIcon
            name="ios-receipt-outline"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.8 }}
          />
        );
      case "BaoCaoGiaThiTruong116":
        return (
          <Icon
            name="spaceship2x"
            family="NowExtra"
            size={18}
            style={{ borderColor: "rgba(0,0,0,0.5)", opacity: 0.8 }}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
          />
        );
      case "BaoCaoGiaThiTruongLanhDaoUBND":
        return (
          <Icon
            name="mobile2x"
            family="NowExtra"
            size={18}
            style={{ borderColor: "rgba(0,0,0,0.5)", opacity: 0.8 }}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
          />
        );
      case "LOG_OUT":
        return (
          <Icon
            name="share"
            family="NowExtra"
            size={18}
            style={{ borderColor: "rgba(0,0,0,0.5)", opacity: 0.8 }}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
          />
        );
      case "LOG_IN":
        return (
          <Icon
            name="share"
            family="NowExtra"
            size={18}
            style={{ borderColor: "rgba(0,0,0,0.5)", opacity: 0.8 }}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
          />
        );
      case "WEB":
        return (
          <Icon
            name="world2x"
            family="NowExtra"
            size={18}
            style={{ borderColor: "rgba(0,0,0,0.5)", opacity: 0.8 }}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
          />
        );
      case "Profile":
        return (
          <BIcon
            name="person-circle"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.8 }}
          />
        );
      default:
        return null;
    }
  };

  const { focused, name, title, type, navigation } = props;
  //console.log(`${this.props.name}:${this.props.focused}`);
  const containerStyles = [
    styles.defaultStyle,
    focused ? [styles.activeStyle, styles.shadow] : null,
  ];

  const { logout } = useContext(AuthContext);

  switch (type) {
    case "line":
      return (
        <Block
          flex
          style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}
        >
          <Block
            style={{
              borderColor: "white",
              width: "93%",
              borderWidth: StyleSheet.hairlineWidth,
              marginHorizontal: 10,
            }}
          />
          {title ? (<Text
            color={nowTheme.COLORS.WHITE}
            style={{
              marginTop: 30,
              marginLeft: 20,
              marginBottom: 10,
              fontFamily: "montserrat-regular",
              fontWeight: "300",
              fontSize: 14,
            }}
          ></Text>) : (
            <></>
          )}
          {/* <Text
            color={nowTheme.COLORS.WHITE}
            style={{
              marginTop: 30,
              marginLeft: 20,
              marginBottom: 10,
              fontFamily: "montserrat-regular",
              fontWeight: "300",
              fontSize: 14,
            }}
          >
            {title}
          </Text> */}
        </Block>
      );

    default:
      return (
        <TouchableOpacity
          style={{ height: 50 }}
          onPress={
            () => {
              if (name == "WEB") {
                Linking.openURL("http://113.160.48.98:8790/").catch((err) =>
                  console.error("An error occurred", err)
                );
              } else if (name === "LOG_OUT") {
                logout();
              } else if (name) {
                navigation.navigate(name);
              }
            }

            // name == 'WEB'
            //   ? Linking.openURL('http://113.160.48.98:8790/').catch((err) =>
            //       console.error('An error occurred', err)
            //     )
            //   : navigation.navigate(name == 'LOG_OUT' ? 'Login' : name)
          }
          // onPress={() => {
          //   // console.log(name);
          //   // console.log(title);
          //   navigation.navigate(name);
          // }}
        >
          <Block flex row style={containerStyles}>
            <Block middle flex={0.1} style={{ marginRight: 5 }}>
              {renderIcon()}
            </Block>
            <Block row center flex={0.9}>
              <Text
                style={styles.menuItemStyle}
                //size={10}
                bold={focused ? true : false}
                color={focused ? nowTheme.COLORS.PRIMARY : "white"}
              >
                {title}
              </Text>
            </Block>
          </Block>
        </TouchableOpacity>
      );
  }
};

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 15,
    paddingHorizontal: 14,
    color: "white",
  },
  activeStyle: {
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 30,
    color: "white",
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
  },
  menuItemStyle: {
    fontFamily: "montserrat-regular",
    textTransform: "uppercase",
    fontWeight: "300",
    fontSize: 12,
  },
});

export default DrawerItem;
