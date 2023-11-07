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
  Text,
  Button,
  Toast,
} from "galio-framework";

import { Input, Icon } from "../components";
import { AuthContext } from "../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
import { COLORS, Images, nowTheme } from "../constants";

const { width, height } = Dimensions.get("screen");

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const Url = ({ navigation }) => {
  const [url, setUrl] = useState(""); // Thay đổi tên biến thành `url` thay vì `Url`
  const { isLoading, checkUrl } = useContext(AuthContext);
  const [isShow, setShow] = useState(false);
  const [message, setMessage] = useState('');

  const handleSaveUrl = async () => {
    let msg = "";
    if (!url) {
      msg = "Url không được để trống";
      setMessage(msg);
    } else {
      msg = await checkUrl(url);
    }
    setMessage(msg);
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };

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
                      Nhập URL
                    </Text>
                  </Block>
                </Block>
                <Block flex={1} middle space="between">
                  <Block center flex={0.9}>
                    <Block flex space="between">
                      <Block>
                        <Block width={width * 0.8} style={styles.inputBlock}>
                          <Input
                            placeholder="http://113.160.48.98:8787"
                            style={styles.inputs}
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="close"
                                family="Font-Awesome"
                                style={styles.inputIcons}
                                onPress={() => setUrl('')}
                              />
                            }
                            onChangeText={(text) => setUrl(text)}
                            value={url}
                          />
                        </Block>
                        <Block width={width * 0.8} style={styles.inputBlock}>
                          <Toast
                            isShow={isShow}
                            positionIndicator="top"
                            fadeOutDuration={300}
                            color="warning"
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
                          onPress={handleSaveUrl}
                        >
                          <Text
                            style={{ fontFamily: "montserrat-bold" }}
                            size={14}
                            color={nowTheme.COLORS.WHITE}
                          >
                            Lưu địa chỉ
                          </Text>
                        </Button>
                        <Button
                          color={nowTheme.COLORS.PRIMARY}
                          round
                          style={styles.createButton}
                          onPress={() => navigation.navigate("Login")}
                        >
                          <Text
                            style={{ fontFamily: "montserrat-bold" }}
                            size={14}
                            color={nowTheme.COLORS.WHITE}
                          >
                            Quay về
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
    marginBottom: 20,
  },
  toastTextStyle: {
    fontFamily: "montserrat-regular",
    textTransform: "uppercase",
    fontWeight: "300",
    fontSize: 14,
    color: "white",
  },
});

export default Url;
