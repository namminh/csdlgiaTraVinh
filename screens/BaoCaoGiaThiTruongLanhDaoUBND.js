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
import { Card, CardBaoCaoGiaThiTruongLanhDaoUBND } from '../components';

import axios from 'axios';

const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

class BaoCaoGiaThiTruongLanhDaoUBND extends React.Component {
  constructor(props) {
    super(props);
    const year = new Date().getFullYear();
    this.years = Array.from(new Array(20), (val, index) => year - index);
    this.state = {
      checkSelected: [],
      lsDiaBan: [],
      lsTenDiaBan: [],
      selectedDiaBanId: null,
      lsKyDuLieu: [],
      lsTenKyDuLieu: [],
      lsKyDuLieuChiTiet: [],
      lsTenKyDuLieuChiTiet: [],
      lsChiTiet1: [],
      lsTenChiTiet1: [],
      lsChiTiet2: [],
      lsTenChiTiet2: [],
      lsNam: this.years,
      isSelectedKyDuLieu: false,
      isShowChiTiet1: false,
      isShowChiTiet2: false,
      kyDuLieuSel: 0,
      selectedDinhKyId: null,
      selectedDinhKyChiTiet1Id: null,
      selectedDinhKyChiTiet2Id: null,
      selectedNam: null,
      isDataLoaded: false,
      lsData: [],
    };
  }

  toggleSwitch = (switchId) => this.setState({ [switchId]: !this.state[switchId] });

  fetDmDiaBan() {
    axios.get(`http://113.160.48.98:8790/mwebapi/getdmdiaban`).then((res) => {
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

  fetDmKyDuLieu() {
    axios.get(`http://113.160.48.98:8790/mwebapi/GetDmKyDuLieu`).then((res) => {
      const json = JSON.parse(JSON.stringify(res.data.Result));

      this.setState({
        lsKyDuLieu: json,
      });
      let arr = [];

      json.map((item) => {
        arr.push(item.TEN_DINH_KY);
      });

      this.setState({
        lsTenKyDuLieu: arr,
      });
    });
  }
  fetDmKyDuLieuChiTiet() {
    axios.get(`http://113.160.48.98:8790/mwebapi/GetDmKyDuLieuChiTiet`).then((res) => {
      const json = JSON.parse(JSON.stringify(res.data.Result));
      this.setState({
        lsKyDuLieuChiTiet: json,
      });
      let arr = [];

      json.map((item) => {
        arr.push(item.TEN_DINH_KY_CHI_TIET);
      });

      this.setState({
        lsTenKyDuLieuChiTiet: arr,
      });
    });
  }

  async fetData() {
    //let url = `http://113.160.48.98:8790/mwebapi/GetBaoCaoGiaThiTruongLanhDaoUBND?DIA_BAN_ID=10843&KY_DU_LIEU_ID=24&KY_DU_LIEU_CHI_TIET_1_ID=37&KY_DU_LIEU_CHI_TIET_2_ID=&NAM=2022`;
    let url = `http://113.160.48.98:8790/mwebapi/GetBaoCaoGiaThiTruongLanhDaoUBND?DIA_BAN_ID=${
      this.state.selectedDiaBanId ?? ''
    }&KY_DU_LIEU_ID=${this.state.selectedDinhKyId ?? ''}&KY_DU_LIEU_CHI_TIET_1_ID=${
      this.state.selectedDinhKyChiTiet1Id ?? ''
    }&KY_DU_LIEU_CHI_TIET_2_ID=${this.state.selectedDinhKyChiTiet2Id ?? ''}&NAM=${
      this.state.selectedNam ?? ''
    }`;
    console.log(url);
    axios.get(url).then((res) => {
      const ls = JSON.parse(JSON.stringify(res.data.Result));
      var count = Object.keys(ls).length;
      if (count === 0) this.showToast('Không tìm thấy dữ liệu phù hợp');
      setTimeout(() => {
        this.setState({
          lsData: ls,
        });
      }, 2000);
    });
  }

  onSelectedDiaBan(index) {
    if (index >= 0) {
      let selected = this.state.lsDiaBan[index];
      selected && this.setState({ selectedDiaBanId: selected.DIA_BAN_ID });
    }
  }
  onSelectedKyDuLieu(index) {
    if (index >= 0) {
      let dinhKyId = this.state.lsKyDuLieu[index].DINH_KY_ID;
      //console.log(dinhKyId);
      this.setState({ selectedDinhKyId: dinhKyId });
      if (dinhKyId === 27) {
        this.setState({ isShowChiTiet1: false });
      } else {
        this.setState({ isShowChiTiet1: true });
      }
      if (dinhKyId === 19 || dinhKyId === 22 || dinhKyId === 26) {
        this.setState({ isShowChiTiet2: true });
      } else {
        this.setState({ isShowChiTiet2: false });
      }
      //console.log(this.state.lsKyDuLieuChiTiet);
      let name1 = [],
        ls1 = [];
      if (dinhKyId === 19 || dinhKyId === 22 || dinhKyId === 24 || dinhKyId === 26) {
        this.setState({ lsChiTiet1: [] });
        this.setState({ lsTenChiTiet1: [] });

        this.state.lsKyDuLieuChiTiet.map(function (item) {
          //console.log(item);
          if (item.DINH_KY_ID === 24) {
            name1.push(item.TEN_DINH_KY_CHI_TIET);
            ls1.push(item);
          }
        });
      } else {
        this.setState({ lsChiTiet1: [] });
        this.setState({ lsTenChiTiet1: [] });

        this.state.lsKyDuLieuChiTiet.map(function (item) {
          //console.log(item);
          if (item.DINH_KY_ID === dinhKyId) {
            //console.log(item);
            name1.push(item.TEN_DINH_KY_CHI_TIET);
            ls1.push(item);
          }
        });
      }
      //console.log(name1);

      this.setState({ lsChiTiet1: ls1 });
      this.setState({ lsTenChiTiet1: name1 });

      this.setState({ isSelectedKyDuLieu: true });
      let selected = this.state.lsKyDuLieu[index];
      selected && this.setState({ selectedDinhKyId: selected.DINH_KY_ID });
    } else {
      this.setState({ isSelectedKyDuLieu: false });
      this.setState({ selectedDinhKyId: -1 });
    }
  }

  onSelectedKyChiTiet1(index) {
    let sel = this.state.lsChiTiet1[index];
    //console.log(sel);
    let dinhKyChiTiet1Id = sel.DINH_KY_CHI_TIET_ID;
    //console.log(dinhKyChiTiet1Id);
    this.setState({ selectedDinhKyChiTiet1Id: dinhKyChiTiet1Id });
    //console.log(this.state.selectedDinhKyId);
    let dinhKyId = this.state.selectedDinhKyId;
    //console.log(dinhKyId);
    let name2 = [],
      ls2 = [];
    //var count = Object.keys(this.state.lsKyDuLieuChiTiet).length;
    //console.log(count);
    this.state.lsKyDuLieuChiTiet.map(function (item) {
      if (item.DINH_KY_ID === dinhKyId && item.CHA_ID === dinhKyChiTiet1Id) {
        name2.push(item.TEN_DINH_KY_CHI_TIET);
        ls2.push(item);
      }
    });
    //console.log(ls2);
    this.setState({ lsChiTiet2: ls2 });
    this.setState({ lsTenChiTiet2: name2 });
  }

  onSelectedNam(value) {
    this.setState({ selectedNam: value });
  }

  showSearchResult = () => {
    //console.log('Xem bao cao');
    let DIA_BAN_ID = this.state.selectedDiaBanId;
    let KY_DU_LIEU_ID = this.state.selectedDinhKyId;
    let KY_DU_LIEU_CHI_TIET_1_ID = this.state.selectedDinhKyChiTiet1Id;
    let KY_DU_LIEU_CHI_TIET_2_ID = this.state.selectedDinhKyChiTiet2Id;
    let NAM = this.state.selectedNam;
    console.log(
      `${DIA_BAN_ID},${KY_DU_LIEU_ID},${KY_DU_LIEU_CHI_TIET_1_ID},${KY_DU_LIEU_CHI_TIET_2_ID},${NAM}`
    );
    if (!DIA_BAN_ID) {
      this.showToast('Bạn phải chọn Quận/Huyện');
      return;
    }
    if (!KY_DU_LIEU_ID) {
      this.showToast('Bạn phải chọn Kỳ dữ liệu');
      return;
    }
    if (KY_DU_LIEU_ID && !KY_DU_LIEU_CHI_TIET_1_ID) {
      this.showToast('Bạn phải chọn Kỳ dữ liệu chi tiết');
      return;
    }
    if (!NAM) {
      this.showToast('Bạn phải chọn Năm');
      return;
    }
    this.setState({ isDataLoaded: false });
    this.fetData();
    this.setState({ isDataLoaded: true });
    var ret = this.state.lsData;
    if (!ret || Object.keys(ret).length <= 0) {
      this.showToast('Không tìm thấy dữ liệu phù hợp');
    } //console.log(this.state.lsData.slice(0, 10));
  };

  componentDidMount() {
    this.fetDmDiaBan();
    this.fetDmKyDuLieu();
    this.fetDmKyDuLieuChiTiet();
  }
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
  renderSearchResult = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
        <Block flex style={{ paddingHorizontal: theme.SIZES.BASE }}>
          {this.state.lsData.slice(0, 10).map((item, index) => {
            //console.log(this.state.lsData.slice(0, 2));
            return (
              <CardBaoCaoGiaThiTruongLanhDaoUBND
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
    //var headers = new Headers();
    //headers.append('X-CSCAPI-KEY', 'API_KEY');

    return (
      <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text style={{ fontFamily: 'montserrat-regular' }} muted>
            Quận/Huyện
          </Text>
          <Block style={{ marginTop: 8 }}>
            {/* <Select defaultIndex={1} options={['Tỉnh Nam Định', 'Huyện Hải Hậu']} /> */}
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
          <Text style={{ fontFamily: 'montserrat-regular', marginTop: theme.SIZES.BASE }} muted>
            Kỳ dữ liệu
          </Text>
          <Block style={{ flex: 1, marginTop: 8 }}>
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
        {this.state.isShowChiTiet1 && (
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Text style={{ fontFamily: 'montserrat-regular', marginTop: theme.SIZES.BASE }} muted>
              Tháng
            </Text>
            <Block style={{ flex: 1, marginTop: 8 }}>
              <Select
                defaultIndex={-1}
                defaultValue={'- Chọn -'}
                options={this.state.lsTenChiTiet1}
                onSelect={(index, value) => {
                  this.onSelectedKyChiTiet1(index);
                }}
                ref="selKyChiTiet1"
              />
            </Block>
          </Block>
        )}
        {this.state.isShowChiTiet2 && (
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Text style={{ fontFamily: 'montserrat-regular', marginTop: theme.SIZES.BASE }} muted>
              Ngày
            </Text>
            <Block style={{ flex: 1, marginTop: 8 }}>
              <Select
                defaultValue={'- Chọn -'}
                defaultIndex={-1}
                options={this.state.lsTenChiTiet2}
              />
            </Block>
          </Block>
        )}
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text style={{ fontFamily: 'montserrat-regular', marginTop: theme.SIZES.BASE }} muted>
            Năm
          </Text>
          <Block style={{ flex: 1, marginTop: 8 }}>
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
              color="active"
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
    color: nowTheme.COLORS.PRIMARY,
    textAlign: 'center',
    fontFamily: 'montserrat-bold',
    fontSize: 18,
  },
});

export default BaoCaoGiaThiTruongLanhDaoUBND;
