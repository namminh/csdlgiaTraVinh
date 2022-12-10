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
import { CardTruyvangiadat } from '../components';

import axios from 'axios';
//import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import { appConfig } from "../constants";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

class Truyvangiadat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkSelected: [],
     
      UrlInfo: [],
      lsMa: [],
      MaPhuongXa: [],
      MaDoanDuong: [],
      MaDuongPho: [],
      lsMaDiaBan: [],
      lsTenMaDiaBan: [],
      selectedMaId: null,

      lsDuongPho: [],
      lsMaDuongPho: [],
      lsTenMaDuongPho: [],
      selectedDuongPhoId: null,

      lsDoanDuong: [],
      lsMaDoanDuong: [],
      lsTenMaDoanDuong: [],
      selectedDoanDuongId: null,

      lsDiaBan: [],
      lsTenDiaBan: [],
      selectedDiaBanId: null,

      lsPhuongXa: [],
      lsTenPhuongXa: [],
      lsMaPhuongXa: [],
      selectedPhuongXaId: null,
      lsViTri: [],
      lsTenViTri: [],
      selectedViTri: null,
      lsKhuVuc: [],
      lsTenKhuVuc: [],
      
      selectedKhuVuc: null,

      lsLoaiDat: [],
      lsTenLoaiDat: [],
      
      selectedLoaiDat: null,

      lsData: [],
      ngayBanHanhTu: Moment(new Date()).format('DD/MM/YYYY'),
      ngayHieuLucTu: Moment(new Date()).format('DD/MM/YYYY'),
      ngayHieuLucDen: Moment(new Date()).format('DD/MM/YYYY'),
      mode: 'date',
      isNgayBanHanhTuPickerVisible: false,
      isNgayHieuLucTuPickerVisible: false,
      isNgayHieuLucDenPickerVisible: false,
      isDataLoaded: false,
      soVanBan: '',
      giadattu: '',
      giadatden: '',
    };
  }

  
  fetDmDiaBan() {
    
    
    axios.get(`${this.state.UrlInfo}/mwebapi/GetDMQuanHuyen`).then((res) => {
      const json = JSON.parse(JSON.stringify(res.data.Result));
      this.setState({
        lsDiaBan: json,
      });
      let arr = [];
      let ma = [];

      json.map((item) => {
        arr.push(item.TEN_DIA_BAN);
        ma.push(item.MA);
      });

      this.setState({
        lsTenDiaBan: arr,
        lsTenMaDiaBan: ma,
      });
    });
    console.log(`NAMNM01 in Url ${this.state.UrlInfo}`);
   
  }

  fetDmPhuongXa() {
    
    console.log(`NAMNM02 in  ${this.state.lsMa}`);
    
    axios.get(`${this.state.UrlInfo}/mwebapi/GetDMPhuongXa?maHuyen=${this.state.lsMa}`).then((res) => {
      const json = JSON.parse(JSON.stringify(res.data.Result));
      this.setState({
        lsPhuongXa: json,
      });
      let ten = [];
      let ma = [];

      json.map((item) => {
        ten.push(item.TEN_DIA_BAN);
        ma.push(item.DIA_BAN_ID);
      });

      this.setState({
        lsTenPhuongXa: ten,
        lsMaPhuongXa: ma,
      });
      
    });
    
  }

  fetDmDuongPho() {
    console.log(`NAMNM03 in  ${this.state.MaPhuongXa}`);
    console.log(`${this.state.UrlInfo}/mwebapi/GetDmDuongPhoByPhuongXa?phuongxaid=${this.state.MaPhuongXa}`);
    axios.get(`${this.state.UrlInfo}/mwebapi/GetDmDuongPhoByPhuongXa?phuongxaid=${this.state.MaPhuongXa}`).then((res) => {
      const json = JSON.parse(JSON.stringify(res.data.Result));
      this.setState({
        lsDuongPho: json,
      });
      let ten = [];
      let ma = [];

      json.map((item) => {
        ten.push(item.TEN_DUONG);
        ma.push(item.DUONG_PHO_ID);
      });

      this.setState({
        lsTenMaDuongPho: ten,
        lsMaDuongPho: ma,
      });
    });
    
  }

  fetDmDoanDuong() {
    
    console.log(`NAMNM04 in  ${this.state.MaDuongPho}`);
    axios.get(`${this.state.UrlInfo}mwebapi/GetDmDoanDuongByDuongPho?duongphoid=${this.state.MaDuongPho}`).then((res) => {
      const json = JSON.parse(JSON.stringify(res.data.Result));
      this.setState({
        lsDoanDuong: json,
      });
      let ten = [];
      let ma = [];

      json.map((item) => {
        ten.push(item.TEN_DIA_BAN);
        ma.push(item.DIA_BAN_ID);
      });

      this.setState({
        lsTenMaDoanDuong: ten,
        lsMaDoanDuong: ma,
      });
    });
    
  }

  fetDmViTri() {
  

    console.log(`NAMNM02 in  ${this.state.lsMa}`);
    axios.get(`${this.state.UrlInfo}/mwebapi/GetDMViTri?maHuyen=${this.state.lsMa}`).then((res) => {
      const json = JSON.parse(JSON.stringify(res.data.Result));
      this.setState({
        lsViTri: json,
      });
      let arr = [];

      json.map((item) => {
        arr.push(item.TEN_VI_TRI);
      });

      this.setState({
        lsTenViTri: arr,
      });
    });
  }

  fetDmKhuVuc() {
  
    console.log(`NAMNM02 in  ${this.state.lsMa}`);
    axios.get(`${this.state.UrlInfo}/mwebapi/GetDMKhuVuc?maHuyen=${this.state.lsMa}`).then((res) => {
      const json = JSON.parse(JSON.stringify(res.data.Result));
      this.setState({
        lsKhuVuc: json,
      });
      let arr = [];

      json.map((item) => {
        arr.push(item.TEN_KHU_VUC);
      });

      this.setState({
        lsTenKhuVuc: arr,
      });
    });
    
  }
  fetDmLoatDat() {
  
    
    axios.get(`${this.state.UrlInfo}/mwebapi/GetDMLoaiDat`).then((res) => {
      const json = JSON.parse(JSON.stringify(res.data.Result));
      this.setState({
        lsLoaiDat: json,
      });
      let arr = [];

      json.map((item) => {
        arr.push(item.TEN_LOAI_DAT);
      });

      this.setState({
        lsTenLoaiDat: arr,
      });
    });
    
  }

  fetData() {
    
    let url = `${this.state.UrlInfo}/mwebapi/GetGiaDat?QUAN_HUYEN_ID=${this.state.lsMa}&PHUONG_XA_ID=${this.state.MaPhuongXa}&KHU_VUC_ID=&VI_TRI_ID=&DUONG_PHO_ID=${this.state.MaDuongPho}&DOAN_DUONG_TU_ID=&DOAN_DUONG_DEN_ID=&LOAI_DAT_ID=&SO_VAN_BAN=&NGAY_BAN_HANH=&HIEU_LUC_TU_NGAY=&HIEU_LUC_DEN_NGAY=&GIA_DAT_TU=&GIA_DAT_DEN=`;
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

  async componentDidMount() {
    try {

      const diachi = await AsyncStorage.getItem("Dia_chi_Url");
      

      
      
      this.setState({
        UrlInfo: diachi,
      });
      console.log(`truy van gia dat Url ${this.state.UrlInfo}`);
    } catch (e) {
      
      console.log(`is logged in error ${e}`);
    }
    
    this.fetDmDiaBan();
    
    this.fetDmViTri();
    this.fetDmKhuVuc();
    this.fetDmLoatDat();
   
  }

  showNgayBanHanhTuPicker = () => {
    //setDatePickerVisibility(true);
    this.setState({ isNgayBanHanhTuPickerVisible: true });
  };

  hideNgayBanHanhTuPicker = () => {
    //setDatePickerVisibility(false);
    this.setState({ isNgayBanHanhTuPickerVisible: false });
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

  

  handleNgayHieuLucTuConfirm = (date) => {
    this.setState({ ngayHieuLucTu: Moment(date).format('DD/MM/YYYY') });
    this.hideNgayHieuLucTuPicker();
  };

  handleNgayHieuLucDenConfirm = (date) => {
    this.setState({ ngayHieuLucDen: Moment(date).format('DD/MM/YYYY') });
    this.hideNgayHieuLucDenPicker();
  };

  showSearchResult = () => {
    let quanhuyen = this.state.lsDiaBan;
    
   
    console.log(
      `${quanhuyen}`
    );
    if (!quanhuyen === -1) {
      this.showToast('Bạn phải chọn Quận/Huyện');
      return;
    }

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
  
 
  onSelectedDiaBan(index) {
    if (index >= 0) {
      let selected = this.state.lsDiaBan[index];
     

      selected && this.setState({ selectedDiaBanId: selected.DIA_BAN_ID });
      let Temp_db = this.state.lsTenMaDiaBan[index];
      this.setState({
        lsMa: Temp_db,
      });
      this.fetDmPhuongXa();
      console.log(`maHuyen ${this.state.lsMa}`);
    }
  }
  onSelectedPhuongXa(index) {
    if (index >= 0) {
      let selected = this.state.lsPhuongXa[index];
      console.log(`this.state.lsTenPhuongXa[index] ${this.state.lsTenPhuongXa[index]}`);
      selected && this.setState({ selectedPhuongXaId: selected.DIA_BAN_ID });
      let Temp_db = this.state.lsMaPhuongXa[index];
      this.setState({
        MaPhuongXa: Temp_db,
      });
      this.fetDmDuongPho();
      console.log(`maPhuongXa ${this.state.MaPhuongXa}`);
    }
  }

  onSelectedDuongPho(index) {
    if (index >= 0) {
      let selected = this.state.lsDuongPho[index];
      console.log(`this.state.lsDuongPho ${this.state.lsDuongPho}`);
      selected && this.setState({ selectedDuongPhoId: selected.DUONG_PHO_ID });
      let Temp_db = this.state.lsMaDuongPho[index];
      this.setState({
        MaDuongPho: Temp_db,
      });
      this.fetDmDoanDuong();
      console.log(`maDuongPho ${this.state.MaDuongPho}`);
    }
  }

  onSelectedDoanDuong(index) {
    if (index >= 0) {
      let selected = this.state.lsDoanDuong[index];
      selected && this.setState({ selectedDoanDuongId: selected.DIA_BAN_ID });
    }
  }
  onSelectedViTri(index) {
    if (index >= 0) {
      let selected = this.state.lsViTri[index];
      selected && this.setState({ selectedViTri: selected.TEN_VI_TRI });
    }
  }
  onSelectedKhuVuc(index) {
    if (index >= 0) {
      let selected = this.state.lsKhuVuc[index];
      selected && this.setState({ selectedKhuVuc: selected.TEN_KHU_VUC });
    }
  }
  onSelectedLoaiDat(index) {
    if (index >= 0) {
      let selected = this.state.lsLoaiDat[index];
      selected && this.setState({ selectedLoaiDat: selected.TEN_LOAI_DAT });
    }
  }

  renderForm = () => {
    return (
      <Block flex style={styles.group}>
       <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text style={ styles.textLabel } >
            Quận/Huyện
          </Text>
          <Block style={{ marginTop: 8 }}>
            {/* <Select defaultIndex={1} options={['Tỉnh Nam Định', 'Huyện Hải Hậu']} /> */}
            <Select
              defaultIndex={-1}
              defaultValue={'Tất cả'}
              options={this.state.lsTenDiaBan}
              onSelect={(index, value) => {
                this.onSelectedDiaBan(index);
               
              }}
              
            />
          </Block>
        </Block>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text style={ styles.textLabel } >
            Phường/Xã
          </Text>
          <Block style={{ marginTop: 8 }}>
            {/* <Select defaultIndex={1} options={['Tỉnh Nam Định', 'Huyện Hải Hậu']} /> */}
            <Select
              defaultIndex={-1}
              defaultValue={'Tất cả'}
              options={this.state.lsTenPhuongXa}
              onSelect={(index, value) => {
                this.onSelectedPhuongXa(index);
              }}
            />
          </Block>
        </Block>      
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text style={ styles.textLabel } >
            Đường/Phố
          </Text>
          <Block style={{ marginTop: 8 }}>
            {/* <Select defaultIndex={1} options={['Tỉnh Nam Định', 'Huyện Hải Hậu']} /> */}
            <Select
              defaultIndex={-1}
              defaultValue={'Tất cả'}
              options={this.state.lsTenMaDuongPho}
              onSelect={(index, value) => {
                this.onSelectedDuongPho(index);
              }}
            />
          </Block>
        </Block>     

        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text style={ styles.textLabel } >
            Đoạn đường
          </Text>
          <Block style={{ marginTop: 8 }}>
            {/* <Select defaultIndex={1} options={['Tỉnh Nam Định', 'Huyện Hải Hậu']} /> */}
            <Select
              defaultIndex={-1}
              defaultValue={'Tất cả'}
              options={this.state.lsTenMaDoanDuong}
              onSelect={(index, value) => {
                this.onSelectedDoanDuong(index);
              }}
            />
          </Block>
        </Block>     
        
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text style={styles.textLabel} >
            Khu vực
          </Text>
          <Block style={{ marginTop: 8  }}>
            <Select
              defaultIndex={-1}
              defaultValue={'Tất cả'}
              options={this.state.lsTenKhuVuc}
              onSelect={(index, value) => {
                this.onSelectedKhuVuc(index);
              }}
            />
          </Block>
        </Block>            
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text style={styles.textLabel} >
            Vị Trí
          </Text>
          <Block style={{ marginTop: 8  }}>
            <Select
              defaultIndex={-1}
              defaultValue={'Tất cả'}
              options={this.state.lsTenViTri}
              onSelect={(index, value) => {
                this.onSelectedViTri(index);
              }}
            />
          </Block>
        </Block>      
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text style={styles.textLabel} >
           Loại Đất
          </Text>
          <Block style={{ marginTop: 8  }}>
            <Select
              defaultIndex={-1}
              defaultValue={'Tất cả'}
              options={this.state.lsTenLoaiDat}
              onSelect={(index, value) => {
                this.onSelectedLoaiDat(index);
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
       
        <Block row style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block flex>
            <Block>
              <Text style={styles.textLabel}>Ngày ban hành</Text>
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
          <DateTimePickerModal
              isVisible={this.state.isNgayBanHanhTuPickerVisible}
              mode="date"
              onConfirm={this.handleNgayBanHanhTuConfirm}
              onCancel={this.hideNgayBanHanhTuPicker}
            />
        </Block>
        <Block row style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block flex>
            <Block>
              <Text style={styles.textLabel}>Thời gian hiệu lực từ:</Text>
            </Block>
            <Block flex>
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
              isVisible={this.state.isNgayHieuLucTuPickerVisible}
              mode="date"
              onConfirm={this.handleNgayHieuLucTuConfirm}
              onCancel={this.hideNgayHieuLucTuPicker}
            />
          </Block>
          <Block flex>
            <Text style={styles.textLabel}>Đến ngày: </Text>
            
            <Block flex>
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
              isVisible={this.state.isNgayHieuLucDenPickerVisible}
              mode="date"
              onConfirm={this.handleNgayHieuLucDenConfirm}
              onCancel={this.hideNgayHieuLucDenPicker}
            />
          </Block>
        </Block>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Text style={styles.textLabel}>Giá đất</Text>
          </Block>
        <Block row style={{ paddingHorizontal: theme.SIZES.BASE }}>
          
          <Block flex>
            <Input
              primary={this.state.primaryFocus}
              right
              placeholder="Từ"
              onFocus={() => this.setState({ primaryFocus: true })}
              onBlur={() => this.setState({ primaryFocus: false })}
              iconContent={<Block />}
              shadowless
              onChangeText={(text) => this.setState({ giadattu: text })}
              
            />
          </Block>
          <Block flex>
            <Input
              primary={this.state.primaryFocus}
              right
              placeholder="Đến"
              onFocus={() => this.setState({ primaryFocus: true })}
              onBlur={() => this.setState({ primaryFocus: false })}
              iconContent={<Block />}
              shadowless
              onChangeText={(text) => this.setState({ giadatden: text })}
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
    console.log(`giadatden ${this.state.giadatden}`);
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
              <CardTruyvangiadat
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

export default Truyvangiadat;
