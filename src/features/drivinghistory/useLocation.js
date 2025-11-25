import { fetchGeolocation } from "../../services/apiGeoLocation";
import { useQuery } from "@tanstack/react-query";
import { useUpdateCities } from "./useUpdates";
import { useEffect, useRef } from "react";

export function useLocation(lat, lng) {
  const {
    isLoading,
    data: location,
    error,
  } = useQuery({
    queryKey: ["location", lat, lng],
    queryFn: () => fetchGeolocation(lat, lng),
    enabled: lat != null && lng != null,
  });

  return { isLoading, location, error };
}

export function useDrivingCities({
  id,
  startCoords,
  endCoords,
  startCityDb,
  endCityDb,
}) {
  const hasCitiesInDb = Boolean(startCityDb && endCityDb);

  const [startLat, startLng] = hasCitiesInDb
    ? [null, null]
    : startCoords
    ? String(startCoords).split(",")
    : [null, null];

  const [endLat, endLng] = hasCitiesInDb
    ? [null, null]
    : endCoords
    ? String(endCoords).split(",")
    : [null, null];

  const { isLoading: isLoadingStartLocation, location: startLocation } =
    useLocation(startLat, startLng);

  const { isLoading: isLoadingEndLocation, location: endLocation } =
    useLocation(endLat, endLng);

  const { updateCitiesDB } = useUpdateCities();

  const startCity =
    startLocation?.address?.city ||
    startLocation?.address?.town ||
    startLocation?.address?.village ||
    "Unknown";
  const endCity =
    endLocation?.address?.city ||
    endLocation?.address?.town ||
    endLocation?.address?.village ||
    "Unknown";

  // Update only if the values have changed
  const prev = useRef({ startCity: null, endCity: null });

  useEffect(() => {
    // if DB already has both cities, do nothing
    if (startCityDb && endCityDb) return;

    if (
      id &&
      startCity &&
      endCity &&
      startCity !== "Unknown" &&
      endCity !== "Unknown" &&
      (prev.current.startCity !== startCity || prev.current.endCity !== endCity)
    ) {
      updateCitiesDB({
        id,
        startCity,
        endCity,
      });
      prev.current = { startCity, endCity };
    }
  }, [id, startCity, endCity, updateCitiesDB, startCityDb, endCityDb]);

  return { isLoadingStartLocation, isLoadingEndLocation };
}
