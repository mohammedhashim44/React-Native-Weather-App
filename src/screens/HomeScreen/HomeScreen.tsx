import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { Button, ImageBackground, ScrollView, View } from "react-native";

import AirQuality from "./AirQuality";
import Header from "./Header";
import TodayForcast from "./TodayForcast";
import WeekForcast from "./WeekForcast";
import AppText from "../../components/AppText";
import ErrorComponent from "../../components/ErrorComponent";
import LoadingComponent from "../../components/LoadingComponent";
import { getRandomeImage } from "../../data/BackgroundImages";
import TABS_ENUM from "../../navigation/TabsEnum";
import { apiService, localStorageService } from "../../services/services";
import { favoriteCityIDAtom } from "../../store/store";
import AppColors from "../../theme/Colors";

const HomeScreen = () => {
  const { data, isLoading, error, isIdle, mutate } = useMutation(
    ["weatherData"],
    (cityId: number) => apiService.fetchWeatherData(cityId),
  );
  const [hasFavotie, setHasFavotie] = useState<boolean>(true);
  const [favoriteCityID, setFavoriteCityID] = useAtom(favoriteCityIDAtom);

  useEffect(() => {
    const makeRequest = async () => {
      const favoriteCity = await localStorageService.getFavoriteCity();
      if (favoriteCity) {
        mutate(favoriteCity.id);
        setHasFavotie(true);
        setFavoriteCityID(favoriteCity.id);
      } else {
        setHasFavotie(false);
      }
    };

    makeRequest();
  }, [favoriteCityID]);

  if (!hasFavotie) {
    return <NoCities />;
  }

  if (isLoading || isIdle) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent message="Error" />;
  }

  return (
    <ImageBackground
      source={{ uri: getRandomeImage() }}
      style={{ backgroundColor: AppColors.backgroundColor }}
      className="h-full"
    >
      <ScrollView
        className="h-full px-4 py-12"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <Header todaySummary={data!.todaySummary} />
        <View style={{ height: 20 }} />
        <TodayForcast hours={data!.hourlyForcast} />
        <View style={{ height: 20 }} />
        <WeekForcast days={data!.daysForcast} />
        <View style={{ height: 20 }} />
        <AirQuality />
        <View style={{ height: 60 }} />
      </ScrollView>
    </ImageBackground>
  );
};

const NoCities = () => {
  const navigation = useNavigation();

  const navigateToAddCityTab = () => {
    navigation.navigate(TABS_ENUM.CITIES as never);
  };

  return (
    <ImageBackground
      source={{ uri: getRandomeImage() }}
      // imageStyle={{ objectFit: "cover" }}
      style={{ backgroundColor: AppColors.backgroundColor }}
      className="h-full"
    >
      <View
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        className="h-full items-center justify-center p-4 "
      >
        <AppText className="text-center" isBold>
          You don't have a favorite city Click here to add one
        </AppText>
        <View className="h-4" />
        <Button
          color={AppColors.backgroundColor}
          title="Add City"
          onPress={navigateToAddCityTab}
        />
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
