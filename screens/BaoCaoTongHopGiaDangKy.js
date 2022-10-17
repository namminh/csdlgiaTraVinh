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
import { appConfig } from "../constants";

const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

class BaoCaoTongHopGiaDangKy extends React.Component {
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
      //startDate: Moment(new Date()).format('DD/MM/YYYY'),
      startDate: '01/01/2019',
      endDate: Moment(new Date()).format('DD/MM/YYYY'),
      mode: 'date',
      isStartDatePickerVisible: false,
      isEndDatePickerVisible: false,
      isDataLoaded: false,
    };
  }

  fetDmDoanhNghiep() {
    axios.get(`${appConfig.BASE_URL}/getdmdoanhnghiep`).then((res) => {
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
    axios.get(`${appConfig.BASE_URL}/GetDmLoaiGia`).then((res) => {
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
    axios.get(`${appConfig.BASE_URL}/GetDmNhomHangHoa`).then((res) => {
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
    axios.get(`${appConfig.BASE_URL}/GetDmHangHoaDichVu`).then((res) => {
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
    axios.get(`${appConfig.BASE_URL}/GetDmHHDVDKGia`).then((res) => {
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
    //let url = `${appConfig.BASE_URL}/GetBaoCaoTongHopGiaDangKy?doanhNghiepId=263&ngayHieuLucTu=01/01/2021&ngayHieuLucDen=01/09/2022&loaiGiaIds=10`;
    let url = `${appConfig.BASE_URL}/GetBaoCaoTongHopGiaDangKy?doanhNghiepId=${this.state.selectedDoanhNghiepId}&ngayHieuLucTu=${this.state.startDate}&ngayHieuLucDen=${this.state.endDate}&loaiGiaIds=${this.state.selectedLoaiGiaId}`;
    console.log(url);
    axios.get(url).then((res) => {
      const ls = JSON.parse(JSON.stringify(res.data.Result));
      var count = Object.keys(ls).length;
      //console.log(count);
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
    // this.setState({
    //   startDate: Moment(this.state.startDate.toLocaleString()).format('DD/MM/YYYY'),
    // });
    // this.setState({
    //   endDateDate: Moment(this.state.startDate.toLocaleString()).format('DD/MM/YYYY'),
    // });
    console.log(this.state.startDate);
    console.log(this.state.endDate);
  }

  showStartDatePicker = () => {
    this.setState({ isStartDatePickerVisible: true });
  };

  hideStartDatePicker = () => {
    this.setState({ isStartDatePickerVisible: false });
  };

  handleStartDateConfirm = (date) => {
    this.setState({ startDate: Moment(date).format('DD/MM/YYYY') });
    this.hideStartDatePicker();
  };

  showEndDatePicker = () => {
    this.setState({ isEndDatePickerVisible: true });
  };

  hideEndDatePicker = () => {
    this.setState({ isEndDatePickerVisible: false });
  };

  handleEndDateConfirm = (date) => {
    this.setState({ endDate: Moment(date).format('DD/MM/YYYY') });
    this.hideEndDatePicker();
  };

  showSearchResult = () => {
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

    //console.log('Xem bao cao');
    this.setState({ isDataLoaded: false });
    this.fetData();
    this.setState({ isDataLoaded: true });
    var ret = this.state.lsData;
    if (!ret || Object.keys(ret).length <= 0) {
      this.showToast('Không tìm thấy dữ liệu phù hợp');
    }
    //console.log(this.state.lsData);
  };
  showToast = (message) => {
    console.log(message);
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

  onSelectedNhomHHDV(index) {
    if (index >= 0) {
      let selected = this.state.lsNhomHHDV[index];

      if (selected) this.setState({ selectedNhomHHDVId: selected.NHOM_HHDV_ID });
    }
  }

  toggleSwitch = (switchId) => this.setState({ [switchId]: !this.state[switchId] });

  renderSearchResult = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
        <Block flex style={styles.container}>
          {this.state.lsData.map((item, index) => {
            //console.log(this.state.lsData.slice(0, 2));
            return (
              <CardBaoCaoTongHopGiaDangKy
                key={index}
                item={item}
                horizontal
                titleStyle={styles.productTitle}
                imageStyle={{ height: 300, width: '100%', resizeMode: 'contain' }}
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

    // fetch('${appConfig.BASE_URL}/getdmdoanhnghiep', requestOptions)
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

    // fetch('${appConfig.BASE_URL}/GetDmLoaiGia', requestOptions)
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
    //   url: '${appConfig.BASE_URL}/getdmdoanhnghiep',
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
    //   url: '${appConfig.BASE_URL}/GetDmLoaiGia',
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
    //   url: '${appConfig.BASE_URL}/GetDmNhomHangHoa',
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
    //   url: '${appConfig.BASE_URL}/GetDmHangHoaDichVu',
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
    //   url: '${appConfig.BASE_URL}/GetDmHHDVDKGia',
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
          <Block>
            <Text style={styles.textLabel}>Doanh Nghiệp</Text>
          </Block>
          <Block style={{ paddingVertical: theme.SIZES.BASE }}>
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
          <Block flex>
            <Block>
              <Text style={styles.textLabel}>Từ ngày</Text>
            </Block>
            <Block>
              <Button
                textStyle={styles.textButton}
                small
                center
                color="border"
                style={styles.optionsButton}
                onPress={this.showStartDatePicker}
                justifyContent="flex-end"
              >
                {this.state.startDate}
              </Button>
            </Block>
          </Block>
          <Block flex>
            <Text style={styles.textLabel} muted>
              Đến ngày
            </Text>
            <Block>
              <Button
                textStyle={styles.textButton}
                small
                center
                color="border"
                style={styles.optionsButton}
                onPress={this.showEndDatePicker}
              >
                {this.state.endDate}
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
          <Block>
            <Text style={styles.textLabel} muted>
              Loại giá
            </Text>
          </Block>
          <Block style={{ paddingVertical: theme.SIZES.BASE }}>
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
          <Block>
            <Text style={styles.textLabel}>Nhóm Hàng hóa dịch vụ</Text>
          </Block>
          <Block style={{ paddingVertical: theme.SIZES.BASE }}>
            <Select
              defaultIndex={-1}
              defaultValue={'- Chọn -'}
              options={this.state.lsTenNhomHHDV}
              onSelect={(index, value) => {
                this.onSelectedNhomHHDV(index);
              }}
            />
          </Block>
        </Block>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block>
            <Text style={styles.textLabel}>Hàng hóa dịch vụ</Text>
          </Block>
          <Block style={{ paddingVertical: theme.SIZES.BASE }}>
            <Select defaultIndex={-1} defaultValue={'- Chọn -'} options={this.state.lsTenHHDV} />
          </Block>
        </Block>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block>
            <Text style={styles.textLabel}>Hàng hóa dịch vụ đăng ký</Text>
          </Block>
          <Block style={{ paddingVertical: theme.SIZES.BASE }}>
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
  textLabel: {
    color: nowTheme.COLORS.BLACK,
    fontFamily: 'montserrat-bold',
    fontSize: 14,
  },
  textButton: {
    color: nowTheme.COLORS.BLACK,
    fontFamily: 'montserrat-regular',
    fontSize: 14,
  },
  container: {
    paddingHorizontal: theme.SIZES.BASE,
  },
});

export default BaoCaoTongHopGiaDangKy;
