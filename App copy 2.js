import React from "react";
import { View, Text, Image, StatusBar, SafeAreaView } from "react-native";
import CounterInput from "react-native-counter-input";
import { LinearGradient } from "expo-linear-gradient";

import ProfileHeader from "react-native-profile-header";

const coloredNotification = require("./assets/notification-colored.png");
const notification = require("./assets/notification.png");

const App = () => {
  const [notificationIcon, setNotificationIcon] = React.useState(notification);

  const renderContent = () => (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={["#1646af", "#0b2d80"]}
      style={{
        height: 200,
        width: "100%",
        marginTop: 32,
        borderTopLeftRadius: 48,
        borderBottomLeftRadius: 48,
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
          thirdIconImageSource={notificationIcon}
          onThirdIconPress={() => {
            if (notificationIcon === notification)
              setNotificationIcon(coloredNotification);
            else setNotificationIcon(notification);
          }}
        />
        {renderContent()}
      </SafeAreaView>
    </>
  );
};

export default App;
