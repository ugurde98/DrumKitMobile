import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Animated,
} from "react-native";
import React, { useRef, useState } from "react";
import { Audio } from "expo-av";

const { height, width } = Dimensions.get("window");
const drumSounds = {
  clap: require("../../assets/sounds/clap.wav"),
  boom: require("../../assets/sounds/boom.wav"),
  hihat: require("../../assets/sounds/hihat.wav"),
  kick: require("../../assets/sounds/kick.wav"),
  openhat: require("../../assets/sounds/openhat.wav"),
  ride: require("../../assets/sounds/ride.wav"),
  snare: require("../../assets/sounds/snare.wav"),
  tink: require("../../assets/sounds/tink.wav"),
  tom: require("../../assets/sounds/tom.wav"),
};

const DrumButton = (params) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const [isAnimating, setIsAnimating] = useState(false);

  const playDrumSound = async (sound) => {
    setIsAnimating(true);
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2, // Büyüme değeri
        duration: 200, // Büyüme süresi (ms)
        useNativeDriver: false,
      }),
      Animated.timing(scaleValue, {
        toValue: 1, // Normal boyut
        duration: 200, // Küçülme süresi (ms)
        useNativeDriver: false,
      }),
    ]).start();

    const { sound: soundObject } = await Audio.Sound.createAsync(
      drumSounds[sound]
    );
    await soundObject.playAsync();
    setIsAnimating(false);
  };
  const animatedStyle = {
    transform: [{ scale: scaleValue }],
    borderColor: isAnimating ? "tomato" : "white",
  };

  const { play, text } = params;
  console.log("play: ", play);
  return (
    <TouchableOpacity onPress={() => playDrumSound(play)}>
      <Animated.View style={[styles.item, animatedStyle]}>
        <Text style={styles.buttonText}>{text}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default DrumButton;

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 22,
    color: "white",
    fontFamily: "Serif",
  },
  item: {
    width: width * 0.3,
    height: width * 0.3,
    margin: 5,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 4,
  },
});
