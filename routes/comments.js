const express = require("express");
const router = express.Router({mergeParams: true});
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middleware = require("../middleware"); // auto goes to index if file not specified in directory

// =======================
// COMMENT ROUTES
// =======================

// Comments New
router.get("/new", middleware.isLoggedIn,async (req,res)=>{
	//find campground by id
	try {
		let campground = await Campground.findById(req.params.id);
		res.render("comments/new", {campground: campground});
	} catch(err) {
		console.log(err);
	}
});

// Comments Create
router.post("/", middleware.isLoggedIn, async (req, res)=>{
	try {
		//Lookup campground id
		let campground = await Campground.findById(req.params.id);
		console.log(campground);
		// create new comment
		let comment = await Comment.create(req.body.comment);
		// Add username and id to comments
		comment.author.id = req.user._id;
		comment.author.username = req.user.username;
		// save comment
		comment.save();
		// connect new commment to campground
		campground.comments.push(comment);
		campground.save();
		// redirect to campground show page
		req.flash("success", "Successfully added comment")
		res.redirect("/campgrounds/" + campground._id);
	} catch(err) {
		req.flash("error", "Campground not found")
		console.log(err);
		res.redirect("/campgrounds");
	}
});

// COMMENTS - EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, async (req,res)=>{
	try {
		let foundComment = await Comment.findById(req.params.comment_id);
		res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
	} catch(err){
		res.redirect("back");
	}
})

// COMMENTS - UPDATE ROUTE

router.put("/:comment_id", middleware.checkCommentOwnership, async (req,res)=>{
	try {
		await Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment);
		res.redirect("/campgrounds/" + req.params.id);
	} catch(err){
		res.redirect("back");
	}
});

// COMMENTS - DESTROY ROUTE

router.delete("/:comment_id", middleware.checkCommentOwnership, async (req, res)=>{
	try {
		await Comment.findByIdAndDelete(req.params.comment_id);
		req.flash("success", "Comment deleted")
		res.redirect("/campgrounds/" + req.params.id);
	} catch(err){
		res.redirect("back");
	}
});

module.exports = router;