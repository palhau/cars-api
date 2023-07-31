import { Request, Response, NextFunction  } from "express";

const whitelist = [
  "http://api-test.bhut.com.br:3000",
];

module.exports = (req: Request, res: Response, next: NextFunction) => {
  const { origin }: any = req.headers;

  if (whitelist.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, PATCH");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
};
