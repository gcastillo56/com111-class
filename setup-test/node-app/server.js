const express = require("express");
const routes = require("./routes");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
