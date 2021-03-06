import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableNativeFeedback,
  Platform
} from "react-native";
import { ScreenOrientation } from "expo";

export default function CategoryContainer(props) {
  const [dimensions, setDimensions] = useState({
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  });

  useEffect(() => {
    ScreenOrientation.addOrientationChangeListener(() => {
      setDimensions({
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width
      });
    });
  }, []);

  let TouchableCmpnt = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmpnt = TouchableNativeFeedback;
  }

  return (
    <View style={styles.gridItem}>
      <TouchableCmpnt style={{ flex: 1 }} onPress={props.onPressHandler}>
        <View
          style={{
            ...styles.container,
            backgroundColor: props.bgcolors
          }}
        >
          <View style={{ width: "80%", height: "80%" }}>
            <Image
              source={{
                uri: props.imgurl
              }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>{props.name}</Text>
        </View>
      </TouchableCmpnt>
    </View>
  );
}

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
    overflow:
      Platform.OS === "android" && Platform.Version >= 21
        ? "hidden"
        : "visible",
    elevation: 5
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    padding: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    fontFamily: "roboto-regular"
  },
  image: {
    width: "100%",
    height: "100%"
  }
});
