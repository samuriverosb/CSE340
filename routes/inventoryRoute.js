const express = require("express")
const router = new express.Router()
const utilities = require("../utilities")
const invController = require("../controllers/invController")
const classValidator = require("../utilities/inventory-validation")

router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInvId))
router.get("/management", utilities.handleErrors(invController.management))
router.get("/add-classification", utilities.handleErrors(invController.addClassification));
router.post(
  "/add-classification", 
  classValidator.classificationRules(),
  classValidator.checkClassData,
  utilities.handleErrors(invController.newClassification)
);
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory));
router.post("/add-inventory",
  classValidator.inventoryRules(),
  classValidator.checkInventoryData,
  utilities.handleErrors(invController.newInventory)
)

module.exports = router;