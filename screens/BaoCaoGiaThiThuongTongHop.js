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
import { CardBaoCaoGiaThiThuongTongHop } from '../components';

import axios from 'axios';

import { appConfig } from "../constants";

const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

class BaoCaoGiaThiThuongTongHop extends React.Component {
  constructor(props) {
    super(props);
    const year = new Date().getFullYear();
    this.years = Array.from(new Array(20), (val, index) => year - index);

    this.state = {
      checkSelected: [],
      lsNhomHHDV: [],
      lsTenNhomHHDV: [],
      selectedNhomHHDVId: -1,
      lsDiaBan: [],
      lsTenDiaBan: [],
      selectedDiaBanId: null,
      lsLoaiGia: [],
      lsTenLoaiGia: [],
      selectedLoaiGiaId: -1,
      lsKyDuLieu: [],
      lsTenKyDuLieu: this.lsTenKyDuLieu,
      selectedKyDuLieuId: -1,
      lsNam: this.years,
      maHHDV: '',
      selectedNam: null,
      isDataLoaded: false,
      lsData: [],
    };
  }

  fetNhomHHDV() {
    axios.get(`${appConfig.BASE_URL}/GetDmNhomHangHoa142`).then((res) => {
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

  fetDmDiaBan() {
    axios.get(`${appConfig.BASE_URL}/getdmdiaban`).then((res) => {
      const json = JSON.parse(JSON.stringify(res.data.Result));
      this.setState({
        lsDiaBan: json,
      });
      let arr = [];

      json.map((item) => {
        arr.push(item.TEN_DIA_BAN);
      });

      this.setState({
        lsTenDiaBan: arr,
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

  fetDmKyDuLieu() {
    // axios.get(`${appConfig.BASE_URL}/GetDmKyDuLieu`).then((res) => {
    //   const json = JSON.parse(JSON.stringify(res.data.Result));

    //   this.setState({
    //     lsKyDuLieu: json,
    //   });
    //   let arr = [];

    //   json.map((item) => {
    //     arr.push(item.TEN_DINH_KY);
    //   });

    //   this.setState({
    //     lsTenKyDuLieu: arr,
    //   });
    // });

    const lsTenKyDuLieu = [
      'Qúy 1',
      'Qúy 2',
      'Qúy 3',
      'Qúy 4',
      '6 tháng đầu năm',
      '6 tháng cuối năm',
      '9 tháng đầu năm',
      'Cả năm',
    ];
    this.setState({ lsTenKyDuLieu: lsTenKyDuLieu });
  }

  fetData() {
    let url = `${appConfig.BASE_URL}/GetBaoCaoGiaThiTruongTongHop?LOAI_GIA_ID=${this.state.selectedLoaiGiaId}&SAN_PHAM_ID=&NHOM_HANG_HOA_ID=${this.state.selectedNhomHHDVId}&DIA_BAN_ID=${this.state.selectedDiaBanId}&KY_DU_LIEU_ID=&KY_DU_LIEU_CHI_TIET_1_ID=${this.state.selectedKyDuLieuId}&KY_DU_LIEU_CHI_TIET_2_ID=&NAM=${this.state.selectedNam}&MaHHDV=${this.state.maHHDV}`;
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
    this.fetNhomHHDV();
    this.fetDmDiaBan();
    this.fetDmLoaiGia();
    this.fetDmKyDuLieu();
  }

  onSelectedNhomHHDV(index) {
    if (index >= 0) {
      let selected = this.state.lsNhomHHDV[index];

      if (selected) this.setState({ selectedNhomHHDVId: selected.NHOM_HANG_HOA_ID });
    }
  }

  onSelectedDiaBan(index) {
    if (index >= 0) {
      let selected = this.state.lsDiaBan[index];
      selected && this.setState({ selectedDiaBanId: selected.DIA_BAN_ID });
    }
  }

  onSelectedLoaiGia(index) {
    if (index >= 0) {
      let selected = this.state.lsLoaiGia[index];
      selected && this.setState({ selectedLoaiGiaId: selected.LOAI_GIA_ID });
    }
  }

  onSelectedKyDuLieu(index) {
    if (index >= 0) {
      // let selected = this.state.lsKyDuLieu[index];
      // selected && this.setState({ selectedDinhKyId: selected.DINH_KY_ID });
      this.setState({ selectedKyDuLieuId: ++index });
    }
  }

  onSelectedNam(value) {
    this.setState({ selectedNam: value });
  }

  showSearchResult = () => {
    let maHHDV = this.state.maHHDV;
    let nhomHHDVId = this.state.selectedNhomHHDVId;
    let diaBanId = this.state.selectedDiaBanId;
    let loaiGiaId = this.state.selectedLoaiGiaId;
    let kyDuLieuId = this.state.selectedKyDuLieuId;
    let nam = this.state.selectedNam;

    console.log(`${maHHDV},${nhomHHDVId},${diaBanId},${loaiGiaId},${kyDuLieuId},${nam}`);
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
            <Text style={styles.textLabel}>Mã hàng hóa dịch vụ</Text>
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
              onChangeText={(text) => this.setState({ maHHDV: text })}
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
            <Text style={styles.textLabel}>Quận/Huyện</Text>
          </Block>
          <Block style={{ paddingVertical: theme.SIZES.BASE }}>
            <Select
              defaultIndex={-1}
              defaultValue={'- Chọn -'}
              options={this.state.lsTenDiaBan}
              onSelect={(index, value) => {
                this.onSelectedDiaBan(index);
              }}
            />
          </Block>
        </Block>

        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block>
            <Text style={styles.textLabel}>Loại giá</Text>
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
          <Text style={styles.textLabel}>Kỳ dữ liệu</Text>
          <Block style={{ paddingVertical: theme.SIZES.BASE }}>
            <Select
              defaultIndex={-1}
              defaultValue={'- Chọn -'}
              options={this.state.lsTenKyDuLieu}
              onSelect={(index, value) => {
                this.onSelectedKyDuLieu(index);
              }}
            />
          </Block>
        </Block>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text style={styles.textLabel}>Năm</Text>
          <Block style={{ paddingVertical: theme.SIZES.BASE }}>
            <Select
              defaultIndex={-1}
              defaultValue={'- Chọn -'}
              options={this.years}
              onSelect={(index, value) => {
                this.setState({ selectedNam: value });
              }}
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
              <CardBaoCaoGiaThiThuongTongHop
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

export default BaoCaoGiaThiThuongTongHop;
