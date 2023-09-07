import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import Colors from "../configs/color";
import * as Icon from "react-native-heroicons/outline";

const ListIcon = ({icon, num, text, strokeWidth, style}) => {
    const SelectedIcon = Icon[icon];

  return (
    <View style={styles.wrapDuration}>
      <View style={styles.wrapDurationIcon}>
        <SelectedIcon strokeWidth={strokeWidth} size={hp(4)} color={"#525252"} />
      </View>
      <Text style={styles.text}>{num}</Text>
      <Text style={[styles.text1, style]}>{text}</Text>
    </View>
  );
};

export default ListIcon;

const styles = StyleSheet.create({
  wrapDuration: {
    backgroundColor: Colors.primary,
    padding: 4,
    fkex: 1,
    width: hp(7.2),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    paddingBottom: 7
  },
  wrapDurationIcon: {
    backgroundColor: Colors.white,
    height: hp(6.5),
    width: hp(6.5),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40
  },
  text:{
    fontSize : hp(2),
    fontWeight: '600',
    color: '#525252'
  },
  text1:{
    fontSize : hp(1.3),
    fontWeight: '600',
    color: '#525252'
  }
});
