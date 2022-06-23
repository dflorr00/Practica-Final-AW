process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const passport = require("passport");

require("./middleware/passport");



const port = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

app.listen(port);


app.use("/api", require("./routes/login"));
app.use("/api/register", require("./routes/register"));
app.use("/api", passport.authenticate('jwt', { session: false }), require("./routes/messages"))
app.use("/api/users", passport.authenticate('jwt', { session: false }), require("./routes/users"));
app.use("/api/groups", passport.authenticate('jwt', { session: false }), require("./routes/groups"));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("../frontend/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../../frontend", "build", "index.html"));
    });
}


console.log("Server Listening at http://localhost:" + port);