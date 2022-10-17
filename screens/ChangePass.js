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
import { Images, nowTheme } from "../constants";
import { AuthContext } from "../context/AuthContext";

const { width, height } = Dimensions.get("screen");

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const ChangePass = () => {
  // const [user, setUser] = useState({
  //   currentPassword: "",
  //   newPassword: "",
  //   retypePassword: ""
  // });
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const { userInfo, changepass } = useContext(AuthContext);
  const [isShow, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const validatePassword = (pw) => {
    var ret = true;
    var minNumberofChars = 8;
    var maxNumberofChars = 16;
    var regularExpression = new RegExp(
      "^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$"
    );

    var l = pw.length;

    if (l < minNumberofChars || l > maxNumberofChars) {
      ret = false;
    }
    if (!regularExpression.test(pw)) {
      ret = false;
    }
    if (!ret) {
      //ShowError("Mật khẩu phải từ 8-16 ký tự, bao gồm ít nhất 1 chữ thường, 1 chữ hoa, 1 ký tự đặc biệt!");
      return false;
    }
    return ret;
  };

  return (
    <DismissKeyboard>
      <Block flex middle>
        <ImageBackground
          source={Images.RegisterBackground}
          style={styles.imageBackgroundContainer}
          imageStyle={styles.imageBackground}
        >
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex space="evenly">
                <Block flex={0.4} middle style={styles.socialConnect}>
                  {/* <Block flex={0.5} middle>
                    <Text
                      style={{
                        fontFamily: "montserrat-regular",
                        textAlign: "center",
                      }}
                      color="#333"
                      size={24}
                    >
                      Đổi mật khẩu
                    </Text>
                  </Block> */}

                  
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
                  <Block center flex={0.5}>
                    <Block flex space="between">
                      <Block>
                        <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                          <Input
                            placeholder="Mật khẩu"
                            style={styles.inputs}
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                //name="profile-circle"
                                //family="NowExtra"
                                name="key"
                                family="Font-Awesome"
                                style={styles.inputIcons}
                              />
                            }
                            password
                            viewPass
                            name="txtPassword"
                            onChangeText={(text) => setPassword(text)}
                          />
                        </Block>
                        <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                          <Input
                            placeholder="Mật khẩu mới"
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
                            name="txtNewPassword"
                            onChangeText={(text) => setNewPassword(text)}
                          />
                        </Block>
                        <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                          <Input
                            placeholder="Nhập lại mật khẩu mới"
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
                            name="txtRetypePassword"
                            onChangeText={(text) => setRetypePassword(text)}
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
                            if (!validatePassword(newPassword)) {
                              msg =
                                "Mật khẩu phải từ 8-16 ký tự, bao gồm ít nhất 1 chữ thường, 1 chữ hoa, 1 ký tự đặc biệt!";
                            } else {
                              msg = await changepass(
                                userInfo.TEN_DANG_NHAP,
                                password,
                                newPassword
                              );
                            }
                            setMessage(msg);
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
                            Đồng ý
                          </Text>
                        </Button>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
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
    marginTop: 80,
    width: width,
    //width: width * 0.9,
    //height: height < 812 ? height * 0.8 : height * 0.8,
    height: height,
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
    marginTop: 25,
    marginBottom: 40,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center",
    marginHorizontal: 10,
  },
  toastTextStyle: {
    fontFamily: "montserrat-regular",
    textTransform: "uppercase",
    fontWeight: "300",
    fontSize: 14,
    color: "white",
  },
});

export default ChangePass;
