import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import CustomButton from "../components/CustomButton";
import MealDetails from "../components/MealDetails";
import StarIcon from "../components/StarIcon";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { Meals } from "../data/test_data";

export default function DetailScreen(props) {
  const mealId = props.navigation.getParam("meal");
  const meal = Meals.find(({ id }) => {
    // id, "id from meal" // mealId, "param mealId"
    return id == mealId;
  });
  const goToHome = () => {
    props.navigation.popToTop();
  };

  const goToCategory = () => {
    props.navigation.pop();
  };

  return (
    <View style={{ flex: 1, height: "100%" }}>
      <View style={styles.screen}>
        <MealDetails meal={meal} />
      </View>
      <View style={styles.btncontainer}>
        <CustomButton onPressHandler={goToHome} style={styles.homeBtn}>
          go back to home
        </CustomButton>
      </View>
    </View>
  );
}

DetailScreen.navigationOptions = navigationData => {
  const onPressHandler = () => {
    console.log("hello world");
  };
  const mealId = navigationData.navigation.getParam("meal");
  const foundMeal = Meals.find(({ id }) => {
    return id == mealId;
  });
  let title;
  foundMeal.title.length > 20
    ? (title = "delicious")
    : (title = foundMeal.title);
  return {
    headerTitle: title,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={StarIcon}>
        <Item
          title="favorite_me"
          iconName="ios-star"
          onPress={onPressHandler}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column"
  },
  btncontainer: {
    justifySelf: "flex-end",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    marginBottom: 20
  },
  catBtn: {},
  homeBtn: {}
});
