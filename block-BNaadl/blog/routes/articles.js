var express = require("express");
var router = express.Router();

var Article = require("../models/Article");

router.get("/", async (req, res) => {
  try {
    var articles = await Article.find({});
    res.render("articles.ejs", { articles: articles });
  } catch (err) {
    res.send(err);
  }
});

router.get("/new", (req, res) => {
  res.render("addArticles.ejs");
});

router.post("/", async (req, res) => {
  try {
    req.body.tags = req.body.tags.trim().split(" ");
    var createdArticle = await Article.create(req.body);
    res.redirect("/articles");
  } catch (err) {
    res.send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    var id = req.params.id;
    var article = await Article.findById(id);
    res.render("articleDetails.ejs", { article });
  } catch (err) {
    res.send(err);
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    var id = req.params.id;
    var article = await Article.findById(id);
    article.tags = article.tags.join(" ");
    res.render("editArticleForm", { article });
  } catch (err) {
    res.send(err);
  }
});

router.post("/:id", async (req, res) => {
  try {
    var id = req.params.id;
    req.body.tags = req.body.tags.split(" ");
    var article = await Article.findByIdAndUpdate(id, req.body);
    res.redirect("/articles/" + id);
  } catch (err) {
    res.send(err);
  }
});

router.get("/:id/delete", async (req, res) => {
  try {
    var id = req.params.id;
    var article = await Article.findByIdAndDelete(id);
    res.redirect("/articles");
  } catch (err) {
    res.send(err);
  }
});

router.get("/:id/likes", async (req, res) => {
  try {
    var id = req.params.id;
    var article = await Article.findByIdAndUpdate(id, { $inc: { likes: 1 } });
    res.redirect("/articles/" + id);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
