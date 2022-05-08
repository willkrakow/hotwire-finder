import { RequestHandler } from "express";
import { Circle } from "../types";
import { averagePointOfCircles } from "../utils/maps";
import { hotwireService } from "../services/hotwire";

export const getRecordLocation: RequestHandler = async (req, res) => {
  const { recordId } = req.params;
  try {
    const data = await hotwireService.getPois(recordId);
    const formattedPois: Circle[] = data.map((poi) => ({
      center: poi.coordinates,
      radius: poi.distance.value * 1.6,
    }));

    const centerPoint = averagePointOfCircles(formattedPois);
    res.json(centerPoint);
  } catch (err) {
    res.status(500).json({ err });
  }
};
