import React from 'react'
import { ScrollView, StyleSheet, View, Text, Dimensions } from 'react-native'
import {
  LineChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit'

export default class ProgressScreen extends React.Component {
  static navigationOptions = {
    title: 'Progress',
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.chartsContainer}>
          <LineChart
            width={CHART_WIDTH}
            height={CHART_HEIGHT}
            data={lineChartData}
            chartConfig={chartConfig}
            bezier
            fromZero
          />

          <View style={{ marginBottom: 24 }} />

          <ContributionGraph
            values={commitsData}
            endDate={new Date()}
            numDays={105}
            width={CHART_WIDTH}
            height={CHART_HEIGHT}
            chartConfig={chartConfig}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  chartsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const CHART_WIDTH = Dimensions.get('window').width - 16
const CHART_HEIGHT = 200

const chartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
  style: {},
}

const lineChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
      ],
    },
  ],
}

const commitsData = [
  { date: '2017-01-02', count: 1 },
  { date: '2017-01-03', count: 2 },
  { date: '2017-01-04', count: 3 },
  { date: '2017-01-05', count: 4 },
  { date: '2017-01-06', count: 5 },
  { date: '2017-01-30', count: 2 },
  { date: '2017-01-31', count: 3 },
  { date: '2017-03-01', count: 2 },
  { date: '2017-04-02', count: 4 },
  { date: '2017-03-05', count: 2 },
  { date: '2017-02-30', count: 4 },
]
