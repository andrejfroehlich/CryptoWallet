import React, { useState, useEffect } from "react";

import axios from "axios";
import { VictoryLine } from "victory-native";
import CoinItem from "./CoinItem";
import ViewPercent from "./ViewPercent";

import BottomNavigation from "./BottomNavigation";

import SearchBar from "react-native-dynamic-search-bar";
import {
  LogIn,
  LogOut,
  PlusCircle,
  CornerRightUp,
  CornerLeftUp,
  CornerRightDown,
  CornerLeftDown,
} from "react-native-feather";

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

const coloredNotification = require("../assets/notification-colored.png");
const notification = require("../assets/notification.png");
const profil = require("../assets/profil.png");

const HomeScreenWallet = ({ navigation }) => {
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
            height: 220,
            width: "100%",
            marginTop: 10,
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
            <Text style={{ color: "#6ef216", marginLeft: "75%", fontSize: 21 }}>
              + 4.78%
            </Text>

            <View
              style={{
                top: 55,
                paddingLeft: 100,
                paddingRight: 0,
                bottom: 0,
                position: "absolute",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.03,
                color: "#6ef216",
              }}
            >
              <CornerLeftUp
                stroke="black"
                strokeWidth={2}
                width={300}
                height={300}
              />
            </View>

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
          profileImageSource={profil}
          onThirdIconPress={() => {
            if (notificationIcon === notification)
              setNotificationIcon(coloredNotification);
            else setNotificationIcon(notification);
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("HomeScreenCrypto")}
        >
          {renderContent()}
        </TouchableOpacity>

        <SearchBar
          fontColor="#c6c6c6"
          iconColor="#c6c6c6"
          cancelIconColor="#c6c6c6"
          placeholder="Search here"
          onChangeText={(text) => text && setSearch(text)}
          onPressCancel={() => {
            setSearch();
          }}
          style={{ width: "100%" }}
        />

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
                coin.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
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
      </SafeAreaView>
      <View style={styles.container}>
        <StatusBar backgroundColor="#fff" />
        <View style={styles.timeWrapper}>
          <Text
            style={{
              marginRight: 5,
              fontWeight: "bold",
              color: "black",
              fontSize: 17,
            }}
          >
            Send
          </Text>
          <LogOut
            stroke="black"
            strokeWidth={2}
            fill="#fff"
            width={20}
            height={20}
          />
          <Text style={[styles.time]}>Buy</Text>
          <PlusCircle
            stroke="black"
            strokeWidth={2}
            fill="#fff"
            width={20}
            height={20}
          />
          <Text style={[styles.time]}>Receive</Text>
          <LogIn
            stroke="black"
            strokeWidth={2}
            fill="#fff"
            width={20}
            height={20}
          />

          {/*
                    <BottomNavigation />

          
                */}
        </View>
      </View>
    </>
  );
};

const chartConfig = {
  padding: 100,
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(26, 255, 176, ${opacity})`,
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
    marginLeft: 40,
    marginRight: 5,
    fontWeight: "bold",
    color: "black",
    fontSize: 17,
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
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 20,
    lineHeight: 31,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: "white",
  },
});

export default HomeScreenWallet;
