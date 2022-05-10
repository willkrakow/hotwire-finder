import { Circle, Coordinates, Poi } from "../types";
import { findMidpointOfCircles, midpoint } from "./maps";

describe("src/utils/maps.ts", () => {
  describe("midpoint", () => {
    it("gets the midpoint of two coordinates", () => {
      const point1: Coordinates = {
        latitude: 50,
        longitude: 20,
      };
      const point2: Coordinates = {
        latitude: 50,
        longitude: 20,
      };

      const testMidpoint = midpoint(point1, point2);
      expect(testMidpoint.latitude).toBeCloseTo(point1.latitude);
      expect(testMidpoint.longitude).toBeCloseTo(point1.longitude);
    });
  });

  describe("getClosestMatchToPois", () => {
    it("gets the hotel that most nearly matches the poi distances", () => {
      const testHotels = [
        {
          name: "first",
          geometry: {
            location: {
              latitude: 20,
              longitude: 50,
            },
          },
        },
        {
          name: "second",
          geometry: {
            location: {
              latitude: 20,
              longitude: 50,
            },
          },
        },
      ];
      const testPois: Poi[] = [
        {
          coordinates: {
            latitude: 10,
            longitude: 50,
          },
          distance: {
            value: 10,
            distanceunit: "miles",
          },
          drivingTime: 10,
          walkingTime: 10,
          name: "asdf",
        },
      ];
    });
  });
});
