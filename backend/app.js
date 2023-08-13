const express = require("express"),
    cors = require("cors"),
    morgan = require("morgan"),
    indexRoutes = require("./routes/posts.routes");

    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(morgan('dev'));

    app.use(indexRoutes);

    module.exports = app;