import { Request, Response } from "express";

const router = require("express-promise-router")();

const API = require("@Routes/api");

router.route("/").get((req: Request, res: Response) => {
  res.status(200).json({
    message: "Enjoy the silence",
  });
});

router.use("/api", API);

module.exports = router;
