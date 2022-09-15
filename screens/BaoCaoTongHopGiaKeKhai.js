import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  ImageBackground,
  ToastAndroid,
} from 'react-native';

import Articles from './Articles';
// Galio components
import { Block, Text, Button as GaButton, theme } from 'galio-framework';

// Now UI themed components
import { Images, nowTheme, articles, tabs } from '../constants';
import { Button, Select, Icon, Input, Header, Switch } from '../components';

import Img from '../components/Img';
import { CardBaoCaoTongHopGiaDangKy } from '../components';

import axios from 'axios';
//import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Moment from 'moment';

const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

class BaoCaoTongHopGiaKeKhai extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkSelected: [],
      lsDoanhNghiep: [],
      lsTenDoanhNghiep: [],
      selectedDoanhNghiepId: -1,
      lsLoaiGia: [],
      lsTenLoaiGia: [],
      selectedLoaiGiaId: -1,
      lsNhomHHDV: [],
      lsTenNhomHHDV: [],
      selectedNhomHHDVId: -1,
      lsHHDV: [],
      lsTenHHDV: [],
      selectedHHDVId: -1,
      lsHHDVDK: [],
      lsTenHHDVDK: [],
      selectedHHDVDKId: -1,
      lsData: [],
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
      this.setState({
        lsDoanhNghiep: ls,
      });
      let arr = [];
      ls.map((item) => {
        arr.push(item.TEN_DOANH_NGHIEP);
      });
      this.setState({
        lsTenDoanhNghiep: arr,
      });
    });
  }

  fetDmLoaiGia() {
    axios.get(`http://113.160.48.98:8790/mwebapi/GetDmLoaiGia`).then((res) => {
      const ls = JSON.parse(JSON.stringify(res.data.Result));
      this.setState({
        lsLoaiGia: ls,
      });
      let arr = [];
      ls.map((item) => {
        arr.push(item.TEN_LOAI_GIA);
      });
      this.setState({
        lsTenLoaiGia: arr,
      });
    });
  }

  fetNhomHHDV() {
    axios.get(`http://113.160.48.98:8790/mwebapi/GetDmNhomHangHoa`).then((res) => {
      const ls = JSON.parse(JSON.stringify(res.data.Result));
      this.setState({
        lsNhomHHDV: ls,
      });
      let arr = [];
      ls.map((item) => {
        arr.push(item.TEN_NHOM_HANG_HOA);
      });
      this.setState({
        lsTenNhomHHDV: arr,
      });
    });
  }

  fetHHDV() {
    axios.get(`http://113.160.48.98:8790/mwebapi/GetDmHangHoaDichVu`).then((res) => {
      const ls = JSON.parse(JSON.stringify(res.data.Result));
      this.setState({
        lsNhomHHDV: ls,
      });
      let arr = [];
      ls.map((item) => {
        arr.push(item.TEN_HANG_HOA_DICH_VU);
      });
      this.setState({
        lsTenHHDV: arr,
      });
    });
  }

  fetHHDVDK() {
    axios.get(`http://113.160.48.98:8790/mwebapi/GetDmHHDVDKGia`).then((res) => {
      const ls = JSON.parse(JSON.stringify(res.data.Result));
      this.setState({
        lsHHDV: arr,
      });
      let arr = [];
      ls.map((item) => {
        arr.push(item.TEN_SAN_PHAM);
      });
      this.setState({
        lsTenHHDV: arr,
      });
    });
  }

  fetData() {
    let d1 = Moment(this.state.startDate.toLocaleString()).format('DD/MM/YYYY');
    let d2 = Moment(this.state.endDate.toLocaleString()).format('DD/MM/YYYY');
    //let url = `http://113.160.48.98:8790/mwebapi/GetBaoCaoTongHopGiaKeKhai?doanhNghiepId=263&ngayHieuLucTu=01/01/2021&ngayHieuLucDen=01/09/2022&loaiGiaIds=10`;
    let url = `http://113.160.48.98:8790/mwebapi/GetBaoCaoTongHopGiaKeKhai?doanhNghiepId=${this.state.selectedDoanhNghiepId}&ngayHieuLucTu=${d1}&ngayHieuLucDen=${d2}&loaiGiaIds=${this.state.selectedLoaiGiaId}`;
    console.log(url);
    axios.get(url).then((res) => {
      const ls = JSON.parse(JSON.stringify(res.data.Result));
      var count = Object.keys(ls).length;
      console.log(count);
      setTimeout(() => {
        this.setState({
          lsData: ls,
        });
      }, 2000);
      //console.log(this.state.lsData);
    });
  }

  componentDidMount() {
    this.fetDmDoanhNghiep();
    this.fetDmLoaiGia();
  }

  showStartDatePicker = () => {
    //setDatePickerVisibility(true);
    this.setState({ isStartDatePickerVisible: true });
  };

  hideStartDatePicker = () => {
    //setDatePickerVisibility(false);
    this.setState({ isStartDatePickerVisible: false });
  };

  handleStartDateConfirm = (date) => {
    console.log('Start date picked: ', date);
    this.setState({ startDate: date });
    hideStartDatePicker();
  };

  showEndDatePicker = () => {
    //setDatePickerVisibility(true);
    this.setState({ isEndDatePickerVisible: true });
  };

  hideEndDatePicker = () => {
    //setDatePickerVisibility(false);
    this.setState({ isEndDatePickerVisible: false });
  };

  handleEndDateConfirm = (date) => {
    console.log('End date picked: ', date);
    this.setState({ endDate: date });
    hideEndDatePicker();
  };

  showSearchResult = () => {
    //console.log('Xem bao cao');
    let DOANH_NGHIEP_ID = this.state.selectedDoanhNghiepId;
    let LOAI_GIA_ID = this.state.selectedLoaiGiaId;
    let NGAY_HIEU_LUC_TU = this.state.startDate;
    let NGAY_HIEU_LUC_DEN = this.state.endDate;

    console.log(`${DOANH_NGHIEP_ID},${LOAI_GIA_ID},${NGAY_HIEU_LUC_TU},${NGAY_HIEU_LUC_DEN}`);

    if (!DOANH_NGHIEP_ID || DOANH_NGHIEP_ID === -1) {
      this.showToast('Bạn phải chọn Doanh nghiệp');
      return;
    }

    if (!LOAI_GIA_ID || LOAI_GIA_ID === -1) {
      this.showToast('Bạn phải loại giá');
      return;
    }
    this.setState({ isDataLoaded: false });
    console.log('Loading...');
    this.fetData();
    this.setState({ isDataLoaded: true });
    var ret = this.state.lsData;
    if (!ret || Object.keys(ret).length <= 0) {
      this.showToast('Không tìm thấy dữ liệu phù hợp');
    }
    //console.log(this.state.lsData);
  };

  showToast = (message) => {
    //console.log(message);
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };
  showToastWithGravity = (message) => {
    ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };
  showToastWithGravityAndOffset = (message) => {
    ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
  };

  onSelectedDoanhNghiep(index) {
    if (index >= 0) {
      let selected = this.state.lsDoanhNghiep[index];
      //console.log(selected);
      if (selected) this.setState({ selectedDoanhNghiepId: selected.DOANH_NGHIEP_ID });
    }
  }

  onSelectedLoaiGia(index) {
    if (index >= 0) {
      let selected = this.state.lsLoaiGia[index];
      selected && this.setState({ selectedLoaiGiaId: selected.LOAI_GIA_ID });
    }
  }

  toggleSwitch = (switchId) => this.setState({ [switchId]: !this.state[switchId] });

  renderSearchResult = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
        <Block flex>
          {this.state.lsData.map((item, index) => {
            //console.log(this.state.lsData.slice(0, 2));
            return (
              <CardBaoCaoTongHopGiaDangKy
                key={index}
                item={item}
                horizontal
                titleStyle={styles.productTitle}
                //imageStyle={{ height: 300, width: '100%', resizeMode: 'contain' }}
              />
            );
          })}
        </Block>
      </ScrollView>
    );
  };
  renderForm = () => {
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
            <Select
              defaultIndex={-1}
              defaultValue={'- Chọn -'}
              options={this.state.lsTenDoanhNghiep}
              onSelect={(index, value) => {
                this.onSelectedDoanhNghiep(index);
              }}
            />
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
              onPress={this.showStartDatePicker}
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
                onPress={this.showEndDatePicker}
              >
                {Moment(this.state.endDate.toLocaleString()).format('DD/MM/YYYY')}
              </Button>
            </Block>
            <DateTimePickerModal
              isVisible={this.state.isStartDatePickerVisible}
              mode="date"
              onConfirm={this.handleStartDateConfirm}
              onCancel={this.hideStartDatePicker}
            />
            <DateTimePickerModal
              isVisible={this.state.isEndDatePickerVisible}
              mode="date"
              onConfirm={this.handleEndDateConfirm}
              onCancel={this.hideEndDatePicker}
            />
          </Block>
        </Block>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text style={{ fontFamily: 'montserrat-regular', marginTop: theme.SIZES.BASE }} muted>
            Loại giá
          </Text>
          <Block style={{ flex: 1, marginTop: 8 }}>
            <Select
              defaultIndex={-1}
              defaultValue={'- Chọn -'}
              options={this.state.lsTenLoaiGia}
              onSelect={(index, value) => {
                this.onSelectedLoaiGia(index);
              }}
            />
          </Block>
        </Block>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text style={{ fontFamily: 'montserrat-regular', marginTop: theme.SIZES.BASE }} muted>
            Nhóm Hàng hóa dịch vụ
          </Text>
          <Block style={{ flex: 1, marginTop: 8 }}>
            <Select
              defaultIndex={-1}
              defaultValue={'- Chọn -'}
              options={this.state.lsTenNhomHHDV}
              name="selNhomHHDV"
            />
          </Block>
        </Block>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text style={{ fontFamily: 'montserrat-regular', marginTop: theme.SIZES.BASE }} muted>
            Hàng hóa dịch vụ
          </Text>
          <Block style={{ flex: 1, marginTop: 8 }}>
            <Select defaultIndex={-1} defaultValue={'- Chọn -'} options={this.state.lsTenHHDV} />
          </Block>
        </Block>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text style={{ fontFamily: 'montserrat-regular', marginTop: theme.SIZES.BASE }} muted>
            Hàng hóa dịch vụ đăng ký
          </Text>
          <Block style={{ flex: 1, marginTop: 8 }}>
            <Select defaultIndex={-1} defaultValue={'- Chọn -'} options={this.state.lsTenHHDVDK} />
          </Block>
        </Block>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE, marginTop: 10 }}>
          <Block center>
            <Button
              textStyle={{ fontFamily: 'montserrat-regular', fontSize: 16 }}
              color="warning"
              style={styles.button}
              onPress={this.showSearchResult}
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
          {this.state.isDataLoaded && this.renderSearchResult()}
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
    color: nowTheme.COLORS.ACTIVE,
    textAlign: 'center',
    fontFamily: 'montserrat-bold',
    fontSize: 18,
  },
});

export default BaoCaoTongHopGiaKeKhai;
