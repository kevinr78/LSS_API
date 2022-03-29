const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { spawn } = require("child_process");
require("dotenv").config();
app.use(express.json());

const User = require("./models/userSchema");

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(process.env.DB_URL, connectionParams)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

app.get("/", async (req, res) => {
  res.status(200).send({ ok: true, message: "Success" });
});

app.post("/recommendations", async (req, res) => {
  try {
    let { userId, location, ToD } = req.body;
    console.log(userId);
    let checkIfCustomerExist = await User.findOne({ User_id: userId });
    if (!checkIfCustomerExist) {
      throw new Error("Sorry Customer does not exist");
    } else {
      console.log(checkIfCustomerExist);
    }

    const pyRecommendation = spawn("python", ["data.py", checkIfCustomerExist]);

    pyRecommendation.stdout.on("data", function (data) {
      return res.status(200).send({ ok: true, message: data.toString() });
    });

    pyRecommendation.stderr.on("data", (data) => {
      return res
        .status(400)
        .send({ ok: false, message: "Unable to generate recommendation" });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ ok: false, message: error.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server has started");
});
