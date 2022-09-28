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

// Galio components
import { Block, Text, Button as GaButton, theme, Toast } from 'galio-framework';

// Now UI themed components
import { Images, nowTheme, articles, tabs } from '../constants';
import { Button, Select, Icon, Input, Header, Switch } from '../components';

import Img from '../components/Img';
import { CardBaoCaoTongHopGiaTaiSanTDG } from '../components';

import axios from 'axios';
//import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Moment from 'moment';

const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

class BaoCaoTongHopGiaTaiSanTDG extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkSelected: [],
      lsData: [],
      ngayHieuLucTu: Moment(new Date()).format('DD/MM/YYYY'),
      ngayHieuLucDen: Moment(new Date()).format('DD/MM/YYYY'),
      mode: 'date',
      isNgayHieuLucTuPickerVisible: false,
      isNgayHieuLucDenPickerVisible: false,
      isDataLoaded: false,
      isShow: false,
    };
  }

  fetData() {
    //let url = `http://113.160.48.98:8790/mwebapi/GetBaoCaoTongHopGiaTaiSanTDG?ngayHieuLucTu=23/09/2019&ngayHieuLucDen=26/09/2022`;
    let url = `http://113.160.48.98:8790/mwebapi/GetBaoCaoTongHopGiaTaiSanTDG?ngayHieuLucTu=${this.state.ngayHieuLucTu}&ngayHieuLucDen=${this.state.ngayHieuLucDen}`;
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

  componentDidMount() {}

  showNgayHieuLucTuPicker = () => {
    //setDatePickerVisibility(true);
    this.setState({ isNgayHieuLucTuPickerVisible: true });
  };

  hideNgayHieuLucTuPicker = () => {
    //setDatePickerVisibility(false);
    this.setState({ isNgayHieuLucTuPickerVisible: false });
  };

  showNgayHieuLucDenPicker = () => {
    //setDatePickerVisibility(true);
    this.setState({ isNgayHieuLucDenPickerVisible: true });
  };

  hideNgayHieuLucDenPicker = () => {
    //setDatePickerVisibility(false);
    this.setState({ isNgayHieuLucDenPickerVisible: false });
  };

  handleNgayHieuLucTuConfirm = (date) => {
    this.setState({ ngayHieuLucTu: Moment(date).format('DD/MM/YYYY') });
    this.hideNgayHieuLucTuPicker();
  };

  handleNgayHieuLucDenConfirm = (date) => {
    this.setState({ ngayHieuLucDen: Moment(date).format('DD/MM/YYYY') });
    this.hideNgayHieuLucDenPicker();
  };

  showSearchResult = () => {
    let ngayHieuLucTu = this.state.ngayHieuLucTu;
    let ngayHieuLucDen = this.state.ngayHieuLucDen;

    console.log(`${ngayHieuLucTu},${ngayHieuLucDen}`);
    // if (!DOANH_NGHIEP_ID || DOANH_NGHIEP_ID === -1) {
    //   this.showToast('Bạn phải chọn Doanh nghiệp');
    //   return;
    // }

    // if (!LOAI_GIA_ID || LOAI_GIA_ID === -1) {
    //   this.showToast('Bạn phải loại giá');
    //   return;
    // }

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

  renderForm = () => {
    return (
      <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block>
            <Text style={styles.textLabel}>Thời điểm thẩm định giá:</Text>
          </Block>
          <Block flex row>
            <Block flex>
              <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                <Text muted>Từ ngày:</Text>
              </Block>
              <Block>
                <Button
                  textStyle={styles.textButton}
                  small
                  center
                  color="border"
                  style={styles.optionsButton}
                  onPress={this.showNgayHieuLucTuPicker}
                  justifyContent="flex-end"
                >
                  {this.state.ngayHieuLucTu}
                </Button>
              </Block>
              <DateTimePickerModal
                isVisible={this.state.isNgayHieuLucDenPickerVisible}
                mode="date"
                onConfirm={this.handleNgayHieuLucDenConfirm}
                onCancel={this.hideNgayHieuLucDenPicker}
              />
            </Block>
            <Block flex>
              <Block>
                <Text muted>Đến ngày:</Text>
              </Block>
              <Block>
                <Button
                  textStyle={styles.textButton}
                  small
                  center
                  color="border"
                  style={styles.optionsButton}
                  onPress={this.showNgayHieuLucDenPicker}
                  justifyContent="flex-end"
                >
                  {this.state.ngayHieuLucDen}
                </Button>
              </Block>
              <DateTimePickerModal
                isVisible={this.state.isNgayHieuLucTuPickerVisible}
                mode="date"
                onConfirm={this.handleNgayHieuLucTuConfirm}
                onCancel={this.hideNgayHieuLucTuPicker}
              />
            </Block>
          </Block>
        </Block>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE, marginTop: 10 }}>
          <Block center>
            <Button
              textStyle={{ fontFamily: 'montserrat-regular', fontSize: 16 }}
              color="info"
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
        </ScrollView>
      </Block>
    );
  }

  renderSearchResult = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
        <Block flex style={{ paddingHorizontal: theme.SIZES.BASE }}>
          {this.state.lsData.map((item, index) => {
            //console.log(this.state.lsData.slice(0, 2));
            return (
              <CardBaoCaoTongHopGiaTaiSanTDG
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
    textAlign: 'left',
    fontFamily: 'montserrat-bold',
    fontSize: 15,
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
});

export default BaoCaoTongHopGiaTaiSanTDG;
