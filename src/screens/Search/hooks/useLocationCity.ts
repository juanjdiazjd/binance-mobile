import { useEffect, useState } from "react";
import Geocoder from "react-native-geocoding";
import { LatLong } from "../../../types/Home/weather";

export const useLocationCity = (city: string) => {
  const [latLong, setLatLong] = useState({} as LatLong);

  const fetchData = async () => {
    Geocoder.from(city)
      .then((json) => {
        var location = json.results[0].geometry.location;
        setLatLong({ lat: location.lat, lon: location.lng });
      })
      .catch((error) => console.warn(error));
  };
  useEffect(() => {
    if (city) {
      fetchData();
    }
  }, [city]);

  return [latLong, setLatLong];
};
