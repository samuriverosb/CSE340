const invModel = require("../models/inventory-model")
const reviewModel = require("../models/review-model")
const utilities = require("../utilities/")

let reviewController = {}

reviewController.addReview = async (req, res, next) => {
  const { review_text, inv_id } = req.body
  const account_id = res.locals.accountData.account_id
  const reviewResult = await reviewModel.addNewReview(
    review_text,
    inv_id,
    account_id
  )
  let nav = await utilities.getNav()
  const data = await invModel.getInventoryDetails(inv_id);
  const reviews = await reviewModel.getReviewsByInvId(inv_id)
  const content = await utilities.buildDetailsView(data)
  const reviewContent = await utilities.buildReviews(reviews, account_id)

  if (reviewResult) {
    req.flash(
      "notice",
      `Review added successfully!`
    )
    res.status(201).render("./inventory/details", {
      title: data.inv_make,
      nav,
      content,
      reviewContent,
      review_text: "",
      inventory_id: inv_id,
      account_id: account_id,
      loggedin: res.locals.loggedin,
      errors: null
    })
  } else {
    req.flash("notice", "Sorry, the addition of a new Review failed.")
    res.status(501).render("./inventory/details", {
      title: data.inv_make,
      nav,
      content,
      reviewContent,
      inventory_id: inv_id,
      review_text,
      account_id: account_id,
      loggedin: res.locals.loggedin,
      errors: null
    })
  }
}

reviewController.editReview = async (req, res, next) => {
  const review_id = parseInt(req.params.reviewId)
  let nav = await utilities.getNav()
  const reviewData = await reviewModel.getReviewsByReviewId(review_id)
  res.render("./inventory/edit-review", {
    title: "Edit Review",
    nav,
    review_text: reviewData.review_text,
    review_id: reviewData.review_id,
    errors: null
  })
}

reviewController.updateReview = async (req, res, next) => {
  const { review_text, review_id } = req.body
  console.log(review_text, review_id)
  let nav = await utilities.getNav()
  const reviewResult = await reviewModel.updateReview(
    review_text,
    review_id
  )
  console.log(reviewResult)
  if (reviewResult) {
    req.flash("notice", "Review updated successfully")
    res.redirect("/inv/detail/" + reviewResult.inv_id)
  } else {
    req.flash("notice", "Sorry, the update of the Review failed.")
    res.status(501).render("./inventory/edit-review", {
      title: "Edit Review",
      nav,
      review_text,
      review_id,
      errors: null
    })
  }
}

reviewController.deleteReviewView = async (req, res, next) => {
  const review_id = parseInt(req.params.reviewId)
  let nav = await utilities.getNav()
  const reviewData = await reviewModel.getReviewsByReviewId(review_id)
  res.render("./inventory/delete-review", {
    title: "Delete Review",
    nav,
    review_text: reviewData.review_text,
    review_id: reviewData.review_id,
    errors: null
  })
}

reviewController.deleteReview = async (req, res, next) => {
  const { review_text, review_id } = req.body
  const reviewData = await reviewModel.getReviewsByReviewId(review_id)
  const reviewResult = await reviewModel.deleteReview(review_id)
  if (reviewResult) {
    req.flash("notice", "Review deleted successfully")
    res.redirect("/inv/detail/" + reviewData.inv_id)
  } else {
    req.flash("notice", "Sorry, the deletion of the Review failed.")
    res.status(501).render("./inventory/delete-review", {
      title: "Delete Review",
      nav,
      review_text,
      review_id,
      errors: null
    })
  }
}

reviewController.getReviewsByAccountId = async (req, res, next) => {
  const account_id = req.params.accountId
  if (!account_id) {
    req.flash("notice", "Please log in to view your reviews.")
    return res.redirect("/account/login")
  } else {
    const reviews = await reviewModel.getReviewsByAccountId(account_id)
    let nav = await utilities.getNav()
    let content = await utilities.buildReviews(reviews, account_id)
    res.render("account/reviews", {
      title: "My Reviews",
      nav,
      reviewContent: content,
      loggedin: res.locals.loggedin,
      errors: null
    })
  }
}

module.exports = reviewController;