const express = require("express");
const sequelize = require("./src/db/sequelize").sequelize;
const { User } = require("./src/db/sequelize");

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (err) {
    res.send(err);
  }
});

const authToDB = async () => {
  try {
    await sequelize.authenticate();
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

authToDB();
