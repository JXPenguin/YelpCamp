const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

// REROUTE TO INDEX
router.get("/", (req, res) => {
	res.render("landing");
});


// ================
// AUTH Routes
// ================

// show register form
router.get("/register", (req, res)=>{
	res.render("register");
});

// handles sign up logic
router.post("/register", async (req, res)=>{
	try {
		// Create new User object
		var newUser = new User({username: req.body.username});
		var password = req.body.password;
		// Register user info from new user object into mongdb, then store into var user
		let user = await User.register(newUser, password);
		// Check if user authenticated, if so allow user to redirect, err will catch
		passport.authenticate("local")(req, res, ()=>{
			req.flash("success", "Welcome to YelpCamp " + user.username);
			res.redirect("/campgrounds");
		});
	} catch (err) {
		req.flash("error", err.message);
		console.log(err);
		return res.redirect("register");
	}

});

// Show login form
router.get("/login", (req, res)=>{
	res.render("login");
});

// Login route
router.post("/login", passport.authenticate("local", {
		 successRedirect: "/campgrounds",
		 failureRedirect: "/login"
		 }), (req, res)=>{
});

// log out route

router.get("/logout", async (req, res)=>{
	req.logout();
	req.flash("success", "Logged you out");
	res.redirect("campgrounds");
});

module.exports = router;