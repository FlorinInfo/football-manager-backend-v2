const express = require("express");
const sequelize = require("./src/db/sequelize").sequelize;
const cookieParser = require("cookie-parser");
const user_router = require("./src/routes/user");
const bodyParser = require('body-parser')

const app = express();
const port = 3000;
app.use(bodyParser.json());

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
