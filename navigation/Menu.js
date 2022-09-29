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
    { name: 'BaoCaoGiaThiTruong116', title: 'Báo cáo Giá thị trường TT116' },
    { name: 'BaoCaoGiaThiTruong142', title: 'Báo cáo Giá thị trường TT142' },
    { name: 'BaoCaoTongHopGiaDangKy', title: 'Khai thác dữ liệu theo chỉ tiêu' },
    { name: 'BaoCaoGiaThiTruongLanhDaoUBND', title: 'Báo cáo phục vụ lãnh đạo' },
    { name: 'BaoCaoTongHopGiaKeKhai', title: 'Báo cáo tổng hợp giá kê khai' },
    { name: 'TraCuuGiaHHDVNhaNuocDinhGia', title: 'Báo cáo Giá hàng hóa định giá' },
    { name: 'BaoCaoGiaThiThuongTongHop', title: 'Báo cáo tổng hợp giá thị trường' },
    { name: 'KhaiThacGiaVLXD', title: 'Khai thác giá vật liệu xây dựng' },
    { name: 'BaoCaoTongHopGiaTaiSanTDG', title: 'Báo cáo tổng hợp giá trị tài sản TĐG' },
    // { name: 'Components', title: 'Components' },
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
    paddingTop: theme.SIZES.BASE * 2,
    justifyContent: 'center',
    backgroundColor: nowTheme.COLORS.PRIMARY,
  },
  headerIcon: {
    marginTop: -20,
  },
  logo: {
    height: 40,
    width: 37,
    tintColor: 'white',
  },
  menuitem: {
    height: 40,
    width: 37,
    tintColor: 'black',
    color: 'white',
  },
});

export default CustomDrawerContent;
