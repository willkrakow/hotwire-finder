import { Client } from "@googlemaps/google-maps-services-js";
import { Coordinates } from "../types";

const client = new Client();

const getNearbyHotels = async (center: Coordinates, radius: number) => {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) return;
  const outerRadius = radius * 1.2;

  const { data, status } = await client.placesNearby({
    params: {
      radius: outerRadius,
      key,
      location: center,
      type: "hotel",
    },
  });

  if (status !== 200) {
    throw new Error("Error fetching google maps");
  }
  return data;
};
