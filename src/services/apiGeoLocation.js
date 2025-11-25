const BASE_URL = "https://geocode.maps.co/reverse";
const API_KEY = "68c15b3bca3a6476271860yaoa30afd";

export async function fetchGeolocation(lat, lng) {
  if (!lat || !lng) return;

  try {
    const res = await fetch(
      `${BASE_URL}?lat=${lat}&lon=${lng}&api_key=${API_KEY}`
    );
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}
