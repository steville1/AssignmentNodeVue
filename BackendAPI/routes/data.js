const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, userById, read} = require('../controllers/auth');
const {GetByDateRange, GetLocationById} = require("../controllers/data");

router.get("/GetByDateRange/",requireSignin, isAuth,GetByDateRange);
router.get("/GetLocationById/",requireSignin, isAuth, GetLocationById);
router.param('userId', userById);

module.exports = router;