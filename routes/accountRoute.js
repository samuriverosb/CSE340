const express = require("express")
const router = new express.Router()
const utilities = require("../utilities")
const accountController = require("../controllers/accountController")
const reviewController = require("../controllers/reviewController")
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

router.get(
  "/",
  utilities.checkLogin,
  utilities.handleErrors(accountController.accountDefault));

router.get("/update/:accountId", utilities.checkLogin, utilities.handleErrors(accountController.buildUpdateAccount))
router.post(
  "/update", 
  utilities.checkLogin,
  regValidate.updateRules(),
  regValidate.checkUpdateData,
  utilities.handleErrors(accountController.updateAccount)
)
router.post(
  "/updatePassword",
  utilities.checkLogin,
  regValidate.updatePasswordRules(),
  regValidate.checkUpdatePasswordData,
  utilities.handleErrors(accountController.updatePassword)
)
router.get("/logout", utilities.handleErrors(accountController.logout))
router.get("/reviews/:accountId", utilities.checkLogin, utilities.handleErrors(reviewController.getReviewsByAccountId))

module.exports = router;