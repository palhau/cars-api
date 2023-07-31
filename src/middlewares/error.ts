import { Request, Response } from "express";

module.exports = (req: Request, res: Response) => {
  res.status(404).json({
    message: 'Not Found',
  });
};
