import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  ImageBackground,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";

import Articles from "./Articles";
// Galio components
import { Block, Text, Button as GaButton, theme, Toast } from "galio-framework";

// Now UI themed components
import { Images, nowTheme, articles, tabs } from "../constants";
import { Button, Select, Icon, Input, Header, Switch } from "../components";

import Img from "../components/Img";
import { Card, CardBaoCaoGiaThiTruongLanhDaoUBND } from "../components";

import axios from "axios";
import { appConfig } from "../constants";
import Spinner from "react-native-loading-spinner-overlay";
import { View } from "react-native-web";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
const { width } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

const BaoCaoGiaThiTruongLanhDaoUBND = (props) => {
  const years = Array.from(
    new Array(20),
    (val, index) => new Date().getFullYear() - index
  );

  const [checkSelected, setcheckSelected] = useState([]);
  const [lsDiaBan, setlsDiaBan] = useState([]);
  
  const [lsTenDiaBan, setlsTenDiaBan] = useState([]);
  const [selectedDiaBanId, setselectedDiaBanId] = useState(null);
  const [lsKyDuLieu, setlsKyDuLieu] = useState([]);
  const [lsTenKyDuLieu, setlsTenKyDuLieu] = useState([]);
  const [lsKyDuLieuChiTiet, setlsKyDuLieuChiTiet] = useState([]);
  const [lsTenKyDuLieuChiTiet, setlsTenKyDuLieuChiTiet] = useState([]);
  const [lsChiTiet1, setlsChiTiet1] = useState([]);
  const [lsTenChiTiet1, setlsTenChiTiet1] = useState([]);
  const [lsChiTiet2, setlsChiTiet2] = useState([]);
  const [lsTenChiTiet2, setlsTenChiTiet2] = useState([]);
  const [lsNam, setlsNam] = useState(years);
  const [isSelectedKyDuLieu, setisSelectedKyDuLieu] = useState(false);
  const [isShowChiTiet1, setisShowChiTiet1] = useState(false);
  const [isShowChiTiet2, setisShowChiTiet2] = useState(false);
  const [kyDuLieuSel, setkyDuLieuSel] = useState(0);
  const [selectedDinhKyId, setselectedDinhKyId] = useState(null);
  const [selectedDinhKyChiTiet1Id, setselectedDinhKyChiTiet1Id] =
    useState(null);
  const [selectedDinhKyChiTiet2Id, setselectedDinhKyChiTiet2Id] =
    useState(null);
  const [selectedNam, setselectedNam] = useState(null);
  const [isDataLoaded, setisDataLoaded] = useState(false);
  const [lsData, setlsData] = useState([]);
  const [isToastShow, setisToastShow] = useState(false);
  const [toastMessage, settoastMessage] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [isInfiLoading, setInfiLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  
  const [UrlInfo, seturl] = useState([]);
  const URL = async  () => {
  try {

    const UrlInfo = await AsyncStorage.getItem("Dia_chi_Url");
    seturl(UrlInfo);

    console.log(`Bao cao lanh dao in Url ${UrlInfo}`);
    


  } catch (e) {
    console.log(`is logged in error ${e}`);
  }
}
  // toggleSwitch = (switchId) =>
  //   setState({ [switchId]: !state[switchId] });
  
  const fetDmDiaBan = async () => {
    
    axios.get(`${UrlInfo}/mwebapi/getdmdiaban`).then((res) => {
      const json = JSON.parse(JSON.stringify(res.data.Result));
      setlsDiaBan(json);
      let arr = [];

      json.map((item) => {
        arr.push(item.TEN_DIA_BAN);
      });

      setlsTenDiaBan(arr);
    });
    console.log(`NAMNM01 in Url ${UrlInfo}`);
  };

  const fetDmKyDuLieu = async () => {
    
    axios.get(`${UrlInfo}/mwebapi/GetDmKyDuLieu`).then((res) => {
      const json = JSON.parse(JSON.stringify(res.data.Result));
      setlsKyDuLieu(json);
      let arr = [];

      json.map((item) => {
        arr.push(item.TEN_DINH_KY);
      });
      setlsTenKyDuLieu(arr);
    });
    console.log(`NAMNM02 in Url ${UrlInfo}`);
  };

  const fetDmKyDuLieuChiTiet = async () => {
    
    axios.get(`${UrlInfo}/mwebapi/GetDmKyDuLieuChiTiet`).then((res) => {
      const json = JSON.parse(JSON.stringify(res.data.Result));
      setlsKyDuLieuChiTiet(json);

      let arr = [];

      json.map((item) => {
        arr.push(item.TEN_DINH_KY_CHI_TIET);
      });
      setlsTenKyDuLieuChiTiet(arr);
    });
    console.log(`NAMNM03 in Url ${UrlInfo}`);
  };

  async function fetData() {
    
    setisLoading(true);
    setisDataLoaded(false);
    setPageIndex(1);
    setFilter('');
    //let url = `${UrlInfo}/mwebapi/GetBaoCaoGiaThiTruongLanhDaoUBND?DIA_BAN_ID=10843&KY_DU_LIEU_ID=24&KY_DU_LIEU_CHI_TIET_1_ID=37&KY_DU_LIEU_CHI_TIET_2_ID=&NAM=2022`;
    let url = `${UrlInfo}/mwebapi/GetBaoCaoGiaThiTruongLanhDaoUBND?DIA_BAN_ID=${
      selectedDiaBanId ?? ""
    }&KY_DU_LIEU_ID=${selectedDinhKyId ?? ""}&KY_DU_LIEU_CHI_TIET_1_ID=${
      selectedDinhKyChiTiet1Id ?? ""
    }&KY_DU_LIEU_CHI_TIET_2_ID=${selectedDinhKyChiTiet2Id ?? ""}&NAM=${
      selectedNam ?? ""
    }&pageIndex=${pageIndex}&pageSize=20`;
    console.log(url);

    await axios
      .get(url)
      .then((res) => {
        let ret = JSON.parse(JSON.stringify(res.data.Result));
        console.log(ret);
        //var count = Object.keys(ls).length;
        setlsData(ret.Data.Data);
        setisLoading(false);
        setisDataLoaded(true);
      })
      .catch((e) => {
        setisLoading(false);
        setisDataLoaded(true);
        settoastMessage(`Có lỗ xảy ra: ${e}`);
      });
  }

  async function fetMoreData() {
    if (isInfiLoading) return;
    setInfiLoading(true);
   
    //let url = `${UrlInfo}/mwebapi/GetBaoCaoGiaThiTruongLanhDaoUBND?DIA_BAN_ID=8328&KY_DU_LIEU_ID=24&KY_DU_LIEU_CHI_TIET_1_ID=36&KY_DU_LIEU_CHI_TIET_2_ID=&NAM=2022`;
    let url = `${UrlInfo}/mwebapi/GetBaoCaoGiaThiTruongLanhDaoUBND?DIA_BAN_ID=${
      selectedDiaBanId ?? ""
    }&KY_DU_LIEU_ID=${selectedDinhKyId ?? ""}&KY_DU_LIEU_CHI_TIET_1_ID=${
      selectedDinhKyChiTiet1Id ?? ""
    }&KY_DU_LIEU_CHI_TIET_2_ID=${selectedDinhKyChiTiet2Id ?? ""}&NAM=${
      selectedNam ?? ""
    }
    &keyword=${filter}
    &pageIndex=${pageIndex}&pageSize=20
    `;
    // console.log(url);

    await axios
      .get(url)
      .then((res) => {
        let ls = JSON.parse(JSON.stringify(res.data.Result));
        setlsData((lsData) => [...lsData, ...ls.Data.Data]);
        setPageIndex((prev) => prev + 1);
        setInfiLoading(false);
      })
      .catch((e) => {
        setInfiLoading(false);
        settoastMessage(`Có lỗ xảy ra: ${e}`);
      });
  }

  const onSelectedDiaBan = (index) => {
    if (index >= 0) {
      let selected = lsDiaBan[index];
      selected && setselectedDiaBanId(selected.DIA_BAN_ID);
    }
  };

  const onSelectedKyDuLieu = (index) => {
    if (index >= 0) {
      let dinhKyId = lsKyDuLieu[index].DINH_KY_ID;
      //console.log(dinhKyId);
      setselectedDinhKyId(dinhKyId);
      if (dinhKyId === 27) {
        setisShowChiTiet1(false);
      } else {
        setisShowChiTiet1(true);
      }
      if (dinhKyId === 19 || dinhKyId === 22 || dinhKyId === 26) {
        setisShowChiTiet2(true);
      } else {
        setisShowChiTiet2(false);
      }
      //console.log(lsKyDuLieuChiTiet);
      let name1 = [],
        ls1 = [];
      if (
        dinhKyId === 19 ||
        dinhKyId === 22 ||
        dinhKyId === 24 ||
        dinhKyId === 26
      ) {
        setlsChiTiet1([]);
        setlsTenChiTiet1([]);

        lsKyDuLieuChiTiet.map(function (item) {
          //console.log(item);
          if (item.DINH_KY_ID === 24) {
            name1.push(item.TEN_DINH_KY_CHI_TIET);
            ls1.push(item);
          }
        });
      } else {
        setlsChiTiet1([]);
        setlsTenChiTiet1([]);

        lsKyDuLieuChiTiet.map(function (item) {
          //console.log(item);
          if (item.DINH_KY_ID === dinhKyId) {
            //console.log(item);
            name1.push(item.TEN_DINH_KY_CHI_TIET);
            ls1.push(item);
          }
        });
      }
      //console.log(name1);

      setlsChiTiet1(ls1);
      setlsTenChiTiet1(name1);

      setisSelectedKyDuLieu(true);
      let selected = lsKyDuLieu[index];
      selected && setselectedDinhKyId(selected.DINH_KY_ID);
    } else {
      setisSelectedKyDuLieu(false);
      setselectedDinhKyId(-1);
    }
  };

  const onSelectedKyChiTiet1 = (index) => {
    let sel = lsChiTiet1[index];
    //console.log(sel);
    let dinhKyChiTiet1Id = sel.DINH_KY_CHI_TIET_ID;
    //console.log(dinhKyChiTiet1Id);
    setselectedDinhKyChiTiet1Id(dinhKyChiTiet1Id);
    //console.log(selectedDinhKyId);
    let dinhKyId = selectedDinhKyId;
    //console.log(dinhKyId);
    let name2 = [],
      ls2 = [];
    //var count = Object.keys(lsKyDuLieuChiTiet).length;
    //console.log(count);
    lsKyDuLieuChiTiet.map(function (item) {
      if (item.DINH_KY_ID === dinhKyId && item.CHA_ID === dinhKyChiTiet1Id) {
        name2.push(item.TEN_DINH_KY_CHI_TIET);
        ls2.push(item);
      }
    });
    //console.log(ls2);
    setlsChiTiet2(ls2);
    setlsTenChiTiet2(name2);
  };

  const onSelectedNam = (value) => {
    setselectedNam(value);
  };

  async function showSearchResult() {
    //console.log('Xem bao cao');
    let DIA_BAN_ID = selectedDiaBanId;
    let KY_DU_LIEU_ID = selectedDinhKyId;
    let KY_DU_LIEU_CHI_TIET_1_ID = selectedDinhKyChiTiet1Id;
    let KY_DU_LIEU_CHI_TIET_2_ID = selectedDinhKyChiTiet2Id;
    let NAM = selectedNam;
    console.log(
      `${DIA_BAN_ID},${KY_DU_LIEU_ID},${KY_DU_LIEU_CHI_TIET_1_ID},${KY_DU_LIEU_CHI_TIET_2_ID},${NAM}`
    );
    if (!DIA_BAN_ID) {
      //showToast("Bạn phải chọn Quận/Huyện");
      settoastMessage("Bạn phải chọn Quận/Huyện");
      setisToastShow(true);
      setTimeout(() => {
        setisToastShow(false);
      }, 3000);
      return;
    }
    if (!KY_DU_LIEU_ID) {
      // showToast("Bạn phải chọn Kỳ dữ liệu");
      settoastMessage("Bạn phải chọn Kỳ dữ liệu");
      setisToastShow(true);
      setTimeout(() => {
        setisToastShow(false);
      }, 3000);
      return;
    }
    if (KY_DU_LIEU_ID && !KY_DU_LIEU_CHI_TIET_1_ID) {
      //showToast("Bạn phải chọn Kỳ dữ liệu chi tiết");
      settoastMessage("Bạn phải chọn Kỳ dữ liệu chi tiết");
      setisToastShow(true);
      setTimeout(() => {
        setisToastShow(false);
      }, 3000);
      return;
    }
    if (!NAM) {
      //showToast("Bạn phải chọn Năm");
      settoastMessage("Bạn phải chọn Năm");
      setisToastShow(true);
      setTimeout(() => {
        setisToastShow(false);
      }, 3000);
      return;
    }

    setisDataLoaded(false);
    await fetData();
    setisDataLoaded(true);
    var len = Object.keys(lsData).length;
    //console.log(`ket qua:${lsData}`);
    if (!lsData || len <= 0) {
      //showToast("Không tìm thấy dữ liệu phù hợp");
      settoastMessage("Không tìm thấy dữ liệu phù hợp");
      setisToastShow(true);
      setTimeout(() => {
        console.log("Hide toast");
        setisToastShow(false);
      }, 3000);
    } //console.log(lsData.slice(0, 10));
  }
  

  useEffect(() => {
    
    URL();
    fetDmDiaBan();
    fetDmKyDuLieu();
    fetDmKyDuLieuChiTiet();
    //console.log("rerender");
  }, [UrlInfo]);
  
  const showToast = (message) => {
    console.log(message);
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const renderSearchResult = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Input
            //primary={this.state.primaryFocus}
            right
            placeholder="Từ khóa"
            icon="search1"
            family="antdesign"
            iconSize={14}
            iconColor="red"
            //onFocus={() => this.setState({ primaryFocus: true })}
            //onBlur={() => this.setState({ primaryFocus: false })}
            //iconContent={<Block />}
            shadowless
            onChangeText={(text) => setFilter(text)}
          />
        </Block>
        <Block flex style={{ paddingHorizontal: theme.SIZES.BASE }}>
          {lsData &&
            lsData
              .filter((i) => i.TEN_HANG_HOA_DICH_VU.includes(filter))
              .map((item, index) => {
                //console.log(lsData.slice(0, 2));
                return (
                  <CardBaoCaoGiaThiTruongLanhDaoUBND
                    key={index}
                    item={item}
                    horizontal
                    titleStyle={styles.productTitle}
                    imageStyle={{
                      height: 300,
                      width: "100%",
                      resizeMode: "contain",
                    }}
                  />
                );
              })}
        </Block>
      </ScrollView>
    );
  };

  const renderForm = () => {
    //console.log(selectedDiaBanId);
    return (
      <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text style={{ fontFamily: "montserrat-regular" }} muted>
            Quận/Huyện
          </Text>
          <Block style={{ marginTop: 8 }}>
            {/* <Select defaultIndex={1} options={['Tỉnh Nam Định', 'Huyện Hải Hậu']} /> */}
            <Select
              defaultIndex={-1}
              defaultValue={"- Chọn -"}
              options={lsTenDiaBan}
              onSelect={(index, value) => {
                onSelectedDiaBan(index);
              }}
              style={{
                borderWidth: 1,
                borderColor: !selectedDiaBanId
                  ? nowTheme.COLORS.BORDER
                  : selectedDiaBanId > 0
                  ? nowTheme.COLORS.SUCCESS
                  : nowTheme.COLORS.ERROR,
                backgroundColor: nowTheme.COLORS.WHITE,
              }}
            />
          </Block>
        </Block>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text
            style={{
              fontFamily: "montserrat-regular",
              marginTop: theme.SIZES.BASE,
            }}
            muted
          >
            Kỳ dữ liệu
          </Text>
          <Block style={{ flex: 1, marginTop: 8 }}>
            <Select
              defaultIndex={-1}
              defaultValue={"- Chọn -"}
              options={lsTenKyDuLieu}
              onSelect={(index, value) => {
                onSelectedKyDuLieu(index);
              }}
              style={{
                borderWidth: 1,
                borderColor: !isSelectedKyDuLieu
                  ? nowTheme.COLORS.BORDER
                  : isSelectedKyDuLieu > 0
                  ? nowTheme.COLORS.SUCCESS
                  : nowTheme.COLORS.ERROR,
                backgroundColor: nowTheme.COLORS.WHITE,
              }}
            />
          </Block>
        </Block>
        {isShowChiTiet1 && (
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Text
              style={{
                fontFamily: "montserrat-regular",
                marginTop: theme.SIZES.BASE,
              }}
              muted
            >
              Tháng
            </Text>
            <Block style={{ flex: 1, marginTop: 8 }}>
              <Select
                defaultIndex={-1}
                defaultValue={"- Chọn -"}
                options={lsTenChiTiet1}
                onSelect={(index, value) => {
                  onSelectedKyChiTiet1(index);
                }}
                style={{
                  borderWidth: 1,
                  borderColor: !selectedDinhKyChiTiet1Id
                    ? nowTheme.COLORS.BORDER
                    : selectedDinhKyChiTiet1Id > 0
                    ? nowTheme.COLORS.SUCCESS
                    : nowTheme.COLORS.ERROR,
                  backgroundColor: nowTheme.COLORS.WHITE,
                }}
              />
            </Block>
          </Block>
        )}
        {isShowChiTiet2 && (
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Text
              style={{
                fontFamily: "montserrat-regular",
                marginTop: theme.SIZES.BASE,
              }}
              muted
            >
              Ngày
            </Text>
            <Block style={{ flex: 1, marginTop: 8 }}>
              <Select
                defaultValue={"- Chọn -"}
                defaultIndex={-1}
                options={lsTenChiTiet2}
                style={{
                  borderWidth: 1,
                  borderColor: !selectedDinhKyChiTiet2Id
                    ? nowTheme.COLORS.BORDER
                    : selectedDiaBanId > 0
                    ? nowTheme.COLORS.SUCCESS
                    : nowTheme.COLORS.ERROR,
                  backgroundColor: nowTheme.COLORS.WHITE,
                }}
              />
            </Block>
          </Block>
        )}
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text
            style={{
              fontFamily: "montserrat-regular",
              marginTop: theme.SIZES.BASE,
            }}
            muted
          >
            Năm
          </Text>
          <Block style={{ flex: 1, marginTop: 8 }}>
            <Select
              defaultIndex={-1}
              defaultValue={"- Chọn -"}
              options={years}
              onSelect={(index, value) => {
                setselectedNam(value);
              }}
              style={{
                borderWidth: 1,
                borderColor: !selectedNam
                  ? nowTheme.COLORS.BORDER
                  : selectedNam > 0
                  ? nowTheme.COLORS.SUCCESS
                  : nowTheme.COLORS.ERROR,
                backgroundColor: nowTheme.COLORS.WHITE,
              }}
            />
          </Block>
        </Block>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE, marginTop: 10 }}>
          <Block center>
            <Button
              textStyle={{ fontFamily: "montserrat-regular", fontSize: 16 }}
              color="active"
              style={styles.button}
              onPress={showSearchResult}
            >
              Xem báo cáo
            </Button>
          </Block>
        </Block>
      </Block>
    );
  };

  return (
    <Block flex center>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30, width }}
        // onMomentumScrollEnd={(e) => {
        //   const scrollPosition = e.nativeEvent.contentOffset.y;
        //   const scrolViewHeight = e.nativeEvent.layoutMeasurement.height;
        //   const contentHeight = e.nativeEvent.contentSize.height;
        //   const isScrolledToBottom = scrolViewHeight + scrollPosition;
        //   //console.log('scroll end?:', e);
        //   // check if scrollView is scrolled to bottom and limit itemToRender to data length
        //   if (isScrolledToBottom >= contentHeight - 50) {
        //     //this.setState({ itemToRender: this.state.itemToRender + 20 })
        //     console.log("scroll to bottom?:", isScrolledToBottom);
        //   }
        // }}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            fetMoreData();
          }
        }}
        scrollEventThrottle={400}
      >
        <Toast
          isShow={isToastShow}
          positionIndicator="top"
          color="warning"
          style={{ top: 0 }}
          textStyle={styles.toastTextStyle}
        >
          {toastMessage}
        </Toast>
        <Spinner visible={isLoading} />
        
        {renderForm()}
        {isDataLoaded && renderSearchResult()}
        {/* {renderCards()} */}
        <ActivityIndicator
          size={25}
          animating={isInfiLoading}
          color="#0000ff"
        />
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "montserrat-bold",
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center",
  },
  group: {
    paddingTop: theme.SIZES.BASE * 2,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2,
  },
  optionsButton: {
    width: "auto",
    height: 34,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0,
  },
  categoryTitle: {
    height: "100%",
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  imageBlock: {
    overflow: "hidden",
    borderRadius: 4,
    marginHorizontal: 10,
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure,
  },
  productTitle: {
    color: nowTheme.COLORS.PRIMARY,
    textAlign: "center",
    fontFamily: "montserrat-bold",
    fontSize: 18,
  },
  toastTextStyle: {
    fontFamily: "montserrat-regular",
    textTransform: "uppercase",
    fontWeight: "300",
    fontSize: 14,
    color: "white",
  },
});

export default BaoCaoGiaThiTruongLanhDaoUBND;
