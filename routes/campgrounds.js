const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware"); // auto goes to index if file not specified in directory

// INDEX - Show all campgrounds
router.get("/", async (req, res) => {
	//Get all campgrounds from DB
	try {
		let allCampgrounds = await Campground.find({});
		res.render("campgrounds/index", {campgrounds: allCampgrounds});	
	} catch(err) {
		console.log(err);
	}
});

// NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, (req, res) => {
	res.render("campgrounds/new")
});

// SHOW - show details on unique id
router.get("/:id", async (req, res)=>{
	try {
		let foundCampground = await Campground.findById(req.params.id).populate("comments");
		res.render("campgrounds/show", {campground: foundCampground});
	} catch(err) {
		console.log(err);
	}
});

// CREATE - Add new campgrounds
router.post("/", middleware.isLoggedIn, async (req,res) => {
	// don't need to anymore as name was changed to campground[value]
	// get data from form and add to campgrounds array
	// var name = req.body.name;
	// var image = req.body.image;
	// var description = req.body.description;
	// var newCampground = {name: name, image: image, description: description};
	// create new campground and save to db
	try {
		// Attach author information of current user to campground body payload
		req.body.campground.author = {
			id: req.user._id,
			username: req.user.username
		}
		// create campground schema with req info
		await Campground.create(req.body.campground);
		res.redirect("/campgrounds");
	} catch(err) {
		console.log(err);
	}
});

// EDIT - CAMPGROUND ROUTE

router.get("/:id/edit", middleware.checkCampgroundOwnership, async (req, res)=>{
	try{
		let foundCampground = await Campground.findById(req.params.id);
		res.render("campgrounds/edit", {campground: foundCampground});
	} catch(err) {
		res.redirect("/campgrounds");
	}		
});

// UPDATE - CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, async (req, res)=>{
	try {
		// find and update correct campground
		await Campground.findByIdAndUpdate(req.params.id, req.body.campground);
		res.redirect("/campgrounds/" + req.params.id);
		
	} catch(err) {
		// redirect
		res.redirect("/campgrounds/" + req.params.id + "/edit");
	}
	// redirect
})

// DESTORY - CAMPGROUND ROUTE

router.delete("/:id", middleware.checkCampgroundOwnership, async (req, res)=>{
	try {
		await Campground.findByIdAndRemove(req.params.id);
		res.redirect("/campgrounds");
	} catch(err) {
		res.redirect("/campgrounds");
	}
})

module.exports = router;