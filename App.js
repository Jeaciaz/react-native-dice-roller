/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import R from 'ramda';
import { StyleSheet, View, Text, Button, Vibration } from 'react-native';
import Dice from './components/Dice';
import { Random } from './fp';
import ResultTable from './components/ResultTable';
import Navbar from './components/Navbar';
import AppStatusBar from './components/StatusBar';

const diceData = [
  { value: 4, img: require('./assets/d4.png') },
  { value: 6, img: require('./assets/d6.png') },
  { value: 8, img: require('./assets/d8.png') },
  { value: 10, img: require('./assets/d10.png') },
  { value: 12, img: require('./assets/d12.png') },
  { value: 20, img: require('./assets/d20.png') },
];

// defaultResults :: [{value: number}]
const defaultResults = R.compose(Object.fromEntries, R.map(({value}) => [value, []]));

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    padding: 10,
    backgroundColor: '#D08752',
    justifyContent: 'flex-start',
  },
  diceList: {
    height: 100,
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  rollButton: {
    flex: 1,
    width: '50%',
    alignSelf: 'center',
  },
  rollResultTable: {
    flex: 3
  }
});

// safeAdd :: number => number => number | 0
const safeAdd = (amount: number) => R.compose(R.max(0), R.defaultTo(amount), R.add(amount));
// addDice :: number => number => {number: number} => {number: number}
const addDice = R.curry(
  (amount: number, dice: string, list: { [key: number]: number }) =>
    R.assoc(dice, safeAdd(amount)(R.prop(dice, list)), list)
);

const App: () => React$Node = () => {
  // incrementDice, decrementDice :: number => {number: number} => {number: number}
  const incrementDice = addDice(1);
  const decrementDice = addDice(-1);

  // The list of thrown dice
  const [diceList, setDiceList] = React.useState({});
  const [results, setResults] = React.useState(defaultResults(diceData));

  // roll :: number => Random (number => number)
  const roll = (sides: number) => Random.of(R.compose(Math.floor, R.add(1), R.multiply(sides)));

  // rollDice :: {number: number} => {number: [number]}
  const rollDice = R.mapObjIndexed((value, key) =>
    R.map(roll(key).$unsafePerformRandom, R.range(0, parseInt(value, 10)))
  );

  return (
    <>
      <AppStatusBar backgroundColor="#7E4822" barStyle="light-content" />
      <Navbar />
      <View style={styles.mainView}>
        <View style={styles.diceList}>
          {diceData.map((currentDice) => (
            <Dice
              key={currentDice.value}
              img={currentDice.img}
              sides={currentDice.value}
              amount={R.defaultTo(0, diceList[currentDice.value])}
              onPress={() =>
                setDiceList(incrementDice(currentDice.value))
              }
              onLongPress={() =>
                R.compose(() => Vibration.vibrate(150), setDiceList)(decrementDice(currentDice.value))
              }
            />
          ))}
        </View>
        <View style={styles.rollButton}>
          <Button
            title="Roll!"
            color="#C16F35"
            onPress={() => R.compose(setResults, R.mergeRight(results), rollDice)(diceList)}
          />
        </View>
        <View style={styles.rollResultTable}>
          <ResultTable 
            results={results}
          />
        </View>
      </View>
    </>
  );
};

export default App;
