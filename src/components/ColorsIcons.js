import React, { useState } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ColorIcons = ({
  index,
  setBackgroundColor,
  setMainTextColor,
  colors,
}) => {
  const toggleDisabled = (i) => {
    colors[index][i].disabled = true;
    setBackgroundColor(colors[index][i].color);
    console.log(colors[index][i].disabled);
    for (var x = 0; x < colors[index].length; x++) {
      if (colors[index][x].disabled && x != i) {
        colors[index][x].disabled = false;
      }
    }
  };
  console.log(colors);
  const ReturnColors = () => {
    let array1 = colors[index].slice(0, colors[index].length / 2);
    let array2 = colors[index].slice(
      colors[index].length / 2,
      colors[index].length
    );

    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          {array1.map((item, i) => (
            <Ionicons
              key={i}
              name="color-palette"
              size={48}
              color={item.color}
              onPress={() => toggleDisabled(i)}
            />
          ))}
        </View>
        <View style={{ flexDirection: "row" }}>
          {array2.map((item, i) => (
            <Ionicons
              key={i}
              name="color-palette"
              size={48}
              color={item.color}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <ReturnColors></ReturnColors>
    </View>
  );
};

export default ColorIcons;
