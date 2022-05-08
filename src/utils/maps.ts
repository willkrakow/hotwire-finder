import type { Coordinates as LatLngCoordinateType, Circle } from "../types";

export const EARTH_RADIUS_IN_METERS = 6378137;

export const haversineFormula = (
  firstPoint: LatLngCoordinateType,
  secondPoint: LatLngCoordinateType
) => {
  // latitude of point 1 and latitude of point 2 (in radians),
  const { latitude: lat1, longitude: lng1 } = firstPoint;
  const { latitude: lat2, longitude: lng2 } = secondPoint;

  const lat1Rad = (lat1 * Math.PI) / 180;
  const lat2Rad = (lat2 * Math.PI) / 180;

  // longitude of point 1 and longitude of point 2 (in radians).
  const lon1Rad = ((lat2 - lat1) * Math.PI) / 180;
  const lon2Rad = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(lon1Rad / 2) * Math.sin(lon1Rad / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(lon2Rad / 2) *
      Math.sin(lon2Rad / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_IN_METERS * c;
};

export const bearing = (
  firstPoint: LatLngCoordinateType,
  secondPoint: LatLngCoordinateType
) => {
  const { latitude: lat1, longitude: lng1 } = new Coordinate(
    firstPoint.latitude,
    firstPoint.longitude
  ).radians;
  const { latitude: lat2, longitude: lng2 } = new Coordinate(
    secondPoint.latitude,
    secondPoint.longitude
  ).radians;

  const y = Math.sin(lng2 - lng1) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1);
  const θ = Math.atan2(y, x);
  const bearing = ((θ * 180) / Math.PI + 360) % 360;
  return bearing;
};

export const destination = (
  point: LatLngCoordinateType,
  bearingDegrees: number,
  distance: number
): LatLngCoordinateType => {
  const angularDistance = distance / EARTH_RADIUS_IN_METERS;
  const { latitude: lat1, longitude: lng1 } = new Coordinate(
    point.latitude,
    point.longitude
  ).radians;
  const bearingRadians = toRadians(bearingDegrees);
  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(angularDistance) +
      Math.cos(lat1) * Math.sin(angularDistance) * Math.cos(bearingRadians)
  );
  const lng2 =
    lng1 +
    Math.atan2(
      Math.sin(bearingRadians) * Math.sin(angularDistance) * Math.cos(lat1),
      Math.cos(angularDistance) - Math.sin(lat1) * Math.sin(lat2)
    );
  return { latitude: lat2, longitude: lng2 };
};

export const midpoint = (
  point1: LatLngCoordinateType,
  point2: LatLngCoordinateType
): LatLngCoordinateType => {
  const { latitude: lat1, longitude: lng1 } = new Coordinate(
    point1.latitude,
    point1.longitude
  ).radians;
  const { latitude: lat2, longitude: lng2 } = new Coordinate(
    point2.latitude,
    point2.longitude
  ).radians;

  const dLong = lng2 - lng1;
  const Bx = Math.cos(lat2) * Math.cos(dLong);
  const By = Math.cos(lat2) * Math.sin(dLong);
  const lat3 = Math.atan2(
    Math.sin(lat1) + Math.sin(lat2),
    Math.sqrt((Math.cos(lat1) + Bx) * (Math.cos(lat1) + Bx) + By * By)
  );
  const lng3 = lng1 + Math.atan2(By, Math.cos(lat1) + Bx);

  return { latitude: toDegrees(lat3), longitude: toDegrees(lng3) };
};

export const findMidpointOfCircles = (circle1: Circle, circle2: Circle) => {
  const bearing1 = bearing(circle1.center, circle2.center);
  const bearing2 = bearing(circle2.center, circle1.center);
  const nearestOnSphere1 = destination(
    circle1.center,
    bearing1,
    circle1.radius
  );
  const nearestOnSphere2 = destination(
    circle2.center,
    bearing2,
    circle2.radius
  );
  console.log(nearestOnSphere1, bearing1, bearing2);
  console.log(nearestOnSphere2);
  return midpoint(nearestOnSphere1, nearestOnSphere2);
};

export const sphericalAveragePoint = (points: LatLngCoordinateType[]) => {
  const count = points.length;
  if (count === 0) return;

  const initialPoint = points[0];
  if (count === 1) return initialPoint;

  const sum = points.reduce((acc, curr) => {
    acc.latitude += curr.latitude;
    acc.longitude += curr.longitude;
    return acc;
  }, initialPoint);

  const average: LatLngCoordinateType = {
    latitude: sum.latitude / count,
    longitude: sum.longitude / count,
  };

  return average;
};

export const averagePointOfCircles = (pois: Circle[]) => {
  let averages: LatLngCoordinateType[] = [];
  pois.forEach((targetPoi) => {
    const remainingPoints = pois.filter(
      (p) =>
        p.center.latitude !== targetPoi.center.latitude &&
        p.center.longitude !== targetPoi.center.longitude
    );
    remainingPoints.forEach((remainingPoint) => {
      const center = findMidpointOfCircles(remainingPoint, targetPoi);
      averages.push(center);
    });
  });

  return sphericalAveragePoint(averages);
};

export const toRadians = (d: number) => (d * Math.PI) / 180;
export const toDegrees = (r: number) => (r * 180) / Math.PI;

class Coordinate {
  latitude: number;
  longitude: number;
  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  get latlng() {
    return {
      latitude: this.latitude,
      longitude: this.longitude,
    };
  }

  get radians() {
    return {
      latitude: toRadians(this.latitude),
      longitude: toRadians(this.longitude),
    };
  }
}
