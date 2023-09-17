const express = require("express");
const studentExpressRoute = express.Router();
const cors = require("cors");
let StudentSchema = require("../model/student.model");
// CORS OPTIONS
var whitelist = ["http://localhost:8100", "http://localhost:4000"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    };
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions);
};
// Get users
studentExpressRoute
  .route("/", cors(corsOptionsDelegate))
  .get(async (req, res, next) => {
    await StudentSchema.find()
      .then((result) => {
        res.json({
          data: result,
          message: "Data successfully fetched!",
          status: 200,
        });
      })
      .catch((err) => {
        return next(err);
      });
  });
// Create user
studentExpressRoute.route("/create-student").post(async (req, res, next) => {
  await StudentSchema.create(req.body)
    .then((result) => {
      console.log(result);
      res.json({
        data: result,
        message: "Data successfully added.",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});
// Get single user
studentExpressRoute.route("/get-student/:id").get(async (req, res, next) => {
  await StudentSchema.findById(req.params.id, req.body)
    .then((result) => {
      res.json({
        data: result,
        message: "Data successfully retrieved.",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});
// Update user
studentExpressRoute.route("/update-student/:id").put(async (req, res, next) => {
  await StudentSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  })
    .then((result) => {
      res.json({
        data: result,
        msg: "Data successfully updated.",
      });
    })
    .catch((err) => {
      return next(err);
    });
});
// Delete student
studentExpressRoute.route("/remove-student/:id").delete(async (req, res) => {
  await StudentSchema.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        msg: "Data successfully updated.",
      });
    })
    .catch((err) => {
      return next(err);
    });
});
module.exports = studentExpressRoute;
