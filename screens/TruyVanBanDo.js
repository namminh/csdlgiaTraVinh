import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  
  ImageBackground,
  ToastAndroid,
  View,
  PermissionsAndroid,
} from 'react-native';

// Galio components
import { Block, Text, Button as GaButton, theme, Toast, NavBar, } from 'galio-framework';
// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
import CardXemGia from '../components/CardXemGia';
import MapboxGL from '@rnmapbox/maps';
MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken('pk.eyJ1IjoiY3NkbCIsImEiOiJjbGJkMGZldWcwaWoyM3FueXYydGM5dG1rIn0.58KbY8drZnJW-pKwqgOOJg');
// Now UI themed components
import { Images, nowTheme, articles, tabs } from '../constants';
import { Button, Select, Icon, Input, Header, Switch } from '../components';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import Img from '../components/Img';
import { CardBaoCaoTongHopGiaTaiSanTDG } from '../components';
import Modal from 'react-native-modal';
import axios from 'axios';
//import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import { appConfig } from "../constants";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
const { width, height  } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;
const ASPECT_RATIO = width / height;
const LATITUDE = 11.578000306113399;
const LONGITUDE = 108.99346725962042;
const LATITUDE_DELTA = 0.00377;
const LONGITUDE_DELTA = 0.0037;
 
class TruyVanBanDo extends React.Component {
  constructor(props) {
    super(props);
    this.sheetRef = React.createRef();
    
    this.state = {
      checkSelected: [],
      UrlInfo: [],
      lsData: [],
      lsResult: [],
     
      lsName: [],
      address: [],
      CountCard: 5,
      Keyword: "",
      visibleModal: null,
      followUserLocation: false,
      isDataLoaded: false,
      isShow: false,
      region: {
        longitude: LONGITUDE,
        latitude: LATITUDE,
        
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
  }
  
  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.textButton}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );
  _renderModalContent = () => (
    <View style={styles.modalContent}>
      
      {this._renderButton('Close', () => this.setState({ visibleModal: null }))}
    </View>
  );

  async fetDataGia() {
    //let url = `${this.state.UrlInfo}/mwebapi/GetBaoCaoTongHopGiaTaiSanTDG?ngayHieuLucTu=23/09/2019&ngayHieuLucDen=26/09/2022`;
    
    // const timkiem = await AsyncStorage.getItem("Tim_kiem");
   
    // console.log(`Keyword ${timkiem}`);
    this.showToast(`Đang tìm ${this.state.Keyword}`);
    let url = `${this.state.UrlInfo}/mwebapi/TimGiaDatMobile?keyword=${this.state.Keyword}`;
    console.log(url);
    axios.get(url).then((res) => {
      const ls = JSON.parse(JSON.stringify(res.data.Result));
       var count = Object.keys(ls).length;
       console.log(count);
      this.setState({
        lsData: ls,
        CountCard: count*150,
      });
      
     
    });
    
    
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

  fetData() {

    // let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${this.state.Keyword}, Ninh Thuận&key=AIzaSyC1-NUMAIV01HQNMAsxXzuekjA00Yqm6Aw`;
    
    let url = `https://rsapi.goong.io/Place/AutoComplete?api_key=3S6utgJppy4E4mmGUs7LJTdPmuj8CIh2y98mYKcA&input=${this.state.Keyword}, Ninh Thuận`;

    console.log(url);
    console.log(this.state.Keyword);

    axios.get(url).then((res) => {
      const ls = JSON.parse(JSON.stringify(res.data.predictions));
      console.log(`Danh sach ${ls}`);
     
      
      let temp = [];
      
      ls.map((item) => {
       
        temp.push(item.place_id);
      });
      this.setState({
        
        place_id: temp[0],
      });

      console.log(`place_id ${this.state.place_id}`);
      let url1 = `https://rsapi.goong.io/Place/Detail?place_id=${temp[0]}&api_key=3S6utgJppy4E4mmGUs7LJTdPmuj8CIh2y98mYKcA`;
      console.log(url1);
      axios.get(url1).then((res) => {
      const ls1 = JSON.stringify(res.data.result);
  
      this.setState({
          region:
          {
            longitude: res.data.result.geometry.location.lng,
            latitude: res.data.result.geometry.location.lat,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
          
          lsName: res.data.result.name,
          isShow: false,
        });
   
      });
      console.log(`lsName ${this.state.lsName}`);
      console.log(`this.state.region ${this.state.region.latitude}`);
      console.log(`this.state.region ${this.state.region.longitude}`);
      console.log(`NAMNM01`);
      
    });

  }
  getDataUser(){
    
      let url = `https://rsapi.goong.io/Geocode?latlng=${this.state.region.latitude}, ${this.state.region.longitude}&api_key=3S6utgJppy4E4mmGUs7LJTdPmuj8CIh2y98mYKcA`;
      
      console.log(url);
      console.log(`this.state.region ${this.state.region.latitude}`);
      console.log(`this.state.region ${this.state.region.longitude}`);
  
      axios.get(url).then((res) => {
        const ls = JSON.parse(JSON.stringify(res.data.results));
        console.log(`Danh sach latlng ${ls}`);
       
        
        let temp = [];
        let temp1 = [];
        
        ls.map((item) => {
         
          temp.push(item.name);
          temp1.push(item.address);
        });
        this.setState({
          Keyword: temp[0],
          lsName: temp[0],
          address: temp1[0],
        });
        AsyncStorage.setItem("Tim_kiem", this.state.lsName);
        this.setState({
          
          followUserLocation: false, 
        });

        console.log(`name ${this.state.lsName}`);
        console.log(`address ${this.state.address}`);
        this.showToast(`Đang tìm ${this.state.Keyword}`);
      });
  }
  getLatLng (){
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        console.log(`latitude: ${position.coords.latitude}, longitude: ${position.coords.longitude}`);
        this.setState({
          region:
          {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
          
          
        });
        console.log(`this.state.region ${this.state.region.latitude}`);
        console.log(`this.state.region ${this.state.region.longitude}`);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
       
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }
  handlekey = async () => {
    

    
    if (!this.state.Keyword)
    {
      this.getDataUser();     
      console.log(`NAMNM03`); 
      

    }
    else
    {
      this.setState({
        followUserLocation: false,   
        visibleModal: 1,
      });
      console.log(`NAMNM04`);
      AsyncStorage.setItem("Tim_kiem", this.state.Keyword);
      this.fetData();
      this.setState({ isShow: true });
    }
   
      
  };
  showPopUp = async () =>{
    
    this.handlekey();
    this.setState({ 
      followUserLocation: false,
      visibleModal: 1,
     });
    this.setState({ isDataLoaded: false });
    this.fetDataGia();
    this.setState({ isDataLoaded: true });
    console.log(`NAMNM05`);
    this.renderContent();
  } 
  async componentDidMount() {
    try {

          const diachi = await AsyncStorage.getItem("Dia_chi_Url");
    
          this.setState({
            UrlInfo: diachi,
            
          });
   
        } catch (e) {
                console.log(`is logged in error ${e}`);
        }
 
      const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );

        if (granted) {
          console.log( "You can use the ACCESS_FINE_LOCATION" )
          this.setState({
            followUserLocation: granted,
            
          });
          this.getLatLng();
        } 
        else {
          console.log( "ACCESS_FINE_LOCATION permission denied" )
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                
            }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                alert("You've access for the location");
                this.setState({
                  followUserLocation: granted,
                  
                });
                this.getLatLng();
                console.log(`is logged in error ${this.state.followUserLocation}`);
            } else {
                alert("You don't have access for the location");
            }
        }
  }

  

  renderContent = () => (
   

    <View
      style={{
        backgroundColor: 'white',
        padding: 1,
        height: this.state.CountCard,
      }}
    >
      
      <ScrollView
          showsVerticalScrollIndicator={true}
          
        >
        
          {this.state.isDataLoaded && this.renderSearchResult()}
          
        </ScrollView>
              
      
    </View>
  );

  
  showToast = () => {
   
    ToastAndroid.show(`Địa điểm ${this.state.address}`, ToastAndroid.SHORT);
  };
 
  
 
 
 
  render() {
    const { navigation } = this.props;

    return (
      
      <View style={styles.container}>
        <Block row style={{ paddingHorizontal: theme.SIZES.BASE }}>
          
          <Block flex>
            <Input
             primary={this.state.primaryFocus}
             right
             
             placeholder="Tên đường"
             onFocus={() => this.setState({ primaryFocus: true })}
             onBlur={() => this.setState({ primaryFocus: false })}
             iconContent={
              <Icon
                size={16}
                color="#ADB5BD"
               
                name="close"
                family="Font-Awesome"
                style={styles.inputIcons}
                onPress={() => this.setState({ Keyword: ''  })} 
              />
            }
             shadowless
             onChangeText={(text) => this.setState({ Keyword: text  })}
             value={this.state.Keyword}
            />
            
          </Block>
          <Block left row>
          
            <Button
                shadowless
                onlyIcon icon="magnifying-glass" iconFamily="Entypo" iconSize={30} color="#18ce0f" iconColor="#18ce0f" style={{ width: 40, height: 40 }}
               
                onPress={this.showPopUp}
                
                // onPress={() => console.log(navigation.navigate("XemGia"))}
              >
                
            </Button>
           
          </Block>
        </Block>      
       
        
          
        <View style={styles.container}>
          <MapboxGL.MapView 
              style={styles.map}
              // onDidFinishRenderingMapFully={(r) => {
              //   this.setState({followUserLocation: true})
              // }}
              
              >
                <MapboxGL.UserLocation
                  renderMode="normal"
                  animated={true}
                  onPress={this.showToast}
                  
                />
                
                <MapboxGL.Camera
                        zoomLevel={18}
                        animationMode={'flyTo'}
                        animationDuration={1100}
                        followUserLocation={this.state.followUserLocation}
                        followUserMode="normal"
                        centerCoordinate={[this.state.region.longitude, this.state.region.latitude, LONGITUDE_DELTA, LATITUDE_DELTA]}
                    />
               
          </MapboxGL.MapView>
          
        </View>
        {this.state.visibleModal? (
          
            //  <View>
             
            //   <ScrollView
            //       showsVerticalScrollIndicator={false}
            //       contentContainerStyle={{ paddingBottom: 30, width }}
            //         >
            //       <Modal isVisible={this.state.visibleModal === 1} style={styles.bottomModal}>
            //         {this.state.isDataLoaded && this.renderSearchResult()}
            //         {this._renderModalContent()}
            //       </Modal>
            //   </ScrollView>
              
             
            
            // </View>
            <View>
             
            <Button 
              small onlyIcon icon="up" iconFamily="antdesign" iconSize={20} color="warning" iconColor="#fff" style={styles.button}
              justifyConten
              onPress={() => this.sheetRef.current.snapTo(0)}
            />
         
            <BottomSheet
              ref={this.sheetRef}
              snapPoints={[450, 300, 0]}
              borderRadius={10}
              renderContent={this.renderContent}
            />
            </View>
         
         
           
         
       
        ) : null}
       
      
         
      </View>
  
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
    alignItems: 'center',
    justifyContent: 'center',
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
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
    
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'left',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default TruyVanBanDo;
