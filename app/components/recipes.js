import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MasonryList from '@react-native-seoul/masonry-list'
import { mealData } from "../data/fackeData";
import RecipeCard from "./recipeCard";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";

const Recipes = () => {
  return (
    <View>
      <Text style={styles.text}>Recipes</Text>

      <MasonryList
        data={mealData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, i }) => <RecipeCard item={item} index={i}/>}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};



export default Recipes;

const styles = StyleSheet.create({
    text:{
        fontSize: hp(3),
        fontWeight: '500',
        paddingBottom: 10
    }
});
