import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants';
import { BIcon } from '.';

//import * as Animatable from 'react-native-animatable';

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);

  //   useEffect(() => {
  //     if (focused) {
  //       viewRef.current.animate({
  //         0: { scale: 0.5, rotate: '0deg' },
  //         1: { scale: 1.5, rotate: '360deg' },
  //       });
  //     } else {
  //       viewRef.current.animate({
  //         0: { scale: 1.5, rotate: '360deg' },
  //         1: { scale: 1, rotate: '0deg' },
  //       });
  //     }
  //   }, [focused]);

  return (
    // <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.container}>
    //   <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
    //     <Icon
    //       type={item.type}
    //       name={focused ? item.activeIcon : item.inActiveIcon}
    //       color={focused ? COLORS.PRIMARY : COLORS.PRIMARYLITE}
    //     />
    //   </Animatable.View>
    // </TouchableOpacity>
    <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.container}>
      <BIcon
        type={item.type}
        name={focused ? item.activeIcon : item.inActiveIcon}
        color={focused ? COLORS.WHITE : COLORS.INPUT}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TabButton;
