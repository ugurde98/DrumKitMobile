import { useCallback } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import DrumButton from "./src/components/DrumButton";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded] = useFonts({
    "Serif": require("./assets/fonts/PTSerif-Regular.ttf"),
    "Serif-Bold": require("./assets/fonts/PTSerif-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <ImageBackground
      onLayout={onLayoutRootView}
      style={styles.container}
      source={require("./assets/images/background.jpeg")}
    >
      <Text style={styles.headerText}>DrumKit Mobile</Text>
      <View style={styles.row}>
        <DrumButton text={"Boom"} play={"boom"} />
        <DrumButton text={"Clap"} play={"clap"} />
        <DrumButton text={"Hi Hat"} play={"hihat"} />
        <DrumButton text={"Kick"} play={"kick"} />
        <DrumButton text={"Open Hat"} play={"openhat"} />
        <DrumButton text={"Ride"} play={"ride"} />
        <DrumButton text={"Snare"} play={"snare"} />
        <DrumButton text={"Tink"} play={"tink"} />
        <DrumButton text={"Tom"} play={"tom"} />
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    margin: 2,
  },
  headerText: {
    color: "tomato",
    fontSize: 40,
    // fontWeight: "900",
    position: "absolute",
    top: 75,
    fontFamily:'Serif-Bold'
  },
});

export default App;
