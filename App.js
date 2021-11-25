import React, { useState, useEffect } from "react";

import axios from "axios";
import { VictoryLine } from "victory-native";
import CoinItem from "./components/CoinItem";
import SearchBar from "react-native-dynamic-search-bar";

import {
  View,
  Text,
  Image,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  FlatList,
  isPress,
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
  const [period, setPeriod] = useState(30);

  const [coins, setCoins] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  const [shouldShow, setShouldShow] = useState(true);
  const changeView = () => {
    console.log("Clicked");
  };

  const loadData = async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    const data = await res.json();
    console.log("data: ", data);
    setCoins(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const dataPro = {
    labels: ["BTC", "ETH", "ADA"], // optional
    data: [0.3, 0.2, 0.5],
  };

  const renderContent = () => (
    <View style={{ width: "100%" }}>
      {shouldShow ? (
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
              $34.000,00
            </Text>

            <SafeAreaView></SafeAreaView>
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
      ) : null}
    </View>
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
        {/* <TouchableOpacity onPress={() => setShouldShow(!shouldShow)}>
          //enter render content
        </TouchableOpacity> */}

        <SearchBar
          fontColor="#c6c6c6"
          iconColor="#c6c6c6"
          shadowColor="#282828"
          cancelIconColor="#c6c6c6"
          backgroundColor="#fff"
          placeholder="Search here"
          onChangeText={(text) => text && setSearch(text)}
          onPressCancel={() => {
            setSearch();
          }}
          style={{ width: "103%" }}
        />
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#64253d", "#cd6c92"]}
          style={{
            height: "100%",
            width: "100%",
            marginTop: 0,
            borderTopLeftRadius: 48,
            borderBottomLeftRadius: 48,
          }}
        >
          <View
            style={{
              height: Dimensions.get("window").height * 0.48,
              width: "100%",
              marginTop: 0,
              borderTopLeftRadius: 48,
              borderBottomLeftRadius: 48,
            }}
          >
            <FlatList
              style={styles.list}
              data={coins.filter(
                (coin) =>
                  coin.name
                    .toLowerCase()
                    .includes(search.toLocaleLowerCase()) ||
                  coin.symbol
                    .toLocaleLowerCase()
                    .includes(search.toLocaleLowerCase())
              )}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <CoinItem coin={item} />}
              refreshing={refreshing}
              onRefresh={async () => {
                setRefreshing(true);
                await loadData();
                setRefreshing(false);
              }}
            />
          </View>
          <View style={styles.container}>
            <StatusBar backgroundColor="#0e0275" />
          </View>
          <View style={styles.timeWrapper}>
            <Text style={[styles.time]}>Send</Text>
            <Text style={[styles.time]}>Receive </Text>
            <Text style={[styles.time]}>Buy </Text>
            <Text style={[styles.time]}>Swap </Text>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
};

const chartConfig = {
  padding: 100,
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 1,
  useShadowColorFromDataset: false, // optional
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
  header: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    marginTop: 10,
  },
  list: {
    width: "100%",
  },
});

export default App;
