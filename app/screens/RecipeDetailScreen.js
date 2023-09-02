import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import Colors from "../configs/color";
import { useNavigation } from "@react-navigation/native";
import Animated, {sharedTransitionTag} from "react-native-reanimated";

const RecipeDetailScreen = ({ route }) => {
  const [favorite, setFavorite] = useState(false);

  const navigation = useNavigation();
  const item = route.params;

  const handleFavorite = () => {
    setFavorite(!favorite);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView>
        <View style={styles.wrapImage}>
          <Animated.Image
            sharedTransitionTag={item.strMeal}
            source={{ uri: item.strMealThumb }}
            style={styles.image}
          />
        </View>

        <View style={styles.wrapHeader}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.back}
          >
            <ChevronLeftIcon color={Colors.black} strokeWidth={wp(1)} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleFavorite} style={styles.favorite}>
            <HeartIcon color={favorite ? Colors.primary : "gray"} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default RecipeDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapImage: {
    paddingTop: 7,
    paddingLeft: 4,
  },
  image: {
    width: wp(98),
    height: hp(45),
    borderRadius: 25,
  },
  wrapHeader: {
    flexDirection: "row",
    justifySelf: "spave-between",
    alignItems: "center",
    position: "absolute",
    top: 40,
    // zIndex: 1,
    gap: wp(68),
  },
  back: {
    backgroundColor: Colors.white,
    padding: 7,
    borderRadius: 20,
    marginLeft: 20,
  },
  favorite: {
    backgroundColor: Colors.white,
    padding: 7,
    borderRadius: 20,
  },
});
