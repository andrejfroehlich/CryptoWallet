import React, { useState, useEffect } from "react";

import axios from "axios";
import { VictoryLine } from "victory-native";

import {
  View,
  Text,
  Image,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import CounterInput from "react-native-counter-input";
import { LinearGradient } from "expo-linear-gradient";

import ProfileHeader from "react-native-profile-header";

const coloredNotification = require("./assets/notification-colored.png");
const notification = require("./assets/notification.png");

const App = () => {
  const [notificationIcon, setNotificationIcon] = React.useState(notification);
  const [data, setData] = useState();
  const [coin, setCoin] = useState("bitcoin");
  const [period, setPeriod] = useState(30);

  useEffect(() => {
    getData();
  }, [period]);

  async function getData() {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${period}`
      );
      const formatData = response.data.prices.map(function (i) {
        return {
          x: i[0],
          y: i[1],
        };
      });
      setData(formatData);
    } catch (error) {
      console.log(error);
    }
  }

  const renderContent = () => (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={["#64253d", "#cd6c92"]}
      style={{
        height: 200,
        width: "100%",
        marginTop: 32,
        borderTopLeftRadius: 48,
        borderBottomLeftRadius: 48,
        padding: 0,
      }}
    >
      <View style={{ margin: 32 }}>
        <Text style={{ fontSize: 40, fontWeight: "bold", color: "#fff" }}>
          Wallet
        </Text>

        <Text
          style={{
            fontSize: 24,
            fontWeight: "300",
            color: "#fff",
            opacity: 0.7,
          }}
        >
          €34.000,00
        </Text>
        <SafeAreaView>
          <LineChart
            data={{
              labels: ["January", "February", "March", "April", "May", "June"],
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
            }}
            width={Dimensions.get("window").width} // from react-native
            height={200}
            yAxisLabel=""
            yAxisSuffix="%"
            withVerticalLabels="false"
            withHorizontalLabels="false"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#64253d",
              backgroundGradientTo: "#cd6c92",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </SafeAreaView>
      </View>
      <View
        style={{
          top: 0,
          right: 0,
          bottom: 0,
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></View>
    </LinearGradient>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ProfileHeader
          titleText="Home"
          //backgroundColor="#64253d"
          disableFirstIcon="false"
          disableSecondIcon="false"
          height={50}
          thirdIconImageSource={notificationIcon}
          onThirdIconPress={() => {
            if (notificationIcon === notification)
              setNotificationIcon(coloredNotification);
            else setNotificationIcon(notification);
          }}
        />
        {renderContent()}

        <View style={styles.timeWrapper}>
          <Text
            style={[styles.time, period === 1 ? styles.underline : null]}
            onPress={() => setPeriod(1)}
          >
            1 Day
          </Text>
          <Text
            style={[styles.time, period === 7 ? styles.underline : null]}
            onPress={() => setPeriod(7)}
          >
            1 Week
          </Text>
          <Text
            style={[styles.time, period === 30 ? styles.underline : null]}
            onPress={() => setPeriod(30)}
          >
            1 Month
          </Text>
          <Text
            style={[styles.time, period === 365 ? styles.underline : null]}
            onPress={() => setPeriod(365)}
          >
            1 Year
          </Text>
        </View>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#64253d", "#cd6c92"]}
          style={{
            height: 100,
            width: "100%",
            marginTop: 32,
            borderTopLeftRadius: 48,
            borderBottomLeftRadius: 48,
          }}
        >
          <LineChart
            data={{
              labels: ["January", "February", "March", "April", "May", "June"],
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
            }}
            width={Dimensions.get("window").width} // from react-native
            height={200}
            yAxisLabel=""
            yAxisSuffix="%"
            withVerticalLabels="false"
            withHorizontalLabels="false"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#64253d",
              backgroundGradientTo: "#cd6c92",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </LinearGradient>

        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#64253d", "#cd6c92"]}
          style={{
            height: 100,
            width: "100%",
            marginTop: 32,
            borderTopLeftRadius: 48,
            borderBottomLeftRadius: 48,
          }}
        >
          <LineChart
            data={{
              labels: ["January", "February", "March", "April", "May", "June"],
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
            }}
            width={Dimensions.get("window").width} // from react-native
            height={200}
            yAxisLabel=""
            yAxisSuffix="%"
            withVerticalLabels="false"
            withHorizontalLabels="false"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#64253d",
              backgroundGradientTo: "#cd6c92",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </LinearGradient>

        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#64253d", "#cd6c92"]}
          style={{
            height: 100,
            width: "100%",
            marginTop: 32,
            borderTopLeftRadius: 48,
            borderBottomLeftRadius: 48,
          }}
        >
          <LineChart
            data={{
              labels: ["January", "February", "March", "April", "May", "June"],
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
            }}
            width={Dimensions.get("window").width} // from react-native
            height={200}
            yAxisLabel=""
            yAxisSuffix="%"
            withVerticalLabels="false"
            withHorizontalLabels="false"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#64253d",
              backgroundGradientTo: "#cd6c92",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </LinearGradient>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    height: 75,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  timeWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  coins: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  time: {
    margin: 10,
  },
  header: {
    position: "absolute",
    top: 50,
    fontSize: 30,
    fontWeight: "bold",
  },
  underline: { textDecorationLine: "underline" },
});

export default App;
