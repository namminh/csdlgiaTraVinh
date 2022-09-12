import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  ImageBackground,
} from 'react-native';

import Articles from './Articles';
// Galio components
import { Block, Text, Button as GaButton, theme } from 'galio-framework';

// Now UI themed components
import { Images, nowTheme, articles, tabs } from '../constants';
import { Button, Select, Icon, Input, Header, Switch } from '../components';

import Img from '../components/Img';
import { Card } from '../components';

import axios from 'axios';
//import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Moment from 'moment';

const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

class KT_THEO_CHI_TIEU extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkSelected: [],
      lsDoanhNghiep: [],
      lsLoaiGia: [],
      lsNhomHHDV: [],
      data_1: [],
      lsHHDV: [],
      lsHHDVDK: [],
      startDate: new Date(),
      endDate: new Date(),
      mode: 'date',
      isStartDatePickerVisible: false,
      isEndDatePickerVisible: false,
      isDataLoaded: false,
    };
  }

  fetDmDoanhNghiep() {
    axios.get(`http://113.160.48.98:8790/mwebapi/getdmdoanhnghiep`).then((res) => {
      const ls = JSON.parse(JSON.stringify(res.data.Result));
      let arr = [];
      // console.log(ls[1]);

      ls.map((item) => {
        arr.push(item.TEN_DOANH_NGHIEP);
      });

      //console.log(arr[1]);

      this.setState({
        lsDoanhNghiep: arr,
      });
      this.setState({
        data_1: ls,
      });
      console.log(this.state.data_1);
    });
  }

  fetDmLoaiGia() {
    axios.get(`http://113.160.48.98:8790/mwebapi/GetDmLoaiGia`).then((res) => {
      const ls = JSON.parse(JSON.stringify(res.data.Result));
      let arr = [];
      ls.map((item) => {
        arr.push(item.TEN_LOAI_GIA);
      });
      this.setState({
        lsLoaiGia: arr,
      });
    });
  }

  fetNhomHHDV() {
    axios.get(`http://113.160.48.98:8790/mwebapi/GetDmNhomHangHoa`).then((res) => {
      const ls = JSON.parse(JSON.stringify(res.data.Result));
      let arr = [];
      ls.map((item) => {
        arr.push(item.TEN_NHOM_HANG_HOA);
      });
      this.setState({
        lsNhomHHDV: arr,
      });
      console.log(ls);
    });
  }

  fetHHDV() {
    axios.get(`http://113.160.48.98:8790/mwebapi/GetDmHangHoaDichVu`).then((res) => {
      const ls = JSON.parse(JSON.stringify(res.data.Result));
      let arr = [];
      ls.map((item) => {
        arr.push(item.TEN_HANG_HOA_DICH_VU);
      });
      this.setState({
        lsHHDV: arr,
      });
      console.log(ls);
    });
  }

  fetHHDVDK() {
    axios.get(`http://113.160.48.98:8790/mwebapi/GetDmHHDVDKGia`).then((res) => {
      const ls = JSON.parse(JSON.stringify(res.data.Result));
      let arr = [];
      ls.map((item) => {
        arr.push(item.TEN_SAN_PHAM);
      });
      this.setState({
        lsHHDV: arr,
      });
      console.log(ls);
    });
  }

  componentDidMount() {
    this.fetDmDoanhNghiep();
    this.fetDmLoaiGia();
  }

  toggleSwitch = (switchId) => this.setState({ [switchId]: !this.state[switchId] });

  renderCards = () => {
    scrollX = new Animated.Value(0);
    cards = [articles[5], articles[6]];
    return (
      <Block flex style={styles.group}>
        <Articles />
        <Block flex card center shadow style={styles.category}>
          <ImageBackground
            source={Images.Products['path']}
            style={[styles.imageBlock, { width: width - theme.SIZES.BASE * 2, height: 252 }]}
            imageStyle={{
              width: width - theme.SIZES.BASE * 2,
              height: 252,
            }}
          >
            <Block style={styles.categoryTitle}>
              <Text size={18} bold color={theme.COLORS.WHITE}>
                View article
              </Text>
            </Block>
          </ImageBackground>
        </Block>
        <ScrollView
          horizontal={true}
          style={styles.contentContainer}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={{
            width: width * 2,
          }}
        >
          {cards.map((item, index) => {
            return (
              <Card
                key={index}
                item={item}
                full
                titleStyle={styles.productTitle}
                imageStyle={{ height: 300, width: '100%', resizeMode: 'contain' }}
              />
            );
          })}
        </ScrollView>
      </Block>
    );
  };
  renderArticles = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
        <Block flex>
          {this.state.data_1.map((item, index) => {
            return (
              <Card
                key={index}
                item={item}
                full
                titleStyle={styles.productTitle}
                imageStyle={{ height: 300, width: '100%', resizeMode: 'contain' }}
              />
            );
          })}
          {/* <Card item={articles[0]} horizontal />
          <Block flex row>
            <Card item={articles[1]} style={{ marginRight: theme.SIZES.BASE }} />
            <Card item={articles[2]} />
          </Block>
          <Card item={articles[3]} horizontal />
          <Card item={articles[4]} full /> */}
        </Block>
      </ScrollView>
    );
  };
  renderForm = () => {
    const showStartDatePicker = () => {
      //setDatePickerVisibility(true);
      this.setState({ isStartDatePickerVisible: true });
    };

    const hideStartDatePicker = () => {
      //setDatePickerVisibility(false);
      this.setState({ isStartDatePickerVisible: false });
    };

    const handleStartDateConfirm = (date) => {
      console.log('Start date picked: ', date);
      this.setState({ startDate: date });
      hideStartDatePicker();
    };

    const showEndDatePicker = () => {
      //setDatePickerVisibility(true);
      this.setState({ isEndDatePickerVisible: true });
    };

    const hideEndDatePicker = () => {
      //setDatePickerVisibility(false);
      this.setState({ isEndDatePickerVisible: false });
    };

    const handleEndDateConfirm = (date) => {
      console.log('End date picked: ', date);
      this.setState({ endDate: date });
      hideEndDatePicker();
    };

    const showSearchResult = (props) => {
      console.log('Xem bao cao');
      this.setState({ isDataLoaded: true });
    };

    // const onChange = (event, selectedDate) => {
    //   const currentDate = selectedDate;
    //   this.setState({ show: false });
    //   this.setState({ date: currentDate });
    // };

    // const showMode = (currentMode) => {
    //   if (Platform.OS === 'android') {
    //     this.setState({ show: false });
    //     //console.log(Platform.OS);
    //     // for iOS, add a button that closes the picker
    //   }
    //   //setMode(currentMode);
    //   this.setState({ mode: currentMode });
    //   //this.setState({ show: true });
    // };

    // const showDatepicker = () => {
    //   showMode('date');
    // };

    // const showTimepicker = () => {
    //   showMode('time');
    // };

    //var headers = new Headers();
    //headers.append('X-CSCAPI-KEY', 'API_KEY');

    // var requestOptions = {
    //   method: 'GET',
    //   //headers: headers,
    //   redirect: 'follow',
    // };

    // fetch('http://113.160.48.98:8790/mwebapi/getdmdoanhnghiep', requestOptions)
    //   .then((response) => response.json())
    //   .then((result) => {
    //     if (result) {
    //       let ret = result.Result;
    //       var count = Object.keys(ret).length;
    //       let ls = [];
    //       for (var i = 0; i < count; i++) {
    //         ls.push(ret[i].TEN_DOANH_NGHIEP);
    //       }
    //       this.setState({
    //         lsDoanhNghiep: ls,
    //       });
    //     }
    //   })
    //   .catch((error) => console.log('error', error));

    // fetch('http://113.160.48.98:8790/mwebapi/GetDmLoaiGia', requestOptions)
    //   .then((response) => response.json())
    //   .then((result) => {
    //     if (result) {
    //       let ret = result.Result;
    //       var count = Object.keys(ret).length;
    //       let ls = [];
    //       for (var i = 0; i < count; i++) {
    //         ls.push(ret[i].TEN_LOAI_GIA);
    //       }
    //       this.setState({
    //         lsLoaiGia: ls,
    //       });
    //     }
    //   })
    //   .catch((error) => console.log('error', error));

    // var config = {
    //   method: 'get',
    //   url: 'http://113.160.48.98:8790/mwebapi/getdmdoanhnghiep',
    //   // headers: {
    //   //   'X-CSCAPI-KEY': 'API_KEY',
    //   // },
    // };

    // axios(config)
    //   .then((response) => {
    //     if (response) {
    //       var ls = JSON.parse(JSON.stringify(response.data.Result));
    //       let arr = [];
    //       ls.map((item) => {
    //         arr.push(item.TEN_DOANH_NGHIEP);
    //       });
    //       this.setState({
    //         lsDoanhNghiep: arr,
    //       });
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    // config = {
    //   method: 'get',
    //   url: 'http://113.160.48.98:8790/mwebapi/GetDmLoaiGia',
    //   // headers: {
    //   //   'X-CSCAPI-KEY': 'API_KEY',
    //   // },
    // };

    // axios(config)
    //   .then((response) => {
    //     if (response) {
    //       var ls = JSON.parse(JSON.stringify(response.data.Result));
    //       let arr = [];
    //       ls.map((item) => {
    //         arr.push(item.TEN_LOAI_GIA);
    //       });
    //       this.setState({
    //         lsLoaiGia: arr,
    //       });
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    // config = {
    //   method: 'get',
    //   url: 'http://113.160.48.98:8790/mwebapi/GetDmNhomHangHoa',
    //   // headers: {
    //   //   'X-CSCAPI-KEY': 'API_KEY',
    //   // },
    // };

    // axios(config)
    //   .then((response) => {
    //     if (response) {
    //       var ls = JSON.parse(JSON.stringify(response.data.Result));
    //       let arr = [];
    //       ls.map((item) => {
    //         arr.push(item.TEN_NHOM_HANG_HOA);
    //       });
    //       this.setState({
    //         lsNhomHHDV: arr,
    //       });
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    // config = {
    //   method: 'get',
    //   url: 'http://113.160.48.98:8790/mwebapi/GetDmHangHoaDichVu',
    //   // headers: {
    //   //   'X-CSCAPI-KEY': 'API_KEY',
    //   // },
    // };

    // axios(config)
    //   .then((response) => {
    //     if (response) {
    //       var ls = JSON.parse(JSON.stringify(response.data.Result));
    //       let arr = [];
    //       ls.map((item) => {
    //         arr.push(item.TEN_HANG_HOA_DICH_VU);
    //       });
    //       this.setState({
    //         lsHHDV: arr,
    //       });
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    // config = {
    //   method: 'get',
    //   url: 'http://113.160.48.98:8790/mwebapi/GetDmHHDVDKGia',
    //   // headers: {
    //   //   'X-CSCAPI-KEY': 'API_KEY',
    //   // },
    // };

    // axios(config)
    //   .then((response) => {
    //     if (response) {
    //       var ls = JSON.parse(JSON.stringify(response.data.Result));
    //       let arr = [];
    //       ls.map((item) => {
    //         arr.push(item.TEN_SAN_PHAM);
    //       });
    //       this.setState({
    //         lsHHDVDK: arr,
    //       });
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    return (
      <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text style={{ fontFamily: 'montserrat-regular' }} muted>
            Doanh Nghiệp
          </Text>
          <Block style={{ marginTop: 8 }}>
            <Select defaultIndex={0} options={this.state.lsDoanhNghiep} />
          </Block>
        </Block>
        <Block row style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block flex style={{ marginTop: theme.SIZES.BASE }}>
            <Text style={{ fontFamily: 'montserrat-regular' }} muted>
              Từ ngày
            </Text>
            <Button
              textStyle={{
                fontFamily: 'montserrat-regular',
                fontSize: 10,
                color: nowTheme.COLORS.BLACK,
              }}
              small
              center
              color="border"
              style={styles.optionsButton}
              onPress={showStartDatePicker}
              justifyContent="flex-end"
            >
              {Moment(this.state.startDate.toLocaleString()).format('DD/MM/YYYY')}
            </Button>
          </Block>
          <Block flex style={{ marginTop: theme.SIZES.BASE }}>
            <Text style={{ fontFamily: 'montserrat-regular' }} muted>
              Đến ngày
            </Text>
            <Block>
              <Button
                textStyle={{
                  fontFamily: 'montserrat-regular',
                  fontSize: 10,
                  color: nowTheme.COLORS.BLACK,
                }}
                small
                center
                color="border"
                style={styles.optionsButton}
                onPress={showEndDatePicker}
              >
                {Moment(this.state.endDate.toLocaleString()).format('DD/MM/YYYY')}
              </Button>
            </Block>
            <DateTimePickerModal
              isVisible={this.state.isStartDatePickerVisible}
              mode="date"
              onConfirm={handleStartDateConfirm}
              onCancel={hideStartDatePicker}
            />
            <DateTimePickerModal
              isVisible={this.state.isEndDatePickerVisible}
              mode="date"
              onConfirm={handleEndDateConfirm}
              onCancel={hideEndDatePicker}
            />
          </Block>
        </Block>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text style={{ fontFamily: 'montserrat-regular', marginTop: theme.SIZES.BASE }} muted>
            Loại giá
          </Text>
          <Block style={{ flex: 1, marginTop: 8 }}>
            <Select defaultIndex={0} options={this.state.lsLoaiGia} />
          </Block>
        </Block>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text style={{ fontFamily: 'montserrat-regular', marginTop: theme.SIZES.BASE }} muted>
            Nhóm Hàng hóa dịch vụ
          </Text>
          <Block style={{ flex: 1, marginTop: 8 }}>
            <Select defaultIndex={0} options={this.state.lsNhomHHDV} />
          </Block>
        </Block>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text style={{ fontFamily: 'montserrat-regular', marginTop: theme.SIZES.BASE }} muted>
            Hàng hóa dịch vụ
          </Text>
          <Block style={{ flex: 1, marginTop: 8 }}>
            <Select defaultIndex={0} options={this.state.lsHHDV} />
          </Block>
        </Block>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text style={{ fontFamily: 'montserrat-regular', marginTop: theme.SIZES.BASE }} muted>
            Hàng hóa dịch vụ đăng ký
          </Text>
          <Block style={{ flex: 1, marginTop: 8 }}>
            <Select defaultIndex={0} options={this.state.lsHHDVDK} />
          </Block>
        </Block>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE, marginTop: 10 }}>
          <Block center>
            <Button
              textStyle={{ fontFamily: 'montserrat-regular', fontSize: 16 }}
              color="warning"
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

  render() {
    return (
      <Block flex center>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30, width }}
        >
          {this.renderForm()}
          {this.state.isDataLoaded && this.renderArticles()}
          {/* {this.renderCards()} */}
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
  },
  group: {
    paddingTop: theme.SIZES.BASE * 2,
  },
  shadow: {
    shadowColor: 'black',
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
    width: 'auto',
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
    height: '100%',
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBlock: {
    overflow: 'hidden',
    borderRadius: 4,
    marginHorizontal: 10,
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure,
  },
  productTitle: {
    color: nowTheme.COLORS.PRIMARY,
    textAlign: 'center',
    fontFamily: 'montserrat-bold',
    fontSize: 18,
  },
});

export default KT_THEO_CHI_TIEU;
