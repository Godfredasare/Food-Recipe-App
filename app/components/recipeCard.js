import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const RecipeCard = ({ item, index }) => {
  let isEven = index % 2 == 0;
  let masonry = index % 3 == 0;
  return (
    <View>
      <Pressable
        style={[
          styles.container,
          {
            paddingLeft: isEven ? 0 : 8,
            paddingRight: isEven ? 8 : 0,
            marginBottom: 15,
          },
        ]}
      >
        <Image
          source={{ uri: item.image }}
          style={[styles.image, { height: masonry ? hp(25) : hp(32) }]}
        />
        <Text style={styles.text} numberOfLines={1}>
          {item?.name}
        </Text>
      </Pressable>
    </View>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    flex: 1,
  },
  image: {
    width: "100%",
    height: hp(32),
    borderRadius: 20,
  },
  text: {
    fontSize: hp(1.8),
    fontWeight: "400",
  },
});
