require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnection = require("./db");

const controllers = require("./controllers");

app.use(require("./middleware/headers"));
// app.use(require("./middleware/validate-jwt"));

app.use(Express.json());

app.use("/user", controllers.User);
app.use("/note", controllers.Note);
app.use("/movie", controllers.Movie);

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(3000, () => {
            console.log(`[Server]: App is listening on 3000`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    })