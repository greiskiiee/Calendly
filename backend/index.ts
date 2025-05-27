import express, { json } from "express";
import cors from "cors";
const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(8000, () => {
  console.log(`server running at http://localhost:8000`);
});
