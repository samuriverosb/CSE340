const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

Util.buildDetailsView = async (data) => {
  return (`
    <div id="detailsMain">
      <div class="detailsImage">
        <img src="${data.inv_image}" alt="${data.inv_year} ${data.inv_make} ${data.inv_model}">
      </div>
      <div id="detailsMainData">
        <h2 class="detailsTitle">${data.inv_year} ${data.inv_make} ${data.inv_model}</h2>
        <div class="priceMileageContainer">
          <div class="mileageCont">
            <p class="mileageTitle">Mileage</p>
            <p class="mileage">${(data.inv_miles).toLocaleString("en-US")}</p>
          </div>
          <div class="priceCont">
            <p class="priceDetails">$${Number(data.inv_price).toLocaleString("en-US")}</p>
            <p class="legend">Does not include $299 Dealer Documentary Fee.</p>
            <p class="legend2">Estimate Payments</p>
          </div>
        </div>
        <div class="detailsData">
          <div class="detailsInfo">
            <p><b>Description: </b>${data.inv_description}</p>
            <p><b>Mileage: </b>${(data.inv_miles).toLocaleString("en-US")}</p>
            <p><b>Year: </b>${data.inv_year}</p>
            <p><b>Brand: </b>${data.inv_make}</p>
            <p><b>Model: </b>${data.inv_model}</p>
            <p><b>Color: </b>${data.inv_color}</p>
          </div>
          <div class="detailsButtons">
            <button class="purchaseButton">START MY PURCHASE</button>
            <button class="contactUsButton">CONTACT US</button>
            <button class="scheduleButton">SCHEDULE TEST DRIVE</button>
            <button class="financeButton">APPLY FOR FINANCING</button>
          </div>
        </div>
      </div>
    </div>
  `);
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util