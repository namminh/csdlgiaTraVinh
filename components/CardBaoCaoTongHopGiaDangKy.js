import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { BIcon } from '.';

import { nowTheme } from '../constants';
import { View } from 'react-native-web';

class CardBaoCaoTongHopGiaDangKy extends React.Component {
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
              <Text size={14} style={titleStyles} color={nowTheme.COLORS.BLACK}>
                {item.TEN_HANG_HOA_DICH_VU}
              </Text>
              {item.TEN_DON_VI_TINH ? (
                <Block flex left style={styles.cardDescription}>
                  <Text
                    style={{ fontFamily: 'montserrat-regular' }}
                    size={12}
                    color={nowTheme.COLORS.BLACK}
                  >
                    Đơn vị tính: {item.TEN_DON_VI_TINH}
                  </Text>
                </Block>
              ) : (
                <Block />
              )}

              {item.GHI_CHU ? (
                <Block flex left style={styles.cardDescription}>
                  <Text
                    style={{ fontFamily: 'montserrat-regular' }}
                    size={12}
                    color={nowTheme.COLORS.TEXT}
                  >
                    Ghi chú: {item.GHI_CHU}
                  </Text>
                </Block>
              ) : (
                <Block />
              )}
              <Block flex row style={styles.cardDescription}>
                {item.MUC_GIA_HIEN_HANH ? (
                  <Block flex left row>
                    <Block>
                      <BIcon
                        //type={item.type}
                        size={12}
                        name="ios-pricetag"
                        color={nowTheme.COLORS.PRIMARYDARK}
                      />
                    </Block>
                    <Block flex row>
                      <Text
                        style={{ fontFamily: 'montserrat-regular', marginLeft: 10 }}
                        size={12}
                        color={nowTheme.COLORS.TEXT}
                      >
                        Giá: {item.MUC_GIA_HIEN_HANH}
                      </Text>
                    </Block>
                  </Block>
                ) : (
                  <Block />
                )}
                {item.MUC_GIA_MOI ? (
                  <Block flex left row>
                    <BIcon
                      //type={item.type}
                      size={12}
                      name="ios-pricetag"
                      color={nowTheme.COLORS.PRIMARY}
                    />
                    <Text
                      style={{ fontFamily: 'montserrat-regular', marginLeft: 10 }}
                      size={12}
                      color={nowTheme.COLORS.TEXT}
                    >
                      Giá mới: {item.MUC_GIA_MOI}
                    </Text>
                  </Block>
                ) : (
                  <Block />
                )}
              </Block>
              {item.MUC_DO_TANG_GIAM ? (
                <Block flex left row style={styles.cardDescription}>
                  <BIcon name="pulse" size={12} color={nowTheme.COLORS.ACTIVE} />
                  <Text
                    style={{ fontFamily: 'montserrat-regular', marginLeft: 10 }}
                    size={12}
                    color={nowTheme.COLORS.TEXT}
                  >
                    Tăng/Giảm: {item.MUC_DO_TANG_GIAM}
                  </Text>
                </Block>
              ) : (
                <Block />
              )}
              {item.TEN_SAN_PHAM ? (
                <Block flex left style={styles.cardDescription}>
                  <Text
                    style={{ fontFamily: 'montserrat-regular', textAlign: 'center' }}
                    size={14}
                    color={'#9A9A9A'}
                  >
                    {item.TEN_SAN_PHAM}
                  </Text>
                </Block>
              ) : (
                <Block />
              )}
            </Block>
            <Block right={ctaRight ? true : false}>
              <Text
                style={styles.articleButton}
                size={12}
                muted={!ctaColor}
                color={ctaColor || nowTheme.COLORS.ACTIVE}
                bold
              >
                {item.cta}
              </Text>
            </Block>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

CardBaoCaoTongHopGiaDangKy.propTypes = {
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

export default withNavigation(CardBaoCaoTongHopGiaDangKy);
