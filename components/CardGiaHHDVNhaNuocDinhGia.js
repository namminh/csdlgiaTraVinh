import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { BIcon } from '.';

import { nowTheme } from '../constants';
import { View } from 'react-native-web';

class CardGiaHHDVNhaNuocDinhGia extends React.Component {
  render() {
    const {
      navigation,
      item,
      horizontal,
      full,
      style,
      ctaColor,
      imageStyle,
      ctaRight,
      titleStyle,
    } = this.props;

    const imageStyles = [full ? styles.fullImage : styles.horizontalImage, imageStyle];
    const titleStyles = [styles.cardTitle, titleStyle];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [
      styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow,
    ];

    return (
      <Block row={horizontal} card flex style={cardContainer}>
        {/* <TouchableWithoutFeedback onPress={() => navigation.navigate('Pro')}>
          <Block flex style={imgContainer}>
            <Image resizeMode="cover" source={item.image} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback> */}
        <TouchableWithoutFeedback>
          <Block flex space="between" style={styles.cardDescription}>
            <Block flex left>
              <Text style={titleStyles}>{item.TEN_MAU_BIEU}</Text>
              <Block flex row>
                {item.TEN_PHAN_LOAI ? (
                  <Block flex row left style={styles.cardDescription}>
                    <Text style={styles.cardItemName}>Phân loại:</Text>
                    <Text style={styles.cardItemValue}>{item.TEN_PHAN_LOAI}</Text>
                  </Block>
                ) : (
                  <Block />
                )}
              </Block>

              {item.TEN_DON_VI ? (
                <Block flex row left style={styles.cardDescription}>
                  <Text style={styles.cardItemName}>Đơn vị:</Text>
                  <Text style={styles.cardItemValue}>{item.TEN_DON_VI}</Text>
                </Block>
              ) : (
                <Block />
              )}
              {item.SO_VAN_BAN ? (
                <Block flex row left style={styles.cardDescription}>
                  <Text style={styles.cardItemName}>Số văn bản:</Text>
                  <Text style={styles.cardItemValue}>{item.SO_VAN_BAN}</Text>
                </Block>
              ) : (
                <Block />
              )}

              <Block flex row style={styles.cardDescription}>
                {item.NGAY_BAN_HANH_GRID ? (
                  <Block flex left row>
                    <Block>
                      <BIcon
                        //type={item.type}
                        size={12}
                        name="calendar-sharp"
                        color={nowTheme.COLORS.PRIMARYDARK}
                      />
                    </Block>
                    <Block flex row>
                      <Text style={styles.cardItemName}>Ngày ban hành:</Text>
                      <Text style={styles.cardItemValue}>{item.NGAY_BAN_HANH_GRID}</Text>
                    </Block>
                  </Block>
                ) : (
                  <Block />
                )}
              </Block>
              <Block flex row style={styles.cardDescription}>
                {item.THOI_HAN_HIEU_LUC ? (
                  <Block flex left row>
                    <BIcon
                      //type={item.type}
                      size={12}
                      name="calendar-sharp"
                      color={nowTheme.COLORS.PRIMARY}
                    />
                    <Block flex row>
                      <Text style={styles.cardItemName}>Hiệu lực:</Text>
                      <Text style={styles.cardItemValue}>{item.THOI_HAN_HIEU_LUC}</Text>
                    </Block>
                  </Block>
                ) : (
                  <Block />
                )}
              </Block>
            </Block>
            {item.GHI_CHU ? (
              <Block right={ctaRight ? true : false}>
                <Text
                  style={styles.articleButton}
                  size={12}
                  muted={!ctaColor}
                  color={ctaColor || nowTheme.COLORS.DEFAULT}
                  bold
                >
                  Ghi chú: {item.GHI_CHU}
                </Text>
              </Block>
            ) : (
              <Block />
            )}
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

CardGiaHHDVNhaNuocDinhGia.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
  ctaRight: PropTypes.bool,
  titleStyle: PropTypes.any,
  textBodyStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 4,
  },
  cardTitle: {
    paddingHorizontal: 9,
    paddingTop: 7,
    paddingBottom: 15,
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  cardItemName: {
    fontFamily: 'montserrat-regular',
    fontSize: 12,
    color: nowTheme.COLORS.BLACK,
  },
  cardItemValue: {
    fontFamily: 'montserrat-regular',
    fontSize: 12,
    color: nowTheme.COLORS.BLACK,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  fullImage: {
    height: 215,
  },
  shadow: {
    shadowColor: '#8898AA',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  articleButton: {
    fontFamily: 'montserrat-bold',
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  container: {
    flexDirection: 'row',
    marginRight: 10,
    alignItems: 'center',
  },
});

export default CardGiaHHDVNhaNuocDinhGia;
