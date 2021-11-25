import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const CoinItem = ({ coin }) => (
  <LinearGradient
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    colors={["#64253d", "#cd6c92"]}
    style={{
      height: 50,
      width: "100%",
      marginTop: 0,
      borderTopLeftRadius: 48,
      borderBottomLeftRadius: 48,
      padding: 0,
    }}
  >
    <View style={styles.containerItem}>
      <View style={styles.coinName}>
        <Image source={{ uri: coin.image }} style={styles.image} />
        <View style={styles.containerNames}>
          <Text style={styles.text}>{coin.name}</Text>
          <Text style={styles.textSymbol}>{coin.symbol}</Text>
        </View>
        {/*<Image
          style={{ marginRight: 100, height: 15, width: 15 }}
          source={require("../assets/notification-colored.png")}
        />
        */}
      </View>
      <View>
        <Text style={styles.textPrice}>${coin.current_price}</Text>
        <Text
          style={[
            styles.pricePercentage,
            coin.price_change_percentage_24h > 0
              ? styles.priceUp
              : styles.priceDown,
          ]}
        >
          {coin.price_change_percentage_24h.toFixed(2)}%
        </Text>
      </View>
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  containerItem: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    height: "100%",
  },
  containerNames: {
    marginLeft: 10,
  },
  coinName: {
    flexDirection: "row",
    paddingLeft: 10,
  },
  text: {
    color: "#fff",
    paddingRight: 10,
  },
  textPrice: {
    color: "#fff",
    fontWeight: "bold",
    paddingRight: 10,
  },
  pricePercentage: {
    textAlign: "right",
    paddingRight: 10,
  },
  priceUp: {
    color: "#6ef216",
  },
  priceDown: {
    color: "#8B0000",
  },
  image: {
    width: 30,
    height: 30,
  },
  textSymbol: {
    color: "#c8cbfa",
    textTransform: "uppercase",
  },
});

export default CoinItem;
