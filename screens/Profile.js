import React, { useContext } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  View,
} from "react-native";
import { Block, Text, theme, Button as GaButton } from "galio-framework";

import { Button, BIcon } from "../components";
import { Images, nowTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import { AuthContext } from "../context/AuthContext";
import { now } from "moment";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 4;

const Profile = ({ navigation }) => {
  const { userInfo } = useContext(AuthContext);

  console.log(userInfo);

  return (
    <Block
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Block flex={0.6}>
        <Block
          //source={Images.ProfileBackground}
          style={styles.profileContainer}
          //imageStyle={styles.profileBackground}
        >
          <Block flex style={styles.profileCard}>
            <Block
              flex
              row
              style={{
                //position: "absolute",
                width: width,
                zIndex: 5,
                paddingHorizontal: 20,
              }}
            >
              <Block style={{ top: height * 0.05 }}>
                <Image source={Images.ProfilePicture} style={styles.avatar} />
              </Block>
              <Block style={{ top: height * 0.05, left: 20 }}>
                <Block>
                  <Text
                    style={{
                      fontFamily: "montserrat-bold",
                      marginBottom: theme.SIZES.BASE / 2,
                      fontWeight: "900",
                      fontSize: 18,
                    }}
                    color={nowTheme.COLORS.DEFAULT}
                  >
                    {userInfo?.HO_TEN}
                  </Text>

                  <Text
                    size={14}
                    color={nowTheme.COLORS.DEFAULT}
                    style={{
                      marginTop: 5,
                      fontFamily: "montserrat-bold",
                      lineHeight: 20,
                      fontWeight: "bold",
                      fontSize: 14,
                      opacity: 0.8,
                    }}
                  >
                    {userInfo.TEN_DON_VI}
                  </Text>

                  <Text
                    size={14}
                    color={nowTheme.COLORS.DEFAULT}
                    style={{
                      marginTop: 5,
                      fontFamily: "montserrat-bold",
                      lineHeight: 20,
                      fontWeight: "bold",
                      fontSize: 14,
                      opacity: 0.8,
                    }}
                  >
                    {userInfo.CHUC_VU}
                  </Text>
                </Block>
              </Block>
            </Block>

            <Block
              row
              style={{
                //position: "absolute",
                left: 10,
                width: width,
                top: 40,
                zIndex: 99,
              }}
            >
              <Block style={styles.info}>
                <Block
                  row
                  style={{
                    paddingHorizontal: theme.SIZES.BASE / 2,
                    marginTop: 20,
                  }}
                >
                  <Block>
                    <BIcon
                      //type={item.type}
                      size={18}
                      name="location-outline"
                      color={nowTheme.COLORS.ACTIVE}
                    />
                  </Block>
                  <Block>
                    <Text
                      style={{
                        fontFamily: "montserrat-regular",
                        marginLeft: 10,
                      }}
                      size={14}
                      color={nowTheme.COLORS.BLACK}
                    >
                      {userInfo.DIA_CHI}
                    </Text>
                  </Block>
                </Block>
                <Block
                  row
                  style={{
                    paddingHorizontal: theme.SIZES.BASE / 2,
                    marginTop: 20,
                  }}
                >
                  <Block>
                    <BIcon
                      //type={item.type}
                      size={25}
                      name="ios-call-outline"
                      color={nowTheme.COLORS.ACTIVE}
                    />
                  </Block>
                  <Block>
                    <Text
                      style={{
                        fontFamily: "montserrat-regular",
                        marginLeft: 10,
                      }}
                      size={14}
                      color={nowTheme.COLORS.BLACK}
                    >
                      {userInfo.SO_DIEN_THOAI}
                    </Text>
                  </Block>
                </Block>
                <Block
                  row
                  style={{
                    paddingHorizontal: theme.SIZES.BASE / 2,
                    marginTop: 20,
                  }}
                >
                  <Block>
                    <BIcon
                      //type={item.type}
                      size={18}
                      name="md-mail"
                      color={nowTheme.COLORS.ACTIVE}
                    />
                  </Block>
                  <Block>
                    <Text
                      style={{
                        fontFamily: "montserrat-regular",
                        marginLeft: 10,
                      }}
                      size={14}
                      color={nowTheme.COLORS.BLACK}
                    >
                      {userInfo.EMAIL}
                    </Text>
                  </Block>
                </Block>
              </Block>
              <Block
                middle
                row
                style={{
                  position: "absolute",
                  width: width,
                  top: 250,
                  zIndex: 99,
                }}
              >
                <Button
                  style={{
                    width: 114,
                    height: 44,
                    marginHorizontal: 5,
                    elevation: 0,
                  }}
                  textStyle={{ fontSize: 16 }}
                  onPress = {() => navigation.navigate('ChangePass')}
                >
                  Đổi mật khẩu
                </Button>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>

      {/* <Block flex={1}>
        <Block style={styles.profileContainer}>
          <Block flex style={styles.profileCard}>
            <Block
              row
              style={{
                left: 10,
                width: width,
                top: 10,
                zIndex: 99,
              }}
            >
              <Block style={styles.info}>
                <Block
                  row
                  style={{
                    paddingHorizontal: theme.SIZES.BASE / 2,
                    marginTop: 20,
                  }}
                >
                  <Block>
                    <BIcon
                      //type={item.type}
                      size={18}
                      name="location-outline"
                      color={nowTheme.COLORS.ACTIVE}
                    />
                  </Block>
                  <Block>
                    <Text
                      style={{
                        fontFamily: "montserrat-regular",
                        marginLeft: 10,
                      }}
                      size={14}
                      color={nowTheme.COLORS.BLACK}
                    >
                      {userInfo.DIA_CHI}
                    </Text>
                  </Block>
                </Block>
                <Block
                  row
                  style={{
                    paddingHorizontal: theme.SIZES.BASE / 2,
                    marginTop: 20,
                  }}
                >
                  <Block>
                    <BIcon
                      //type={item.type}
                      size={25}
                      name="ios-call-outline"
                      color={nowTheme.COLORS.ACTIVE}
                    />
                  </Block>
                  <Block>
                    <Text
                      style={{
                        fontFamily: "montserrat-regular",
                        marginLeft: 10,
                      }}
                      size={14}
                      color={nowTheme.COLORS.BLACK}
                    >
                      {userInfo.SO_DIEN_THOAI}
                    </Text>
                  </Block>
                </Block>
                <Block
                  row
                  style={{
                    paddingHorizontal: theme.SIZES.BASE / 2,
                    marginTop: 20,
                  }}
                >
                  <Block>
                    <BIcon
                      //type={item.type}
                      size={18}
                      name="md-mail"
                      color={nowTheme.COLORS.ACTIVE}
                    />
                  </Block>
                  <Block>
                    <Text
                      style={{
                        fontFamily: "montserrat-regular",
                        marginLeft: 10,
                      }}
                      size={14}
                      color={nowTheme.COLORS.BLACK}
                    >
                      {userInfo.EMAIL}
                    </Text>
                  </Block>
                </Block>
              </Block>
            </Block>
          </Block>
        </Block>
        <Block
          middle
          row
          style={{ position: "absolute", width: width, top: 250, zIndex: 99 }}
        >
          <Button
            style={{
              width: 114,
              height: 44,
              marginHorizontal: 5,
              elevation: 0,
            }}
            textStyle={{ fontSize: 16 }}
          >
            Đổi mật khẩu
          </Button>
        </Block>
      </Block> */}
    </Block>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    width,
    height,
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width,
    height: height * 0.6,
  },

  info: {
    marginTop: 30,
    paddingHorizontal: 10,
    height: height * 0.8,
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80,
  },
  avatar: {
    width: thumbMeasure,
    height: thumbMeasure,
    borderRadius: 50,
    borderWidth: 0,
  },
  nameInfo: {
    marginTop: 35,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure,
  },
  social: {
    width: nowTheme.SIZES.BASE * 3,
    height: nowTheme.SIZES.BASE * 3,
    borderRadius: nowTheme.SIZES.BASE * 1.5,
    justifyContent: "center",
    zIndex: 99,
    marginHorizontal: 5,
  },
});

export default Profile;
