import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import {BellIcon} from 'react-native-heroicons/outline'

import avatar from '../../assets/images/avatar.png'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.wrap}
      >
        <View style={styles.header}>
            <Image source={avatar} style={{width: hp(5), height: hp(5)}} />
            <BellIcon size={hp(5)} color={'gray'} />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrap:{
    padding: 20,
    paddingBottom: 30,
    paddingTop: 30
  },
  header:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
