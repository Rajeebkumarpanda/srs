const mongoose = require("mongoose");
const DB =process.env.DATABASE
mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected To mongoDb");
  })
  .catch((e) => {
    console.log("No Connection");
  });