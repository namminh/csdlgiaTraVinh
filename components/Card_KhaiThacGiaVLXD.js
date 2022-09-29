import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { nowTheme } from '../constants';

class Card_KhaiThacGiaVLXD extends React.Component {
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
        {/* <TouchableWithoutFeedback onPress={() => navigation.navigate('Pro')}> */}
        <Block flex space="between" style={styles.cardDescription}>
          <Block flex left>
            {item.TEN_VLXD ? (
              <Block flex center>
                <Text size={5} style={titleStyles} color={nowTheme.COLORS.TWITTER}>
                  {item.TEN_VLXD}
                </Text>
              </Block>
            ) : (
              <Block flex center>
                <Text size={5} style={titleStyles} color={nowTheme.COLORS.TWITTER}>
                  Tên vật liệu xây dựng:
                </Text>
              </Block>
            )}
            {item.TIEU_CHUAN_KT ? (
              <Block flex left>
                <Text size={5} style={titleStyles} color={nowTheme.COLORS.FACEBOOK}>
                  Đặc điểm kỹ thuật:
                  <Text
                    style={{ fontFamily: 'montserrat-regular' }}
                    size={14}
                    // style={titleStyles}
                    color={nowTheme.COLORS.BLACK}
                  >
                    {' '}
                    {item.TIEU_CHUAN_KT}
                  </Text>
                </Text>
              </Block>
            ) : (
              <Block flex left>
                <Text size={5} style={titleStyles} color={nowTheme.COLORS.FACEBOOK}>
                  Đặc điểm kỹ thuật:
                </Text>
              </Block>
            )}
            {item.TEN_DON_VI_TINH ? (
              <Block flex left>
                <Text size={5} style={titleStyles} color={nowTheme.COLORS.FACEBOOK}>
                  Đơn vị tính:
                  <Text
                    style={{ fontFamily: 'montserrat-regular' }}
                    size={14}
                    // style={titleStyles}
                    color={nowTheme.COLORS.BLACK}
                  >
                    {' '}
                    {item.TEN_DON_VI_TINH}
                  </Text>
                </Text>
              </Block>
            ) : (
              <Block flex left>
                <Text size={5} style={titleStyles} color={nowTheme.COLORS.FACEBOOK}>
                  Đơn vị tính:
                  <Text> </Text>
                </Text>
              </Block>
            )}
            {item.KY_DU_LIEU ? (
              <Block flex left>
                <Text size={5} style={titleStyles} color={nowTheme.COLORS.BLACK}>
                  Kỳ Dữ liệu:
                  <Text
                    style={{ fontFamily: 'montserrat-regular' }}
                    size={14}
                    // style={titleStyles}
                    color={nowTheme.COLORS.BLACK}
                  >
                    {' '}
                    {item.KY_DU_LIEU}
                  </Text>
                </Text>
              </Block>
            ) : (
              <Block flex left>
                <Text size={5} style={titleStyles} color={nowTheme.COLORS.BLACK}>
                  Kỳ dữ liệu:
                </Text>
              </Block>
            )}

            {item.GIA_CONG_BO ? (
              <Block flex left>
                <Text size={5} style={titleStyles} color={nowTheme.COLORS.BLACK}>
                  Giá công bố:
                  <Text
                    style={{ fontFamily: 'montserrat-regular' }}
                    size={14}
                    // style={titleStyles}
                    color={nowTheme.COLORS.BLACK}
                  >
                    {' '}
                    {item.GIA_CONG_BO}
                  </Text>
                </Text>
              </Block>
            ) : (
              <Block flex left>
                <Text size={5} style={titleStyles} color={nowTheme.COLORS.BLACK}>
                  Giá công bố:
                </Text>
              </Block>
            )}

            {/* <Text
                style={{ fontFamily: 'montserrat-regular' }}
                size={12}
                color={nowTheme.COLORS.TEXT}
              >
                MUC TANG GIAM:
                {item.MUC_TANG_GIAM}
               
              </Text>
              <Text
                style={{ fontFamily: 'montserrat-regular' }}
                size={12}
                color={nowTheme.COLORS.TEXT}
              >
                TY LE TANG GIAM:
                {item.TY_LE_TANG_GIAM}
               
              </Text> */}

            {/* {item.description ? (
                <Block flex center>
                  <Text
                    style={{ fontFamily: 'montserrat-regular', textAlign: 'center', padding: 15 }}
                    size={14}
                    color={'#9A9A9A'}
                  >
                    {item.description}
                  </Text>
                </Block>
              ) : (
                <Block />
              )} */}
            {/* {item.body ? (
                <Block flex left>
                  <Text
                    style={{ fontFamily: 'montserrat-regular' }}
                    size={12}
                    color={nowTheme.COLORS.TEXT}
                  >
                    {item.body}
                  </Text>
                </Block>
              ) : (
                <Block />
              )} */}
          </Block>
          {/* <Block right={ctaRight ? true : false}>
              <Text
                style={styles.articleButton}
                size={12}
                muted={!ctaColor}
                color={ctaColor || nowTheme.COLORS.ACTIVE}
                bold
              >
                {item.cta}
              </Text>
            </Block> */}
        </Block>
        {/* </TouchableWithoutFeedback> */}
      </Block>
    );
  }
}

Card_KhaiThacGiaVLXD.propTypes = {
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
    paddingHorizontal: 1,
    paddingTop: 3,
    paddingBottom: 3,
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
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
    shadowColor: '#135299',
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
});

export default withNavigation(Card_KhaiThacGiaVLXD);
