import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme, Toast } from 'galio-framework';
import { BIcon } from '.';

import { nowTheme } from '../constants';
import numbro from 'numbro';
import languages from 'numbro/dist/languages.min';

// switch between languages
Object.getOwnPropertyNames(languages).forEach((lang) => {
  numbro.registerLanguage(languages[lang], true);
});

numbro.setLanguage('it-IT');
//console.log(numbro.languages());
class CardBaoCaoTongHopGiaTaiSanTDG extends React.Component {
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

        <Block flex space="between" style={styles.cardDescription}>
          <Block flex>
            <Text style={titleStyles}>{item.TEN_TS}</Text>
            {item.TEN_DOANH_NGHIEP ? (
              <Block flex row left style={styles.cardDescription}>
                <Text style={styles.cardItemName}>Tên DN:</Text>
                <Block flex left>
                  <Text style={styles.cardItemValue}>{item.TEN_DOANH_NGHIEP}</Text>
                </Block>
                {/* <Text style={styles.cardItemValue}>{item.TEN_DOANH_NGHIEP}</Text> */}
              </Block>
            ) : (
              <Block />
            )}
            {item.DIA_CHI ? (
              <Block flex row left style={styles.cardDescription}>
                <Text style={styles.cardItemName}>Địa chỉ:</Text>
                <Text style={styles.cardItemValue}>{item.DIA_CHI}</Text>
              </Block>
            ) : (
              <Block />
            )}

            <Block flex row>
              {item.TEN_LOAI_TS ? (
                <Block flex row left style={styles.cardDescription}>
                  <Text style={styles.cardItemName}>Loại TS:</Text>
                  <Text style={styles.cardItemValue}>{item.TEN_LOAI_TS}</Text>
                </Block>
              ) : (
                <Block />
              )}
              {item.THOI_DIEM_TDG_DISPLAY ? (
                <Block flex row left style={styles.cardDescription}>
                  <Text style={styles.cardItemName}>Thời điểm TĐG:</Text>
                  <Text style={styles.cardItemValue}>{item.THOI_DIEM_TDG_DISPLAY}</Text>
                </Block>
              ) : (
                <Block />
              )}
            </Block>
            <Block flex row>
              {item.PHUONG_PHAP_TDG ? (
                <Block flex row left style={styles.cardDescription}>
                  <Text style={styles.cardItemName}>P/pháp:</Text>
                  <Text style={styles.cardItemValue}>{item.PHUONG_PHAP_TDG}</Text>
                </Block>
              ) : (
                <Block />
              )}
              {item.GIA_TRI_TDG ? (
                <Block flex left row style={styles.cardDescription}>
                  <Block>
                    <BIcon
                      //type={item.type}
                      size={12}
                      name="ios-pricetag"
                      color={nowTheme.COLORS.PRIMARYDARK}
                    />
                  </Block>
                  <Block flex row>
                    <Text style={styles.cardItemName}>Giá trị:</Text>
                    <Text style={styles.cardItemValue}>
                      {numbro(item.GIA_TRI_TDG).format({ thousandSeparated: true })}
                    </Text>
                  </Block>
                </Block>
              ) : (
                <Block />
              )}
            </Block>
            {item.MUC_DICH_TDG ? (
              <Block row left style={styles.cardDescription}>
                <Text style={styles.cardItemName}>Mục đích TĐG:</Text>
                <Text style={styles.cardItemValue}>{item.MUC_DICH_TDG}</Text>
              </Block>
            ) : (
              <Block />
            )}

            <Block flex row style={styles.cardDescription}>
              {item.GIA_KY_NAY ? (
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
                    <Text style={styles.cardItemName}>Giá kỳ này:</Text>
                    <Text style={styles.cardItemValue}>{item.GIA_KY_NAY}</Text>
                  </Block>
                </Block>
              ) : (
                <Block />
              )}
              {item.GIA_KY_TRUOC ? (
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
                    Giá kỳ trước: {item.GIA_KY_TRUOC}
                  </Text>
                </Block>
              ) : (
                <Block />
              )}
            </Block>
          </Block>
          {item.SO_THUA_DAC_DIEM_TS ? (
            <Block right={ctaRight ? true : false}>
              <Text
                //style={styles.articleButton}
                size={12}
                muted={!ctaColor}
                color={ctaColor || nowTheme.COLORS.DEFAULT}
                bold
              >
                Đặc điểm: {item.SO_THUA_DAC_DIEM_TS}
              </Text>
            </Block>
          ) : (
            <Block />
          )}
        </Block>
      </Block>
    );
  }
}

CardBaoCaoTongHopGiaTaiSanTDG.propTypes = {
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

export default CardBaoCaoTongHopGiaTaiSanTDG;
