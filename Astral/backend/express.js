const express = require("express");
const cors = require("cors");
const pool = require("./db");
const manhwaRoutes = require("./routes");
const manhwaController = require("./controller");
const app = express();

// Connecting to database
pool
	.connect()
	.then(() => {
		console.log("Connected to the database");
		app.listen(3000, () => {
			console.log("Server is listening on port 3000");
		});
	})
	.catch((error) => {
		console.error("Error connecting to the database:", error);
	});

//middleware
app.use(cors());
app.use(express.json());
app.use("/manhwas/methods/addAll", (req, res) => {
	res.status(403).send("Forbidden");
});
app.use("/manhwas", manhwaRoutes);

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

process.on("exit", () => {
	pool.end();
});
