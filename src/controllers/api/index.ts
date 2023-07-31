import { Request, Response } from "express";

module.exports = {
  listCars: async (req: Request, res: Response) => {
    console.log("List Cars");
  },

  createCar: async (req: Request, res: Response) => {
    console.log("Create Car");
  },

  logs: async (req: Request, res: Response) => {
    console.log("Logs");
  },
};
