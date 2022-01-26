const express = require("express");
const app = express();
const methodOverride = require("method-override");

const controllers = require("./Controllers");

const PORT = 4000;

app.set("view engine", "ejs");

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.use(methodOverride("_method"));
app.use("/", controllers.nft);

app.use("/explore", controllers.author);

app.use((req, res, next) => {
  console.log("I'm running for another new route");
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.get("/", function (req, res) {
  res.send("Here I am and working :)");
});

app.get("/*", (req, res) => {
  const context = { error: req.error };
  return res.status(404).render("404", context);
});

app.listen(PORT, () => {
  console.log(`I am listenting to ${PORT}`);
});
