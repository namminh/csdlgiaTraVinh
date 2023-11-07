import React, { useContext, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import {
  Block,
  Text,
  Button as GaButton,
  Toast,
} from "galio-framework";

import { Button, Icon, Input } from "../components";
import { COLORS, Images, nowTheme } from "../constants";
import { AuthContext } from "../context/AuthContext";

const { width, height } = Dimensions.get("screen");

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, login } = useContext(AuthContext);

  const [isShow, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    let msg = "";
    if (!username || !password) {
      msg = "Tên đăng nhập hoặc mật khẩu không được để trống";
      setMessage(msg);
    } else {
      msg = await login(username, password);
    }
    setMessage(msg);
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <ImageBackground
          source={Images.RegisterBackground}
          style={styles.imageBackground}
        >
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex space="evenly">
                <Block flex={0.4} middle style={styles.socialConnect}>
                  <Block flex={0.5} middle>
                    <Text
                      style={{
                        fontFamily: "montserrat-bold",
                        textAlign: "center",
                        fontSize: 28, // Kích thước tiêu đề
                        color: nowTheme.COLORS.PRIMARY, // Màu chữ tiêu đề
                      }}
                    >
                      Đăng nhập
                    </Text>
                  </Block>
                </Block>
                <Block flex={1} middle space="between">
                  <Block center flex={0.9}>
                    <Block flex space="between">
                      <Block>
                        <Block width={width * 0.8} style={styles.inputBlock}>
                          <Input
                            placeholder="Tên đăng nhập"
                            style={styles.inputs}
                            iconContent={
                              <Icon
                                size={16}
                                color={nowTheme.COLORS.ICON_INPUT}
                                name="user-o"
                                family="Font-Awesome"
                                style={styles.inputIcons}
                              />
                            }
                            onChangeText={(text) => setUsername(text)}
                          />
                        </Block>
                        <Block width={width * 0.8} style={styles.inputBlock}>
                          <Input
                            placeholder="Mật khẩu"
                            style={styles.inputs}
                            iconContent={
                              <Icon
                                size={16}
                                color={nowTheme.COLORS.ICON_INPUT}
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
                        <Block width={width * 0.8} style={styles.inputBlock}>
                          <Toast
                            isShow={isShow}
                            positionIndicator="top"
                            fadeOutDuration={300}
                            color={nowTheme.COLORS.WARNING} // Màu thông báo
                            textStyle={styles.toastTextStyle}
                          >
                            {message}
                          </Toast>
                        </Block>
                      </Block>
                      <Block center>
                        <Button
                          color={nowTheme.COLORS.PRIMARY}
                          round
                          style={styles.createButton}
                          onPress={handleLogin}
                        >
                          <Text
                            style={{ fontFamily: "montserrat-bold" }}
                            size={14}
                            color={nowTheme.COLORS.BLACK}
                          >
                            Đăng nhập
                          </Text>
                        </Button>
                        <Button
                          color={nowTheme.COLORS.PRIMARY}
                          round
                          style={styles.createButton}
                          onPress={() => navigation.navigate("Url")}
                        >
                          <Text
                            style={{ fontFamily: "montserrat-bold" }}
                            size={14}
                            color={nowTheme.COLORS.BLACK}
                          >
                            Nhập Url
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
      </View>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderRadius: 20,
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
  },
  inputBlock: {
    width: width * 0.8,
    marginBottom: 10,
  },
  inputs: {
    borderWidth: 1,
    borderColor: nowTheme.COLORS.INPUT,
    borderRadius: 15,
  },
  inputIcons: {
    marginRight: 10,
    color: nowTheme.COLORS.ICON_INPUT,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 20,
  },
  toastTextStyle: {
    fontFamily: "montserrat-regular",
    textTransform: "uppercase",
    fontWeight: "300",
    fontSize: 14,
    color: nowTheme.COLORS.WHITE,
  },
});

export default Login;
