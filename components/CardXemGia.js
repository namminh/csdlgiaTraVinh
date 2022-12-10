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
class CardXemGia extends React.Component {
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
            <Text size={12} >{item.TEN_DUONG}</Text>
           
            {item.DOAN_DUONG ? (
              <Block flex space="between" left style={styles.cardDescription}>
                
                <Text style={styles.cardItemName}>{item.DOAN_DUONG}</Text>
              </Block>
            ) : (
              <Block />
            )}

            <Block flex row>
              {item.TEN_LOAI_DAT ? (
                <Block flex space="between" style={styles.cardDescription}>
                  
                  <Text style={styles.cardItemName}>{item.TEN_LOAI_DAT}</Text>
                </Block>
              ) : (
                <Block />
              )}
              
            </Block>
            <Block flex row>
              {item.GIA_DAT ? (
                <Block flex row left style={styles.cardDescription}>
                  <Text flex style={styles.cardItemName}>Giá đất:</Text>
                  <Text style={styles.cardItemValue}>{numbro(item.GIA_DAT).format({
                          thousandSeparated: true,
                        })}</Text>
                </Block>
              ) : (
                <Block />
              )}
              
            </Block>
           

            
          </Block>
        
        </Block>
      </Block>
    );
  }
}

CardXemGia.propTypes = {
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
    paddingBottom: 5,
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 3,
  },
  cardItemName: {
    fontFamily: 'montserrat-regular',
    fontSize: 12,
    color: nowTheme.COLORS.BLACK,
  },
  cardItemValue: {
    fontFamily: 'montserrat-regular',
    fontSize: 14,
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

export default CardXemGia;
