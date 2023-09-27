const express = require("express");
const router = express.Router();
const passport = require('passport')
const usercontoller = require("../../controller/api/user");
router.post("/sign-up", usercontoller.signup);
router.post("/sign-in", usercontoller.createsession);
module.exports = router;