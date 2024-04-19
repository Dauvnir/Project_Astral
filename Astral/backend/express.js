const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 3500;
const manhwaController = require("./controllers/controllerScanBot");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

// Connecting to database
pool
	.connect()
	.then(() => {
		console.log("Connected to the database");
		app.listen(PORT, () => {
			console.log(`Server is listening on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.error("Error connecting to the database:", error);
	});
//

//custom middleware logger
app.use(logger);
//

//middleware
const whitelist = ["https://localhost:3500", "https://localhost:5173"];
const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	optionsSuccessStatus: 200,
};
//Cross origin resource sharing
app.use(cors(corsOptions));
//middleware to handle urlencoded from data
app.use(express.urlencoded({ extended: false }));
//middleware for json
app.use(express.json());
//serve static files
app.use(express.static(path.join(__dirname, "../src")));
//routes
app.use("/manhwas", require("./routes/routesScanBot"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/authorized"));

//update database every 2 hours
setInterval(updateDB, 7200000); //7 200 000  it is 2 hour
async function updateDB() {
	try {
		await manhwaController.patchManhwaChapterAll();
		console.log("Database updated successfully.");
	} catch (error) {
		console.error("Error while updating database", error);
		throw error;
	}
}
//

// eslint-disable-next-line no-unused-vars
app.use(errorHandler);

process.on("exit", () => {
	pool.end();
});
