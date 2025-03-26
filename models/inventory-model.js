const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications() {
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

const getInventoryDetails = async (inv_id) => {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      WHERE i.inv_id = $1`,
      [inv_id]
    )
    return data.rows[0];
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

const newClassification = async (classification_name) => {
  try {
    const sql = "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *"
    return await pool.query(sql, [classification_name])
  } catch (error) {
    return error.message
  }
}

async function checkExistingClassification(classification_id) {
  try {
    const sql = "SELECT * FROM classification WHERE classification_id = $1"
    const email = await pool.query(sql, [classification_id])
    return email.rowCount
  } catch (error) {
    return error.message
  }
}

const newInventory = async (
  inv_make,
  inv_model,
  inv_year,
  inv_description,
  inv_price,
  inv_miles,
  inv_color,
  classification_id
) => {
  try {
    const sql = "INSERT INTO inventory (inv_make, inv_model, inv_year, inv_description, inv_price, inv_miles, inv_color, classification_id, inv_image, inv_thumbnail) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *"
    return await pool.query(sql, [inv_make, inv_model, inv_year, inv_description, inv_price, inv_miles, inv_color, classification_id, "/images/vehicles/no-image.png", "/images/vehicles/no-image-tn.png"])
  } catch (error) {
    return error.message
  }
}

module.exports = { getClassifications, getInventoryByClassificationId, getInventoryDetails, newClassification, checkExistingClassification, newInventory }