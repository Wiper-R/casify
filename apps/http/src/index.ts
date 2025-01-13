import cookieParser from "cookie-parser";
import express from "express";
import "dotenv/config";
import { router as v1Router } from "./api/v1/";
import env from "./env";

const app = express();
app.use(cookieParser());
app.use(
  express.json({
    verify(req, _, buf) {
      // @ts-ignore
      req.rawBody = buf;
    },
  }),
);

// Routers
app.use("/api/v1/", v1Router);

app.listen(env.PORT);
console.log(`Server started on http://localhost:${env.PORT}`);
