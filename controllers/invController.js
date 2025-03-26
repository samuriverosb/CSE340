const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
    errors: null
  })
}

invCont.buildByInvId = async (req, res, next) => {
  const inventory_id = req.params.invId;
  const data = await invModel.getInventoryDetails(inventory_id);
  const content = await utilities.buildDetailsView(data)
  let nav = await utilities.getNav();
  res.render("./inventory/details", {
    title: data.inv_make,
    nav,
    content,
    errors: null
  })
}

module.exports = invCont