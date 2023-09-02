import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { ImageBackground, ScrollView, TextInput, View } from "react-native";

import SearchCityRow from "./SearchCityRow";
import AppText from "../../components/AppText";
import ErrorComponent from "../../components/ErrorComponent";
import LoadingComponent from "../../components/LoadingComponent";
import { getRandomeImage } from "../../data/BackgroundImages";
import { apiService } from "../../services/services";
import AppColors from "../../theme/Colors";

const SearchCityScreen = () => {
  const { mutate, data, isLoading, error, isIdle } = useMutation(
    ["searchResult"],
    apiService.searchCity,
  );

  const onTextChange = (text: string) => {
    const query = text.trim();
    if (query.length >= 3) {
      mutate(query);
    }
  };

  const getSearchResultWidget = () => {
    if (isIdle) {
      return (
        <View className="flex flex-col justify-center items-center h-full">
          <AppText className="text-center">
            Start typing to search for a city
          </AppText>
        </View>
      );
    }
    if (isLoading) {
      return <LoadingComponent />;
    }

    if (error || data === undefined) {
      return <ErrorComponent message="Try search another city" />;
    }

    if (data !== undefined && data !== undefined)
      return (
        <View>
          {data.map((city) => {
            return (
              <View key={city.id} className="my-1">
                <SearchCityRow city={city} />
              </View>
            );
          })}
        </View>
      );

    return <AppText>Search for a city</AppText>;
  };

  // use memo for image background
  const imageBackground = React.useMemo(() => {
    return getRandomeImage();
  }, []);

  return (
    <ImageBackground
      source={{ uri: imageBackground }}
      style={{ backgroundColor: AppColors.backgroundColor }}
      className="h-full"
    >
      <ScrollView
        className="h-full px-6"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        showsVerticalScrollIndicator={false}
        bounces
      >
        <View className="h-10" />
        <AppText className="text-4xl text-bl">Search City</AppText>
        <View className="h-2" />

        <View className="flex flex-row items-center bg-white rounded-2xl p-2">
          <Ionicons name="search" size={24} color="black" />
          <View className="w-2" />
          <TextInput
            placeholder="Search for a city"
            keyboardType="default"
            className="flex-1 bg-transparent"
            onChangeText={onTextChange}
          />
        </View>

        <View className="h-2" />
        {getSearchResultWidget()}

        <View className="h-8" />
      </ScrollView>
    </ImageBackground>
  );
};

export default SearchCityScreen;
