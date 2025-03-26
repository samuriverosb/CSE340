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

invCont.management = async (req, res, next) => {
  let nav = await utilities.getNav();
  res.render("./inventory/management", {
    title: "Inventory Management",
    nav,
    errors: null
  })
}

invCont.addClassification = async (req, res, next) => {
  let nav = await utilities.getNav();
  res.render("./inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null
  })
}

invCont.newClassification = async (req, res) => {
  const { classification_name } = req.body

  const classResult = await invModel.newClassification(
    classification_name
  )

  let nav = await utilities.getNav()

  if (classResult) {
    req.flash(
      "notice",
      `${classification_name} added successfully!`
    )
    res.status(201).render("./inventory/management", {
      title: "Inventory Management",
      nav,
      errors: null
    })
  } else {
    req.flash("notice", "Sorry, the addition of a new Classification failed.")
    res.status(501).render("./inventory/management", {
      title: "Inventory Management",
      nav,
      errors: null
    })
  }
}

invCont.buildAddInventory = async (req, res, next) => {
  let nav = await utilities.getNav();
  let select = await utilities.renderSelect()
  res.render("./inventory/add-inventory", {
    title: "Add New Car",
    nav,
    errors: null,
    select
  })
}

invCont.newInventory = async (req, res) => {
  const { inv_make, inv_model, inv_year, inv_description, inv_price, inv_miles, inv_color, classification_id } = req.body

  const invResult = await invModel.newInventory(
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
  )

  let nav = await utilities.getNav()

  if (invResult) {
    req.flash(
      "notice",
      `Vehicle added successfully!`
    )
    res.status(201).render("./inventory/management", {
      title: "Inventory Management",
      nav,
      errors: null
    })
  } else {
    req.flash("notice", "Sorry, the addition of a new Vehicle failed.")
    res.status(501).render("./inventory/add-inventory", {
      title: "Add New Car",
      nav,
      errors: null
    })
  }
}

module.exports = invCont