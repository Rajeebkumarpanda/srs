const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const cookieParser = require('cookie-parser');
const express = require("express");
const app = express();
const PORT = process.env.PORT;
// const cors = require('cors')
const router = require("./routes/auth");

require("./db/conn");
app.use(express.json());
// app.use(cors())
app.use(cookieParser());
app.use(router);

app.listen(PORT, () => {
  console.log(`Listening to the PORT: ${PORT}`);
});
