const express = require("express")
const router = new express.Router()
const utilities = require("../utilities")
const invController = require("../controllers/invController")
const classValidator = require("../utilities/inventory-validation")

router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInvId))
router.get("/", utilities.handleErrors(invController.management))
router.get("/management", utilities.handleErrors(invController.management))
router.get("/add-classification", utilities.checkEmployeeOrAdmin, utilities.handleErrors(invController.addClassification));
router.post(
  "/add-classification",
  classValidator.classificationRules(),
  classValidator.checkClassData,
  utilities.handleErrors(invController.newClassification)
);
router.get("/add-inventory", utilities.checkEmployeeOrAdmin, utilities.handleErrors(invController.buildAddInventory));
router.post("/add-inventory",
  classValidator.inventoryRules(),
  classValidator.checkInventoryData,
  utilities.handleErrors(invController.newInventory)
)
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))
router.get("/edit/:invId", utilities.checkEmployeeOrAdmin, utilities.handleErrors(invController.editInventory))
router.post(
  "/edit/",
  classValidator.newInventoryRules(),
  classValidator.checkUpdateData,
  utilities.handleErrors(invController.updateInventory))

router.get("/delete/:invId", utilities.checkEmployeeOrAdmin, utilities.handleErrors(invController.buildDeleteInventory))
router.post("/delete", utilities.handleErrors(invController.deleteInventory))

module.exports = router;