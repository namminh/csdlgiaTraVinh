import { Block, Text, theme } from 'galio-framework';
import { Dimensions, Image, Linking, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerItem as DrawerCustomItem, Icon } from '../components';

import Images from '../constants/Images';
import React from 'react';
import nowTheme from '../constants/Theme';
import { useSafeArea } from 'react-native-safe-area-context';

const { width } = Dimensions.get('screen');

function CustomDrawerContent({ drawerPosition, navigation, profile, focused, state, ...rest }) {
  const insets = useSafeArea();
  const menu = [
    { name: 'TRANG_CHU', title: 'Trang chủ' },
    { name: '', title: 'Khai thác', type: 'line' },
    { name: 'KT_THEO_BIEU_MAU', title: 'Biểu mẫu' },
    { name: 'KT_THEO_CHI_TIEU', title: 'Chỉ tiêu' },
    { name: 'KT_GIA_VLXD', title: 'Giá Vật liệu Xây dựng' },
    { name: '', title: 'Báo cáo', type: 'line' },
    { name: 'GIA_HHDV', title: 'Giá Hàng hóa dịch vụ' },
    { name: 'GIA_DKKK', title: 'Giá Đăng ký kê khai' },
    { name: 'TAI_SAN_TDG', title: 'Tài sản Thẩm định giá' },
    { name: 'GIA_THI_TRUONG', title: 'Giá thị trường' },
    { name: 'BC_LANH_DAO', title: 'Báo cáo lãnh đạo' },
    { name: '', title: 'Hệ thống', type: 'line' },
    { name: 'WEB', title: 'Truy cập Website' },
    { name: 'LOG_OUT', title: 'Thoát' },
  ];

  return (
    <Block style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <Block style={styles.header}>
        <Image style={styles.logo} source={Images.Logo} />
        <Block right style={styles.headerIcon}>
          <Icon name="align-left-22x" family="NowExtra" size={15} color={'white'} />
        </Block>
      </Block>
      <Block
        flex
        style={{ paddingLeft: 8, paddingRight: 14, backgroundColor: nowTheme.COLORS.PRIMARY }}
      >
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {menu.map((item, index) => {
            return (
              <DrawerCustomItem
                name={item.name}
                type={item.type}
                title={item.title}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
                style={styles.menuitem}
              />
            );
          })}
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: 'center',
    backgroundColor: nowTheme.COLORS.PRIMARY,
  },
  headerIcon: {
    marginTop: -20,
  },
  logo: {
    height: 40,
    width: 37,
    tintColor: 'black',
  },
  menuitem: {
    height: 40,
    width: 37,
    tintColor: 'black',
    color: 'white',
  },
});

export default CustomDrawerContent;
