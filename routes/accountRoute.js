const express = require("express")
const router = new express.Router()
const utilities = require("../utilities")
const accountController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')

router.get("/login", utilities.handleErrors(accountController.buildLogin));
router.get("/register", utilities.handleErrors(accountController.buildRegister));
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkloginData,
  utilities.handleErrors(accountController.accountLogin)
)

router.get("/", utilities.handleErrors(accountController.accountDefault));

module.exports = router;