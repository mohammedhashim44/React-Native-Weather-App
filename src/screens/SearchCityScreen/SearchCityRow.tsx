import { useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import React from "react";

import AppCard from "../../components/AppCard";
import AppText from "../../components/AppText";
import City from "../../models/City";
import { localStorageService } from "../../services/services";
import { favoriteCityIDAtom } from "../../store/store";

const SearchCityRow = (props: { city: City }) => {
  const navigation = useNavigation();
  const city = props.city;
  const [favoriteCityID, setFavoriteCityID] = useAtom(favoriteCityIDAtom);

  const onCityClicked = async () => {
    try {
      await localStorageService.addCity(city);
      // if its the only city it will be the favorite
      const cities = await localStorageService.getCities();
      if (cities.length === 1) {
        setFavoriteCityID(city.id);
      }

      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const getAdminAreaText = () => {
    // admin1, admin2, admin3
    // can be null

    let s = "";
    if (city.admin1 !== undefined) {
      s += city.admin1;
    }
    if (city.admin2 !== undefined) {
      s += ", " + city.admin2;
    }
    if (city.admin3 !== undefined) {
      s += ", " + city.admin3;
    }
    return s;
  };

  return (
    <AppCard
      onPress={() => {
        onCityClicked();
      }}
    >
      <AppText isBold>{city.name}</AppText>
      <AppText className="text-sm" isBold>
        {city.country}
      </AppText>
      {getAdminAreaText() !== "" && (
        <AppText className="text-sm">{getAdminAreaText()}</AppText>
      )}
      <AppText className="text-sm">Time Zone:{city.timezone}</AppText>
    </AppCard>
  );
};

export default SearchCityRow;
