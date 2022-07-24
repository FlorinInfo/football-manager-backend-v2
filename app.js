const express = require("express");
const sequelize = require("./src/db/sequelize").sequelize;
const user_router = require("./src/routes/user");

const app = express();
const port = 3000;

app.use("/users", user_router);

(async () => {
  try {
    await sequelize.authenticate();
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
