const express = require("express");
const router = express.Router();
const flightsDb = require("../helpers/flightsDb");

//get route
// router.get("/", async (req, res) => {
//   try {
//     const flights = await flightsDb.get();
//     res.status(200).json(flights);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "there was an error retrieving the flights" });
//   }
// });
router.get("/:id", async (req, res) => {
  try {
    console.log("req.params.id", req.params.id);
    const flights = await flightsDb.get(req.params.id);
    res.status(200).json(flights);
  } catch (error) {
    res
      .status(500)
      .json({ error: "there was an error retrieving the flights" });
  }
});
//post route
router.post("/", async (req, res) => {
  if (!req.body.flightName) {
    return res.status(400).json({ error: "please input flight name" });
  }
  if (!req.body.pilotID) {
    return res.status(400).json({ error: "please input pilot id" });
  }
  try {
    const flight = await flightsDb.insert(req.body);
    res.status(201).json(flight);
  } catch (error) {
    res.status(500).json({ error: "there was an error creating a flight" });
  }
});
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  if (!req.body.flightName) {
    return res.status(400).json({ error: "please input flight name" });
  }
  if (!req.body.pilotID) {
    return res.status(400).json({ error: "please input pilot id" });
  }
  try {
    const flight = await flightsDb.update(id, req.body);
    if (!flight) {
      res
        .status(400)
        .json({ error: "the flight with the specified id does not exist" });
    }
    res.status(200).json(req.body);
  } catch (error) {
    res
      .status(500)
      .json({ error: "there was an error in updating the flight" });
  }
});
//delete route
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const flight = await flightsDb.remove(id);
    if (!flight) {
      res
        .status(404)
        .json({ error: "the flight with the specified id does not exist" });
    }
    res.status(200).json({ message: "flight deleted" });
  } catch (error) {
    res.status(500).json({ error: "there was an error deleting the flight" });
  }
});
module.exports = router;
