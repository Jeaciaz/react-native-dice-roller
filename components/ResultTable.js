import React from 'react';
import R from 'ramda';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const styles = StyleSheet.create({
  tableView: {
    flex: 1,
    borderRadius: 3,
    backgroundColor: '#C17845'
  },
  tableHead: {
    backgroundColor: '#A8602E',
    borderRadius: 3,
  },
  tableHeadText: {
    fontSize: 30,
    color: '#4A2E19',
    textAlign: 'center',
    borderBottomColor: '#2A1708',
    borderBottomWidth: 2,
  },
  tableHeadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45
  },
  tableHeadCell: {
    flex: 1,
    fontSize: 24,
    color: '#4A2E19',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  highlightedRow: {
    backgroundColor: '#B26B37',
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
  },
  highlightedCell: {
    flex: 1,
    fontSize: 20,
    color: '#4A2E19',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableBody: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  tableColumn: {
    flex: 1,
    height: '100%',
  },
  tableCell: {
    textAlign: 'center',
    color: '#4A2E19',
    fontSize: 17
  }
});

const rollsSum = R.compose(R.reduce(R.add, 0), R.flatten, R.values);

export default function ResultTable({ results }: {results: {[key: number]: [number]} }) {
  return (
    <View style={styles.tableView}>
      <View style={styles.tableHead} elevation={3}>
        <Text style={styles.tableHeadText}>Total: { rollsSum(results) }</Text>
        <View style={styles.tableHeadRow}>
          {
            Object.keys(results).map(key => (
              <Text style={styles.tableHeadCell} key={key}>d{key}</Text>
            ))
          }
        </View>
      </View>
      <View style={styles.highlightedRow}>
          {
            Object.keys(results).map(key => (
              <Text style={styles.highlightedCell} key={key}>
                { R.reduce(R.add, 0, results[key]) }
              </Text>
            ))
          }
      </View>
      <ScrollView contentContainerStyle={styles.tableBody}>
        {
          Object.keys(results).map(key => (
            <View style={styles.tableColumn} key={key}>
              {
                results[key].map(result => (
                  <Text style={styles.tableCell}>{result}</Text>
                ))
              }
            </View>
          ))
        }
      </ScrollView>
    </View>
  )
}
