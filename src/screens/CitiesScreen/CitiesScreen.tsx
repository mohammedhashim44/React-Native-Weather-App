import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  TouchableNativeFeedback,
  ImageBackground,
} from "react-native";

import CityCard from "./CityCard";
import AppText from "../../components/AppText";
import { getRandomeImage } from "../../data/BackgroundImages";
import City from "../../models/City";
import { localStorageService } from "../../services/services";
import { favoriteCityIDAtom } from "../../store/store";
import AppColors from "../../theme/Colors";

const CitiesScreen = () => {
  return (
    <ImageBackground
      source={{ uri: getRandomeImage() }}
      imageStyle={{ objectFit: "cover" }}
      style={{ backgroundColor: AppColors.backgroundColor }}
      className="h-full"
    >
      <ScrollView
        className="flex-1 h-full py-12 "
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <View className="px-6">
          <AppText className="text-4xl text-bl">Weather</AppText>
          <View className="h-2" />
          <SearchCityInput />
          <View className="h-2" />
        </View>
        <View className="h-full">
          <CitiesList />
        </View>
        <View className="h-20" />
      </ScrollView>
    </ImageBackground>
  );
};

const SearchCityInput = () => {
  const navigation = useNavigation();
  const onSearchCityClicked = () => {
    navigation.navigate("SearchCity" as never);
  };

  return (
    <TouchableNativeFeedback onPress={onSearchCityClicked}>
      <View className="flex flex-row items-center bg-white rounded-2xl p-2">
        <Ionicons name="search" size={24} color="black" />
        <View className="w-2" />
        <AppText className="flex-1 text-black">Search for a city</AppText>
      </View>
    </TouchableNativeFeedback>
  );
};

const CitiesList = () => {
  // load cities from storage
  const [cities, setCities] = useState<City[]>([]);
  const [_, setFavoriteCityID] = useAtom(favoriteCityIDAtom);

  const navigation = useNavigation();

  const getCities = async () => {
    try {
      const data = await localStorageService.getCities();
      setCities(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onCityDeleted = async (cityId: number) => {
    await localStorageService.deleteCityById(cityId);
    getCities();
    // get new favorite city and set it
    const newFavoriteCity = await localStorageService.getFavoriteCity();
    console.log("NEW FAVOURITE CITY", newFavoriteCity?.name);
    setFavoriteCityID(newFavoriteCity?.id ?? -1);
  };

  const onCityFavoriteClicked = async (cityId: number) => {
    await localStorageService.saveFavoriteCity(cityId);
    setFavoriteCityID(cityId);
  };

  useEffect(() => {
    // get cities from storage whenever the screen is focused
    const unsubscribe = navigation.addListener("focus", () => {
      getCities();
    });

    getCities();

    return unsubscribe;
  }, [navigation]);

  if (cities.length === 0) return <YouHaveNoCities />;

  return (
    <View>
      {cities.map((city) => (
        <View key={city.id} className="my-2">
          <CityCard
            city={city}
            onDeleted={() => onCityDeleted(city.id)}
            onMakeFavoriteClicked={() => onCityFavoriteClicked(city.id)}
          />
        </View>
      ))}
    </View>
  );
};

const YouHaveNoCities = () => {
  return (
    <View className="h-96 p-4  items-center justify-center text-center">
      <AppText>You have 0 cities in your list</AppText>
      <View className="h-4" />
      <AppText className="text-center" isBold>
        Search for a city and add it to your list to see its weather
      </AppText>
    </View>
  );
};

export default CitiesScreen;
