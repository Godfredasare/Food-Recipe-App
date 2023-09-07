import { StyleSheet, Text, Pressable, Image, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";

const RecipeCard = ({ item, index, onPress }) => {
  let isEven = index % 2 == 0;
  let masonry = index % 3 == 0;
  return (
    <Animated.View
      entering={FadeInDown.duration(600)
        .delay(index * 100)
        .springify()
        .damping(12)}
    >
      <Pressable
        onPress={onPress}
        style={[
          styles.container,
          {
            paddingLeft: isEven ? 0 : 8,
            paddingRight: isEven ? 8 : 0,
            marginBottom: 15,
          },
        ]}
      >
        <View style={[styles.image, { height: masonry ? hp(23) : hp(32), backgroundColor: '#DCDCDf' }]}>
          <Animated.Image
            source={{ uri: item.strMealThumb }}
            style={[styles.image, { height: masonry ? hp(23) : hp(32) }]}
            sharedTransitionTag={item.strMeal}
            cachePolicy={"disk"}
          />
        </View>
        <Text style={styles.text} numberOfLines={1}>
          {item?.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
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
