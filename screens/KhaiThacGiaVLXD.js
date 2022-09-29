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
import { Card_KhaiThacGiaVLXD } from '../components';

import axios from 'axios';
//import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Moment from 'moment';

const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

class KhaiThacGiaVLXD extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkSelected: [],
      TenHangHoa: [],
      lsData: [],
      startDate: new Date(),
      endDate: new Date(),
      mode: 'date',
      isStartDatePickerVisible: false,
      isEndDatePickerVisible: false,
      isDataLoaded: false,
      productname: '',
    };
  }

  fetData() {
    let d1 = Moment(this.state.startDate.toLocaleString()).format('DD/MM/YYYY');
    let d2 = Moment(this.state.endDate.toLocaleString()).format('DD/MM/YYYY');
    //let url = `http://113.160.48.98:8790/mwebapi/GetBaoCaoTongHopGiaKeKhai?doanhNghiepId=263&ngayHieuLucTu=01/01/2021&ngayHieuLucDen=01/09/2022&loaiGiaIds=10`;
    let url = `http://113.160.48.98:8790/mwebapi/GetKhaiThacGiaVLXD?ten=${this.state.productname}&ngayHieuLucTu=${d1}&ngayHieuLucDen=${d2}`;
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
    // this.setState({ startDate: Moment(date).format('DD/MM/YYYY') });
    this.hideStartDatePicker();
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
    console.log('Start date picked: ', date);
    this.setState({ endDate: date });
    this.hideEndDatePicker();
  };

  showSearchResult = () => {
    //console.log('Xem bao cao');

    let NGAY_HIEU_LUC_TU = this.state.startDate;
    let NGAY_HIEU_LUC_DEN = this.state.endDate;

    console.log(`${NGAY_HIEU_LUC_TU},${NGAY_HIEU_LUC_DEN}`);

    if (!NGAY_HIEU_LUC_TU || NGAY_HIEU_LUC_DEN === -1) {
      this.showToast('Bạn phải chọn Ngày hiệu lực');
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

  toggleSwitch = (switchId) => this.setState({ [switchId]: !this.state[switchId] });

  renderSearchResult = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
        <Block flex>
          {this.state.lsData.slice(0, 20).map((item, index) => {
            //console.log(this.state.lsData.slice(0, 2));
            return (
              <Card_KhaiThacGiaVLXD
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
    return (
      <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Input
            placeholder="Tên vật liệu xây dựng"
            shadowless
            iconContent={
              <Icon
                size={11}
                style={{ marginRight: 10 }}
                color={nowTheme.COLORS.ICON}
                name="zoom-bold2x"
                family="NowExtra"
              />
            }
            onChangeText={(productname) => this.setState({ productname })}
          />
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

export default KhaiThacGiaVLXD;
