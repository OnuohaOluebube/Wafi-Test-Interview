const express = require("express");
const app = express();
const users = require("./routes/users");

app.use(express.json());
app.use("/users/", users);

const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`App Listening on port ${port}`);
});

module.exports = app;
