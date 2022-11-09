import React, { useContext, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  Block,
  Checkbox,
  Text,
  Button as GaButton,
  theme,
  Toast,
} from "galio-framework";

import { Button, Icon, Input } from "../components";
import { COLORS, Images, nowTheme } from "../constants";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Spinner from "react-native-loading-spinner-overlay";
import { color, measure } from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const Login = ({ navigation }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const { isLoading, login } = useContext(AuthContext);
  
  const [isShow, setShow] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <DismissKeyboard>
      <Block flex middle>
        <Spinner visible={isLoading} />
        <ImageBackground
          source={Images.RegisterBackground}
          style={styles.imageBackgroundContainer}
          imageStyle={styles.imageBackground}
        >
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex space="evenly">
                <Block flex={0.4} middle style={styles.socialConnect}>
                  <Block flex={0.5} middle>
                    <Text
                      style={{
                        fontFamily: "montserrat-regular",
                        textAlign: "center",
                      }}
                      color="#333"
                      size={24}
                    >
                      Đăng nhập
                    </Text>
                  </Block>

                  <Block
                    flex={0.5}
                    row
                    middle
                    space="between"
                    style={{ marginBottom: 18 }}
                  >
                    <GaButton
                      round
                      onlyIcon
                      shadowless
                      icon="twitter"
                      iconFamily="Font-Awesome"
                      iconColor={theme.COLORS.WHITE}
                      iconSize={theme.SIZES.BASE * 1.625}
                      color={nowTheme.COLORS.TWITTER}
                      style={[styles.social, styles.shadow]}
                    />

                    <GaButton
                      round
                      onlyIcon
                      shadowless
                      icon="dribbble"
                      iconFamily="Font-Awesome"
                      iconColor={theme.COLORS.WHITE}
                      iconSize={theme.SIZES.BASE * 1.625}
                      color={nowTheme.COLORS.DRIBBBLE}
                      style={[styles.social, styles.shadow]}
                    />
                    <GaButton
                      round
                      onlyIcon
                      shadowless
                      icon="facebook"
                      iconFamily="Font-Awesome"
                      iconColor={theme.COLORS.WHITE}
                      iconSize={theme.SIZES.BASE * 1.625}
                      color={nowTheme.COLORS.FACEBOOK}
                      style={[styles.social, styles.shadow]}
                    />
                  </Block>
                </Block>
                {/* <Block flex={0.1} middle>
                    <Text
                      style={{
                        fontFamily: 'montserrat-regular',
                        textAlign: 'center'
                      }}
                      muted
                      size={16}
                    >
                      or be classical
                    </Text>
                  </Block> */}
                <Block flex={1} middle space="between">
                  <Block center flex={0.9}>
                    <Block flex space="between">
                      <Block>
                     
                        <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                          <Input
                            placeholder="Tên đăng nhập"
                            style={styles.inputs}
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                //name="profile-circle"
                                //family="NowExtra"
                                name="user-o"
                                family="Font-Awesome"
                                style={styles.inputIcons}
                              />
                            }
                            onChangeText={(text) => setUsername(text)}
                          />
                        </Block>
                        <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                          <Input
                            placeholder="Mật khẩu"
                            style={styles.inputs}
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="key"
                                family="Font-Awesome"
                                style={styles.inputIcons}
                              />
                            }
                            password
                            viewPass
                            onChangeText={(text) => setPassword(text)}
                          />
                        </Block>
                        <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                          <Toast
                            isShow={isShow}
                            positionIndicator="top"
                            fadeOutDuration={300}
                            color="warning"
                            textStyle={styles.toastTextStyle}
                            //style={styles.toast}
                          >
                            {message}
                          </Toast>
                        </Block>
                      </Block>
                      <Block center>
                      
                         <Button
                          color="primary"
                          round
                          style={styles.createButton}
                          onPress={async () => {
                            let msg = "";
                           if (!username || !password) {
                              msg =
                                "Tên đăng nhập hoặc mật khẩu không được để trống";
                              setMessage(msg);
                            } else {
                              msg = await login(username, password);
                            }
                            setMessage(msg);
                            console.log(`Msg:${message}`);
                            setShow(true);
                            setTimeout(() => {
                              setShow(false);
                            }, 3000);
                          }}
                          //onPress={() => navigation.navigate("App")}
                        >
                          <Text
                            style={{ fontFamily: "montserrat-bold" }}
                            size={14}
                            color={nowTheme.COLORS.WHITE}
                          >
                            Đăng nhập
                          </Text>
                        </Button> 

                       
                       
                      </Block>
                     
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
            <Block bottom>
                      <Button onlyIcon icon="setting" iconFamily="antdesign" iconSize={30} color="warning" iconColor="#fff" style={{ width: 40, height: 40 }}
                       
                        onPress={() => navigation.navigate("Url")}
                      >
                        
                        warning
                        
                      </Button>

            </Block>
          </Block>
        </ImageBackground>
      </Block>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  imageBackground: {
    width: width,
    height: height,
  },
  registerContainer: {
    marginTop: 55,
    width: width * 0.9,
    height: height < 812 ? height * 0.8 : height * 0.8,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden",
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  socialTextButtons: {
    color: nowTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14,
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT,
  },
  inputs: {
    borderWidth: 1,
    borderColor: "#E3E3E3",
    borderRadius: 21.5,
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15,
  },
  createButton: {
    width: width * 0.5,
    //marginTop: 25,
    marginBottom: 200,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center",
    marginHorizontal: 10,
  },
  toast: {
    //marginLeft: -70,
    width: width - theme.SIZES.BASE * 5,
    //borderRadius: theme.SIZES.BASE * 1.75,
  },
  toastTextStyle: {
    fontFamily: "montserrat-regular",
    textTransform: "uppercase",
    fontWeight: "300",
    fontSize: 14,
    color: "white",
  },
});

export default Login;
