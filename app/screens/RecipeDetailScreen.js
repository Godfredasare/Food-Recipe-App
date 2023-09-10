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
import YoutubePlayer from "react-native-youtube-iframe";

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

  const ingredientsIndexes = (meals) => {
    if (!meals) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meals["strIngredient" + i]) {
        indexes.push(i);
      }
    }

    return indexes;
  };

  const getYouTubeVideoId = (youtubeUrl) => {
    // Match the video ID using a regular expression
    const regex = /[?&]v=([^?&]+)/;
    const match = youtubeUrl.match(regex);

    if (match && match[1]) {
      return match[1];
    } else {
      // Handle invalid or unrecognized URLs
      return null;
    }
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
                style={{ bottom: 10, fontSize: hp(2) }}
              />
            </View>
            <View>
              <Text
                style={{
                  color: "rgb(64 64 64)",
                  fontWeight: "500",
                  fontSize: hp(2.5),
                }}
              >
                Ingredients
              </Text>
              <View>
                {ingredientsIndexes(meals).map((i) => (
                  <View style={styles.wrapIngredient} key={i}>
                    <View
                      style={{
                        width: hp(1.7),
                        height: hp(1.7),
                        backgroundColor: Colors.primary,
                        borderRadius: 20,
                      }}
                    />
                    <View style={styles.ingredient}>
                      <Text
                        style={{ color: "rgb(38 38 38)", fontSize: hp(1.7) }}
                      >
                        {meals["strMeasure" + i]}
                      </Text>
                      <Text
                        style={{ color: "rgb(64 64 64)", fontSize: hp(1.7) }}
                      >
                        {meals["strIngredient" + i]}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <View>
              <Text
                style={{
                  color: "rgb(64 64 64)",
                  fontWeight: "500",
                  fontSize: hp(2.5),
                }}
              >
                Intructions
              </Text>
              <Text
                style={{
                  color: "rgb(64 64 64)",
                  fontWeight: "400",
                  fontSize: hp(1.6),
                }}
              >
                {meals?.strInstructions}
              </Text>

              
            </View>
            {meals?.strYoutube && (
              <View style={{ gap: 10 }}>
                <Text
                  style={{
                    color: "rgb(64 64 64)",
                    fontWeight: "500",
                    fontSize: hp(2.5),
                  }}
                >
                  Recipe Video
                </Text>
                <YoutubePlayer
                  videoId={getYouTubeVideoId(meals?.strYoutube)}
                  height={hp(30)}
                />
              </View>
            )}
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
  wrapIngredient: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingVertical: 5,
  },
  ingredient: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
});
