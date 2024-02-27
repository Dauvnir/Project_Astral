const express = require("express");
const cors = require("cors");
const pool = require("./db");
const manhwaRoutes = require("./routes");
const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.use("/manhwas", manhwaRoutes);

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

process.on("exit", () => {
	pool.end();
});
