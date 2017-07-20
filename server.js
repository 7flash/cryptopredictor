var express = require('express');
var app = express();
var getPriceHistory = require("./db-utils/getPriceHistory.js");
var priceHistoryPredictor = require("./predictors/priceHistoryPredictor.js");

var port = process.env.PORT || 8080;
var router = express.Router();
app.use("/api", router);

// Endpoint: /api/prediction
router.route('/prediction').get(function(req, res) {
   var dateString = req.query.date;

   // Get the price history from the database, make a prediction, and return it
   getPriceHistory.run(function(priceHistoryDocs) {
      var prediction = priceHistoryPredictor.run(
         priceHistoryDocs,
         new Date(dateString)
      );
      res.json({ prediction: prediction });
   });
   if (!prediction) {
      res.json({ error: "Could not make prediction." });
   }
});

app.listen(port);
console.log("Server started. Listening on port " + port + ".");
