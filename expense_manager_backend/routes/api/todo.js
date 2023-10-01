const express = require("express");
const router = express.Router();
const passport = require("passport");
const todocontroller = require("../../controller/api/todo");
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  todocontroller.create
);
router.get(
  "/getall",
  passport.authenticate("jwt", { session: false }),
  todocontroller.getall
);

router.get(
  "/get",
  passport.authenticate("jwt", { session: false }),
  todocontroller.gets
);
router.put(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  todocontroller.update
);
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  todocontroller.delete
);
module.exports = router;
