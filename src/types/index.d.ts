export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type Circle = {
  center: Coordinates;
  radius: number;
};

export type Poi = {
  name: string;
  distance: Distance;
  coordinates: Coordinates;
  walkingTime: any;
  drivingTime: any;
};

export type Distance = {
  value: number;
  distanceunit: "miles" | "kilometers";
};
