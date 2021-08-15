const express = require("express");
const router = express.Router();

const { requireSignin, isAuth} = require('../controllers/auth');
const {GetByDateRange, GetLocationById} = require("../controllers/data");

router.get("/GetByDateRange", GetByDateRange,requireSignin, isAuth);
router.get("/GetLocationById", GetLocationById,requireSignin, isAuth);

module.exports = router;