import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ViewPercent = ({ coin }) => (
  <View style={styles.containerItem}>
    <View>
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

export default ViewPercent;
