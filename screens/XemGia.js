import React, { useEffect, useState, Component  } from 'react';
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
import Spinner from "react-native-loading-spinner-overlay";

// Now UI themed components
import { Images, nowTheme, articles, tabs } from '../constants';
import { Button, Select, Icon, Input, Header, Switch } from '../components';

import Img from '../components/Img';
import { CardBaoCaoTongHopGiaTaiSanTDG } from '../components';

import axios from 'axios';
//import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import { appConfig } from "../constants";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import CardXemGia from '../components/CardXemGia';
const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

class XemGia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkSelected: [],
      UrlInfo: [],
      lsData: [],
      Keyword: 'Sở tài chính',
      lstenduong: [],
      mode: 'date',
     
      isDataLoaded: false,
      isDatakey: true,
      isShow: false,
    };
  }
  
  async fetData() {
    //let url = `${this.state.UrlInfo}/mwebapi/GetBaoCaoTongHopGiaTaiSanTDG?ngayHieuLucTu=23/09/2019&ngayHieuLucDen=26/09/2022`;
    
    const timkiem = await AsyncStorage.getItem("Tim_kiem");
   
    console.log(`Keyword ${timkiem}`);
    this.showToast(`Đang tìm ${timkiem}`);
    let url = `${this.state.UrlInfo}/mwebapi/TimGiaDatMobile?keyword=${timkiem}`;
    console.log(url);
    axios.get(url).then((res) => {
      const ls = JSON.parse(JSON.stringify(res.data.Result));
      
      
      this.setState({
        lsData: ls,
      });
      
     
    });
    this.setState({
    
      Keyword: timkiem,
    });
    
  }
 
  async componentDidMount() {
    const diachi = await AsyncStorage.getItem("Dia_chi_Url");
    
    this.setState({
      UrlInfo: diachi,
      
    });
    console.log(`Url ${this.state.UrlInfo}`);

    
    
  // this.showSearchResult();  
 
  this.focusListener = this.props.navigation.addListener('focus',
       () => { 
               console.log('focus is called'); 
               this.showSearchResult();
       }
     );
     this.showSearchResult();
}



showSearchResult = () => {
   
   
    this.setState({ isDataLoaded: false });
    this.fetData();
    this.setState({ isDataLoaded: true });
   
  
    
  };
  showToast = (message) => {
    console.log(message);
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };
  

  renderForm = () => {
    return (
      <Block flex >
        
        <Block style={{ paddingHorizontal: theme.SIZES.BASE, marginTop: 10 }}>
          <Block center>
            <Button
              textStyle={{ fontFamily: 'montserrat-regular', fontSize: 16 }}
              color="info"
              style={styles.button}
              onPress={this.showSearchResult}
            >
              Xem 
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
          <Toast
          isShow={true}
          positionIndicator="top"
          color="warning"
          style={{ top: 0 }}
          textStyle={styles.toastTextStyle}
        >
          {this.showToast}
        </Toast>
        <Spinner visible={false} />
          {/* {this.renderForm()} */}
          {this.state.isDataLoaded && this.renderSearchResult()}
          {/* {this.renderSearchResult()} */}
        </ScrollView>
      </Block>
    );
  }

  renderSearchResult = () => {
   
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
        <Block flex style={{ paddingHorizontal: theme.SIZES.BASE }}>
          {this.state.lsData.map((item, index) => {
            
           
            return (
              <CardXemGia
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

export default XemGia;
