import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MasonryList from "@react-native-seoul/masonry-list";
import { mealData } from "../data/fackeData";
import RecipeCard from "./recipeCard";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import Loading from "./loading";
import Colors from  '../configs/color'

const Recipes = ({ categories, mealData }) => {
  const navigation = useNavigation();
  return (
    <View>
      <Text style={styles.text}>Recipes</Text>
      {categories == 0 || mealData == 0 ? <Loading size='large' color={Colors.primary} style={{paddingTop: 50}}/> : (
        <MasonryList
          contentContainerStyle={{ paddingBottom: 30 }}
          data={mealData}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }) => (
            <RecipeCard
              item={item}
              index={i}
              onPress={() => navigation.navigate("detail", item)}
            />
          )}
          onEndReachedThreshold={0.1}
        />
      )}
    </View>
  );
};

export default Recipes;

const styles = StyleSheet.create({
  text: {
    fontSize: hp(3),
    fontWeight: "500",
    paddingBottom: 10,
  },
});
