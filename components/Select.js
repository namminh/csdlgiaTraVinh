import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import ModalDropdown from '../react-native-modal-dropdown';
import { Block, Text, theme } from 'galio-framework';

import Icon from './Icon';
import { nowTheme } from '../constants';

const initialState = {
  value: '- Chọn -',
};

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.dropdownRef = React.createRef();
  }
  state = {
    index: -1,
    value: this.props.defaultValue,
  };

  handleOnSelect = (index, value) => {
    // console.log(index);
    // console.log(value);
    const { onSelect } = this.props;

    this.setState({ value: value });
    this.setState({ index: index });
    onSelect && onSelect(index, value);
  };

  clearState = () => {
    this.setState({ index: initialState.index, value: initialState.value });
  };
  // componentDidMount() {
  //   // const { value, options } = this.props;
  //   // const selectedIdx = (options || []).findIndex((option) => option === value);
  //   // this.dropdownRef.current.select(selectedIdx);
  //   //console.log(this.props.options);
  // }
  render() {
    const {
      onSelect,
      iconName,
      iconFamily,
      iconSize,
      iconColor,
      color,
      textStyle,
      style,
      ...props
    } = this.props;

    //console.log(this.props);

    const modalStyles = [styles.qty, color && { backgroundColor: color }, style];

    const textStyles = [styles.text, textStyle];

    //console.log(props.defaultValue);
    return (
      <ModalDropdown
        style={modalStyles}
        onSelect={this.handleOnSelect}
        dropdownStyle={styles.dropdown}
        dropdownTextStyle={{ paddingLeft: 16, fontSize: 12 }}
        defaultValue={props.defaultValue}
        {...props}
        data={this.state}
        ref={this.dropdownRef}
      >
        <Block flex row middle space="between">
          <Text size={12} style={textStyles}>
            {this.state.value}
          </Text>
          <Icon
            name={iconName || 'minimal-down2x'}
            family={iconFamily || 'NowExtra'}
            size={iconSize || 10}
            color={iconColor || nowTheme.COLORS.WHITE}
          />
        </Block>
      </ModalDropdown>
    );
  }
}

Select.propTypes = {
  onSelect: PropTypes.func,
  iconName: PropTypes.string,
  iconFamily: PropTypes.string,
  iconSize: PropTypes.number,
  color: PropTypes.string,
  textStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  qty: {
    flex: 1,
    //backgroundColor: nowTheme.COLORS.PRIMARY,
    backgroundColor: nowTheme.COLORS.BORDER,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 9.5,
    borderRadius: 4,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 1,
    borderColor: nowTheme.COLORS.BLACK,
  },
  text: {
    color: nowTheme.COLORS.BLACK,
    fontWeight: '500',
  },
  dropdown: {
    marginTop: 8,
    marginLeft: -16,
    flex: 0.5,
    width: '92%',
  },
});

export default Select;
