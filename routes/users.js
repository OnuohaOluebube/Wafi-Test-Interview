const express = require("express");

const router = express.Router();
const {
  createUser,
  getUsers,
  deposit,
  withdrawal,
  checkBalance,
  transfer,
} = require("../controllers/users");

router.post("/", createUser);

router.get("/", getUsers);

router.get("/:username/checkbalance/", checkBalance);

router.post("/:username/deposit/", deposit);

router.post("/:username/withdrawal/", withdrawal);

router.post("/:username/transfer/", transfer);

module.exports = router;
