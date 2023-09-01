import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Colors from "../configs/color";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import welcome from "../../assets/images/welcome.png";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
    const navigation = useNavigation()
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + hp(4.5))),
      100
    );
    setTimeout(
      () => (ring2padding.value = withSpring(ring2padding.value + hp(5))),
      300
    );

    setTimeout(() => navigation.navigate('Home'), 2500)
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Animated.View style={[styles.wrapImage, { padding: ring2padding }]}>
        <Animated.View style={[styles.wrapImage1, { padding: ring1padding }]}>
          <Image style={styles.Image} source={welcome} />
        </Animated.View>
      </Animated.View>

      <View style={styles.wrapText}>
        <Text style={styles.text}>Foody</Text>
        <Text style={styles.text1}>Food is always right</Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapImage: {
    backgroundColor: "rbg(rgba(255, 255, 255, 0.6))",
    alignItems: "center",
    borderRadius: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapImage1: {
    backgroundColor: "rbg(rgba(255, 255, 255, 0.4))",
    borderRadius: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  Image: {
    width: hp(20),
    height: hp(20),
  },
  wrapText: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp(8),
  },
  text:{
    color: Colors.white,
    fontSize: hp(7),
    fontWeight: '500'
  },
  text1:{
    color: Colors.white,
    fontSize: hp(2),
    fontWeight: '500'
  },
});
