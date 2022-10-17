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
import { CardGiaHHDVNhaNuocDinhGia } from '../components';

import axios from 'axios';
//import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import { appConfig } from "../constants";

const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

class TraCuuGiaHHDVNhaNuocDinhGia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkSelected: [],
      lsLoaiHHDV: [],
      lsTenLoaiHHDV: [],
      selectedLoaiHHDVId: '',
      lsMauBieu: [],
      lsTenMauBieu: [],
      selectedMauBieuId: '',
      lsDonVi: [],
      lsTenDonVi: [],
      selectedDonViId: '',
      lsData: [],
      ngayBanHanhTu: Moment(new Date()).format('DD/MM/YYYY'),
      ngayBanHanhDen: Moment(new Date()).format('DD/MM/YYYY'),
      ngayHieuLucTu: Moment(new Date()).format('DD/MM/YYYY'),
      ngayHieuLucDen: Moment(new Date()).format('DD/MM/YYYY'),
      mode: 'date',
      isNgayBanHanhTuPickerVisible: false,
      isNgayBanHanhDenPickerVisible: false,
      isNgayHieuLucTuPickerVisible: false,
      isNgayHieuLucDenPickerVisible: false,
      isDataLoaded: false,
      soVanBan: '',
    };
  }

  fetDmLoaiHHDV() {
    axios.get(`${appConfig.BASE_URL}/GetDmLoaiHHDV`).then((res) => {
      const ls = JSON.parse(JSON.stringify(res.data.Result));
      this.setState({
        lsLoaiHHDV: ls,
      });
      let arr = [];
      ls.map((item) => {
        arr.push(item.TEN_PHAN_LOAI);
      });
      this.setState({
        lsTenLoaiHHDV: arr,
      });
    });
  }

  fetDsMauBieu() {
    axios.get(`${appConfig.BASE_URL}/GetDsMauBieu`).then((res) => {
      const ls = JSON.parse(JSON.stringify(res.data.Result));
      this.setState({
        lsMauBieu: ls,
      });
      let arr = [];
      ls.map((item) => {
        arr.push(item.TEN_MAU_BIEU);
      });
      this.setState({
        lsTenMauBieu: arr,
      });
    });
  }

  fetDmDonVi() {
    axios.get(`${appConfig.BASE_URL}/GetDmDonVi`).then((res) => {
      const ls = JSON.parse(JSON.stringify(res.data.Result));
      this.setState({
        lsDonVi: ls,
      });
      let arr = [];
      ls.map((item) => {
        arr.push(item.TEN_DON_VI);
      });
      this.setState({
        lsTenDonVi: arr,
      });
    });
  }

  fetData() {
    let url = `${appConfig.BASE_URL}/GetBaoCaoTraCuuGiaHHDVNhaNuocDinhGia?congkhai=&loaiHHDV=${this.state.selectedLoaiHHDVId}&ngayBanHanhTu=${this.state.ngayBanHanhTu}&ngayBanHanhDen=${this.state.ngayBanHanhDen}&mauBieuId=${this.state.selectedMauBieuId}&thoiHanHieuLucTu=${this.state.ngayHieuLucTu}&thoiHanHieuLucDen=${this.state.ngayHieuLucDen}&soVanBan=${this.state.soVanBan}&coQuanBanHanhId=${this.state.selectedDonViId}`;
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
    this.fetDmLoaiHHDV();
    this.fetDsMauBieu();
    this.fetDmDonVi();
    // this.setState({
    //   startDate: Moment(this.state.startDate.toLocaleString()).format('DD/MM/YYYY'),
    // });
    // this.setState({
    //   endDateDate: Moment(this.state.startDate.toLocaleString()).format('DD/MM/YYYY'),
    // });
    // console.log(this.state.startDate);
    // console.log(this.state.endDate);
  }

  showNgayBanHanhTuPicker = () => {
    //setDatePickerVisibility(true);
    this.setState({ isNgayBanHanhTuPickerVisible: true });
  };

  hideNgayBanHanhTuPicker = () => {
    //setDatePickerVisibility(false);
    this.setState({ isNgayBanHanhTuPickerVisible: false });
  };

  showNgayBanHanhDenPicker = () => {
    //setDatePickerVisibility(true);
    this.setState({ isNgayBanHanhDenPickerVisible: true });
  };

  hideNgayBanHanhDenPicker = () => {
    //setDatePickerVisibility(false);
    this.setState({ isNgayBanHanhDenPickerVisible: false });
  };

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

  handleNgayBanHanhTuConfirm = (date) => {
    this.setState({ ngayBanHanhTu: Moment(date).format('DD/MM/YYYY') });
    this.hideNgayBanHanhTuPicker();
  };

  handleNgayBanHanhDenConfirm = (date) => {
    this.setState({ ngayBanHanhDen: Moment(date).format('DD/MM/YYYY') });
    this.hideNgayBanHanhDenPicker();
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
    let loaiHHDVId = this.state.selectedLoaiHHDVId;
    let ngayBanHanhTu = this.state.ngayBanHanhTu;
    let ngayBanHanhDen = this.state.ngayBanHanhDen;
    let thoiHanHieuLucTu = this.state.ngayHieuLucTu;
    let thoiHanHieuLucDen = this.state.ngayHieuLucDen;
    let mauBieuId = this.state.selectedMauBieuId;
    let soVanBan = this.state.soVanBan;
    let coQuanBanHanhId = this.state.selectedDonViId;

    console.log(
      `${loaiHHDVId},${ngayBanHanhTu},${ngayBanHanhDen},${thoiHanHieuLucTu},${thoiHanHieuLucTu},${thoiHanHieuLucDen},${mauBieuId},${soVanBan},${coQuanBanHanhId}`
    );
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
  onSelectedLoaiHHDV(index) {
    if (index >= 0) {
      let selected = this.state.lsLoaiHHDV[index];

      if (selected) this.setState({ selectedLoaiHHDVId: selected.PHAN_LOAI_ID });
    }
  }

  onSelectedMauBieu(index) {
    if (index >= 0) {
      let selected = this.state.lsMauBieu[index];
      selected && this.setState({ selectedMauBieuId: selected.MAU_BIEU_ID });
    }
  }

  onSelectedDonVi(index) {
    if (index >= 0) {
      let selected = this.state.lsDonVi[index];
      selected && this.setState({ selectedDonViId: selected.DON_VI_ID });
    }
  }

  renderForm = () => {
    return (
      <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block>
            <Text style={styles.textLabel}>Loại Hàng hóa dịch vụ</Text>
          </Block>
          <Block style={{ paddingVertical: theme.SIZES.BASE }}>
            <Select
              defaultIndex={-1}
              defaultValue={'- Chọn -'}
              options={this.state.lsTenLoaiHHDV}
              onSelect={(index, value) => {
                this.onSelectedLoaiHHDV(index);
              }}
            />
          </Block>
        </Block>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block>
            <Text style={styles.textLabel}>Tên biểu mẫu</Text>
          </Block>
          <Block style={{ paddingVertical: theme.SIZES.BASE }}>
            <Select
              defaultIndex={-1}
              defaultValue={'- Chọn -'}
              options={this.state.lsTenMauBieu}
              onSelect={(index, value) => {
                this.onSelectedMauBieu(index);
              }}
            />
          </Block>
        </Block>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block>
            <Text style={styles.textLabel}>Số văn bản pháp luật</Text>
          </Block>
          <Block>
            <Input
              primary={this.state.primaryFocus}
              right
              placeholder=""
              onFocus={() => this.setState({ primaryFocus: true })}
              onBlur={() => this.setState({ primaryFocus: false })}
              iconContent={<Block />}
              shadowless
              onChangeText={(text) => this.setState({ soVanBan: text })}
            />
          </Block>
        </Block>

        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block>
            <Text style={styles.textLabel}>Cơ quan ban hành</Text>
          </Block>
          <Block style={{ paddingVertical: theme.SIZES.BASE }}>
            <Select
              defaultIndex={-1}
              defaultValue={'- Chọn -'}
              options={this.state.lsTenDonVi}
              onSelect={(index, value) => {
                this.onSelectedDonVi(index);
              }}
            />
          </Block>
        </Block>
        <Block row style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block flex>
            <Block>
              <Text style={styles.textLabel}>Ban hành từ ngày</Text>
            </Block>
            <Block>
              <Button
                textStyle={styles.textButton}
                small
                center
                color="border"
                style={styles.optionsButton}
                onPress={this.showNgayBanHanhTuPicker}
                justifyContent="flex-end"
              >
                {this.state.ngayBanHanhTu}
              </Button>
            </Block>
          </Block>
          <Block flex>
            <Text style={styles.textLabel}>Đến ngày</Text>

            <Block>
              <Button
                textStyle={styles.textButton}
                small
                center
                color="border"
                style={styles.optionsButton}
                onPress={this.showNgayBanHanhDenPicker}
              >
                {this.state.ngayBanHanhDen}
              </Button>
            </Block>
            <DateTimePickerModal
              isVisible={this.state.isNgayBanHanhTuPickerVisible}
              mode="date"
              onConfirm={this.handleNgayBanHanhTuConfirm}
              onCancel={this.hideNgayBanHanhTuPicker}
            />
            <DateTimePickerModal
              isVisible={this.state.isNgayBanHanhDenPickerVisible}
              mode="date"
              onConfirm={this.handleNgayBanHanhDenConfirm}
              onCancel={this.hideNgayBanHanhDenPicker}
            />
          </Block>
        </Block>
        <Block row style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block flex>
            <Block>
              <Text style={styles.textLabel}>Hiệu lực từ ngày</Text>
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
          </Block>
          <Block flex>
            <Text style={styles.textLabel}>Đến ngày</Text>
            <Block>
              <Button
                textStyle={styles.textButton}
                small
                center
                color="border"
                style={styles.optionsButton}
                onPress={this.showNgayHieuLucDenPicker}
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
            <DateTimePickerModal
              isVisible={this.state.isNgayHieuLucDenPickerVisible}
              mode="date"
              onConfirm={this.handleNgayHieuLucDenConfirm}
              onCancel={this.hideNgayHieuLucDenPicker}
            />
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
              <CardGiaHHDVNhaNuocDinhGia
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
});

export default TraCuuGiaHHDVNhaNuocDinhGia;
