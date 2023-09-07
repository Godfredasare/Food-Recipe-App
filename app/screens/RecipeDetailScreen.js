import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ChevronLeftIcon, ClockIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import Colors from "../configs/color";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInDown } from "react-native-reanimated";
import axios from "axios";
import Loading from "../components/loading";
import ListIcon from "../components/listIcon";

const RecipeDetailScreen = ({ route }) => {
  const [favorite, setFavorite] = useState(false);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const item = route.params;

  const handleFavorite = () => {
    setFavorite(!favorite);
  };

  const fetchRecipes = async (id) => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      if (response && response.data) {
        setMeals(response.data.meals[0]);
      }
      setLoading(false);
    } catch (error) {
      console.log("Category error", error);
    }
  };

  useEffect(() => {
    fetchRecipes(item?.idMeal);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView>
        <View style={styles.wrapImage}>
          <Animated.Image
            sharedTransitionTag={item?.strMeal}
            source={{ uri: item.strMealThumb }}
            style={styles.image}
          />
        </View>

        <Animated.View
          entering={FadeInDown.duration(500).delay(100)}
          style={styles.wrapHeader}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.back}
          >
            <ChevronLeftIcon color={Colors.black} strokeWidth={wp(1)} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleFavorite} style={styles.favorite}>
            <HeartIcon color={favorite ? Colors.primary : "gray"} />
          </TouchableOpacity>
        </Animated.View>
        {loading ? (
          <View style={{ paddingTop: 70 }}>
            <Loading size="large" color={Colors.primary} />
          </View>
        ) : (
          <View style={styles.wrap}>
            <Text style={styles.name}>{meals?.strMeal}</Text>
            <Text style={styles.location}>{meals?.strArea}</Text>
            <View style={styles.listIcons}>
              <ListIcon
                icon={"ClockIcon"}
                strokeWidth={2}
                num={"35"}
                text={"Mins"}
              />
              <ListIcon
                icon={"UsersIcon"}
                strokeWidth={2}
                num={"03"}
                text={"Savings"}
              />
              <ListIcon
                icon={"FireIcon"}
                strokeWidth={2}
                num={"103"}
                text={"Cal"}
              />
              <ListIcon
                icon={"Square3Stack3DIcon"}
                strokeWidth={2}
                text={"Easy"}
                style={{bottom: 10, fontSize: hp(2) }}
              />
            </View>
          </View>
        )}
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
    marginTop: 7,
    marginLeft: 4,
    backgroundColor: "#DCDCDf",
    width: wp(98),
    height: hp(45),
    borderRadius: 25,
  },
  image: {
    width: wp(98),
    height: hp(45),
    borderRadius: 25,
  },
  wrapHeader: {
    flexDirection: "row",
    justifySelf: "space-between",
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
  wrap: {
    padding: 15,
    gap: 10,
  },
  name: {
    fontSize: hp(3),
    fontWeight: "600",
    color: " rgb(64 64 64)",
  },
  location: {
    fontSize: hp(2),
    fontWeight: "400",
    color: "rgb(115 115 115)",
  },
  listIcons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
  },
});
