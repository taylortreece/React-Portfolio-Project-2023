require("dotenv").config();
var express = require("express");
var router = express.Router();
const mysql = require("mysql2");

/* GET home page. */
router.get("/", function (req, res, next) {
	res.send({ hello: "world" });
});

router.get("/database-test", async (req, res, next) => {
	const connection = mysql.createConnection({
		host: process.env.HOST,
		user: process.env.USER,
		database: process.env.DATABASE,
		password: process.env.PASSWORD,
	});

	const statement = "SELECT * FROM test_table";

	const testTableValue = connection.query(
		statement,
		function (err, result, fields) {
			if (err) throw err;
			console.log(result);
		}
	);

	console.log(testTableValue);
	res.send({ showTablesResponse: testTableValue });
});

module.exports = router;
