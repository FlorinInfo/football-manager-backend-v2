const express = require("express");
const sequelize = require("./src/db/sequelize").sequelize;
const cookieParser = require("cookie-parser");
const user_router = require("./src/routes/user");
const location_router = require("./src/routes/location");
const bodyParser = require('body-parser')
const cors = require('cors')
const ErrorMiddleware = require("./src/middlewares/ErrorMiddleware");

const app = express();
const port = 3001;
app.use(cors({credentials: true, origin: 'http://localhost:8080'}));
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/users", user_router);
app.use("/location", location_router);
app.use(ErrorMiddleware);


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
