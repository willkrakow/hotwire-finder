import { Circle, Coordinates } from "../types";
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
});
