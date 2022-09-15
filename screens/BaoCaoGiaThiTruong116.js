import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  ImageBackground,
} from 'react-native';

import Articles from './Articles';
// Galio components
import { Block, Text, Button as GaButton, theme } from 'galio-framework';

// Now UI themed components
import { Images, nowTheme, articles, tabs } from '../constants';
import { Button, Select, Icon, Input, Header, Switch } from '../components';

import Img from '../components/Img';
import { Card } from '../components';

import axios from 'axios';

const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

class BaoCaoGiaThiTruong116 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkSelected: [],
      lsDiaBan: [],
      lsDinhKy: [],
      lsChiTiet1: [],
      lsChiTiet2: [],
      'switch-1': true,
      'switch-2': false,
      isDinhKySelected: false,
      isSelectKyDuLieu: false,
      kyDuLieuSel: 0,
    };
  }

  toggleSwitch = (switchId) => this.setState({ [switchId]: !this.state[switchId] });

  renderTableCell = () => {
    const { navigation } = this.props;
    return (
      <Block flex style={styles.group}>
        <Text size={16} style={styles.title}>
          Table Cell
        </Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block style={styles.rows}>
            <TouchableOpacity onPress={() => navigation.navigate('Pro')}>
              <Block row middle space="between" style={{ paddingTop: 7 }}>
                <Text
                  style={{ fontFamily: 'montserrat-regular' }}
                  size={14}
                  color={nowTheme.COLORS.TEXT}
                >
                  Manage Options
                </Text>
                <Icon name="chevron-right" family="entypo" style={{ paddingRight: 5 }} />
              </Block>
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
    );
  };

  renderCards = () => {
    scrollX = new Animated.Value(0);
    cards = [articles[5], articles[6]];
    return (
      <Block flex style={styles.group}>
        <Articles />
        <Block flex card center shadow style={styles.category}>
          <ImageBackground
            source={Images.Products['path']}
            style={[styles.imageBlock, { width: width - theme.SIZES.BASE * 2, height: 252 }]}
            imageStyle={{
              width: width - theme.SIZES.BASE * 2,
              height: 252,
            }}
          >
            <Block style={styles.categoryTitle}>
              <Text size={18} bold color={theme.COLORS.WHITE}>
                View article
              </Text>
            </Block>
          </ImageBackground>
        </Block>
        <ScrollView
          horizontal={true}
          style={styles.contentContainer}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={{
            width: width * 2,
          }}
        >
          {cards.map((item, index) => {
            return (
              <Card
                key={index}
                item={item}
                full
                titleStyle={styles.productTitle}
                imageStyle={{ height: 300, width: '100%', resizeMode: 'contain' }}
              />
            );
          })}
        </ScrollView>
      </Block>
    );
  };

  renderForm = () => {
    //var headers = new Headers();
    //headers.append('X-CSCAPI-KEY', 'API_KEY');

    var requestOptions = {
      method: 'GET',
      //headers: headers,
      redirect: 'follow',
    };

    fetch('http://113.160.48.98:8790/mwebapi/GetDmDiaBan', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        //console.log(JSON.stringify(result));

        //console.log(count);
        if (result) {
          let ret = result.Result;
          var count = Object.keys(ret).length;
          let countryArray = [];
          for (var i = 0; i < count; i++) {
            countryArray.push(ret[i].TEN_DIA_BAN);
          }
          this.setState({
            lsDiaBan: countryArray,
          });
          // }
          // this.setState({
          //   lsDiaBan: countryArray,
          // });
        }
      })
      .catch((error) => console.log('error', error));

    return (
      <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text style={{ fontFamily: 'montserrat-regular' }} muted>
            Quận/Huyện
          </Text>
          <Block style={{ marginTop: 8 }}>
            {/* <Select defaultIndex={1} options={['Tỉnh Nam Định', 'Huyện Hải Hậu']} /> */}
            <Select defaultIndex={0} options={this.state.lsDiaBan} id="selectQuanHuyen" />
          </Block>
        </Block>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text style={{ fontFamily: 'montserrat-regular', marginTop: theme.SIZES.BASE }} muted>
            Kỳ dữ liệu
          </Text>
          <Block style={{ flex: 1, marginTop: 8 }}>
            <Select defaultIndex={0} options={['15 Ngày', '6 Tháng', 'Năm']} />
          </Block>
        </Block>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text style={{ fontFamily: 'montserrat-regular', marginTop: theme.SIZES.BASE }} muted>
            Tháng
          </Text>
          <Block style={{ flex: 1, marginTop: 8 }}>
            <Select defaultIndex={0} options={['15 Ngày', '6 Tháng', 'Năm']} />
          </Block>
        </Block>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text style={{ fontFamily: 'montserrat-regular', marginTop: theme.SIZES.BASE }} muted>
            Ngày
          </Text>
          <Block style={{ flex: 1, marginTop: 8 }}>
            <Select defaultIndex={0} options={['15 Ngày', '6 Tháng', 'Năm']} />
          </Block>
        </Block>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text style={{ fontFamily: 'montserrat-regular', marginTop: theme.SIZES.BASE }} muted>
            Năm
          </Text>
          <Block style={{ flex: 1, marginTop: 8 }}>
            {this.state.isSelectKyDuLieu && (
              <Select defaultIndex={0} options={['2022', '2021', '2020']} />
            )}
          </Block>
        </Block>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE, marginTop: 10 }}>
          <Block center>
            <Button
              textStyle={{ fontFamily: 'montserrat-regular', fontSize: 16 }}
              color="warning"
              style={styles.button}
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

export default BaoCaoGiaThiTruong116;