import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import Colors from "../configs/color";

const Categories = ({ activeCategory, categories, handleChangeCategory }) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{ gap: 20 }}
      >
        {categories.map((cat, index) => (
          <TouchableOpacity
            key={cat.idCategory}
            onPress={() => handleChangeCategory(cat.strCategory)}
            style={styles.wrapCategory}
          >
            <View
              style={[
                styles.wrapCategoryImage,
                {
                  backgroundColor:
                    cat.strCategory === activeCategory
                      ? Colors.primary
                      : "#f0f0f0",
                },
              ]}
            >
              <Image
                source={{ uri: cat.strCategoryThumb }}
                style={styles.image}
              />
            </View>
            <Text>{cat.strCategory}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Animated.View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  image: {
    width: hp(6),
    height: hp(6),
    borderRadius: 25,
  },
  wrapCategory: {
    flexDirection: "column",
    alignItems: "center",
  },
  wrapCategoryImage: {
    padding: 5,
    borderRadius: 30,
  },
});
