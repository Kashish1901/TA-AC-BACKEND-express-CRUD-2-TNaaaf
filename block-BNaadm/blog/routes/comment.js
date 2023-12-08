var express = require("express");
var router = express.Router();

var Comment = require("../models/Comment");

router.get("/:id/edit", async (req, res, next) => {
  try {
    var id = req.params.id;
    var comment = await Comment.findById(id);
    res.render("updateComments.ejs", { comment });
  } catch (err) {
    next(err);
  }
});

router.post("/:id", async (req, res, next) => {
  try {
    var id = req.params.id;
    var updatedComment = await Comment.findByIdAndUpdate(id, req.body);
    res.redirect("/articles/" + updatedComment.articleId);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/delete", async (req, res, next) => {
  try {
    var id = req.params.id;
    var comment = await Comment.findByIdAndDelete(id);
    res.redirect("/articles/" + comment.articleId);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
