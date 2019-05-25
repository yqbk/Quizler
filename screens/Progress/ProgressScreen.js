import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, StyleSheet, View, Text, Dimensions } from 'react-native'
import { progressSelector } from '../../containers/lessons/selector'
import {
  LineChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit'
import { lessonsSelector } from '../../containers/lessons/selector'

class ProgressScreen extends React.Component {
  static navigationOptions = {
    title: 'Progress',
  }

  render() {
    return (
      <ScrollView>
        {this.props.progressData.map(chart => (
          <View styles={styles.chartsContainer} key={chart.title}>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: '700',
                paddingLeft: 16,
                paddingTop: 32,
                paddingBottom: 16,
              }}
            >
              {chart.title}
            </Text>

            <LineChart
              width={CHART_WIDTH}
              height={CHART_HEIGHT}
              data={{ labels: chart.labels, datasets: chart.datasets }}
              chartConfig={chartConfig}
              bezier
              fromZero
            />
          </View>
        ))}

        {/* <View style={{ marginBottom: 24 }} />

          <ContributionGraph
            values={commitsData}
            endDate={new Date()}
            numDays={105}
            width={CHART_WIDTH}
            height={CHART_HEIGHT}
            chartConfig={chartConfig}
          /> */}
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  progressData: progressSelector()(state),
})
//
export default connect(
  mapStateToProps,
  null,
)(ProgressScreen)

const styles = StyleSheet.create({
  chartsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
  },
})

const CHART_WIDTH = Dimensions.get('window').width - 16
const CHART_HEIGHT = 200

const chartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
  style: { paddingBottom: 32, borderBottomWidth: 3 },
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
