import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";

import avatar from "../../assets/images/avatar.png";
import Colors from "../configs/color";
import { TextInput } from "react-native";
import Categories from "../components/categories";
import axios from "axios";
import Recipes from "../components/recipes";

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  const handleChangeCategory = (category) => {
    fetchRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );

      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log("Category error", error);
    }
  };
  const fetchRecipes = async (category = "Beef") => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      // console.log(response.data)
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (error) {
      console.log("Category error", error);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchRecipes();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.wrap}
        contentContainerStyle={{ gap: 25 }}
      >
        <View style={styles.header}>
          <Image source={avatar} style={{ width: hp(5), height: hp(5) }} />
          <BellIcon size={hp(4)} color={"gray"} />
        </View>

        <View>
          <Text style={styles.text}>Hello, Godfred</Text>
          <Text style={styles.text1}>
            Make your own food stay at{" "}
            <Text style={{ color: Colors.primary }}>home</Text>
          </Text>
        </View>

        <View style={styles.searchWrap}>
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.7), fontWeight: "400" }}
          />
          <View style={styles.wrapIcon}>
            <MagnifyingGlassIcon size={hp(2.5)} color={"gray"} />
          </View>
        </View>

        {/* categories */}
        {categories.length > 0 && (
          <Categories
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            categories={categories}
            handleChangeCategory={handleChangeCategory}
          />
        )}

        {/* recipes */}
        <View>
          <Recipes mealData={meals} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  wrap: {
    padding: 10,
    paddingBottom: 50,
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: hp(1.7),
    color: "gray",
    fontWeight: "600",
  },
  text1: {
    fontSize: hp(3.7),
    color: Colors.black,
    fontWeight: "600",
  },
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#DCDCDf",
    padding: 5,
    borderRadius: 20,
    paddingLeft: 10,
  },
  wrapIcon: {
    padding: 7,
    borderRadius: 25,
    backgroundColor: Colors.white,
  },
});
