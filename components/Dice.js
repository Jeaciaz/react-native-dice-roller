/**
 * @flow
 */

import React from 'react';
import R from 'ramda';
import { StyleSheet, Text, Image, View, Dimensions, TouchableHighlight } from 'react-native';
import { Maybe } from '../fp';

// const StyledDice = styled.View`
//   border-width: 1px;
//   border-color: #916953;
//   border-radius: 4px;
//   background-color: #c32706;
//   color: #916953;
//   padding: 20px;
// `;

const { width } = Dimensions.get('window');
const vw = width / 100;
const vwCoeff = Math.ceil((width - 60) / (3 * vw));

const styles = StyleSheet.create({
  container: {
    width: vwCoeff * vw,
    height: vwCoeff * vw,
    margin: 5,
    elevation: 4,
    shadowRadius: 4,
    borderRadius: 4,
    backgroundColor: '#C16F35',
    padding: 20,
  },
  img: {
    width: vwCoeff * vw - 40,
    height: vwCoeff * vw - 40,
    resizeMode: 'contain',
  },
  textWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 42,
    color: '#F4E4BA',
    textShadowColor: '#2C1503',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
});

export default function Dice(props: { img: ReactNode, sides: number, amount: number, onPress: (e: React.SyntheticEvent) => void, onLongPress: (e: React.SyntheticEvent) => void }) {
  const [longPressInterval, setLongPressInterval] = React.useState(null);
  const longPressDuration = 450; // ms

  const safeSetLongPressInterval = (...args) => {
    R.map(clearInterval, Maybe.of(longPressInterval));

    setLongPressInterval(...args);
  }

  const currySetInterval = R.curry((interval, fn) => setInterval(fn, interval))

  return (
    <TouchableHighlight
      underlayColor="#D08752"
      onPress={props.onPress}
      onPressIn={() => R.compose(safeSetLongPressInterval, currySetInterval(longPressDuration))(props.onLongPress)}
      onPressOut={() => R.map(clearInterval, Maybe.of(longPressInterval))}
    >
      <View style={styles.container}>
        <Image style={styles.img} source={props.img} />
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{props.amount > 0 && props.amount}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}
