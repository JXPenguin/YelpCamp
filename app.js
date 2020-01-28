const express 		 = require("express"),
	  app 			 = express(),
	  bodyParser 	 = require("body-parser"),
	  mongoose 		 = require("mongoose"),
	  flash			 = require("connect-flash"),
	  passport 		 = require("passport"),
	  LocalStrategy  = require("passport-local"),
	  methodOverride = require("method-override"),
	  // Schemas
	  Campground 	 = require("./models/campground"),
	  Comment		 = require("./models/comment"),
	  User			 = require("./models/user"),
	  // DB test
	  seedDB 		 = require("./seeds");

// Routes
const commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index");



mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// seedDB un comment the below when needed to reset DB
// seedDB();

// PASSPORT - CONFIG
app.use(require("express-session")({
	secret: "This is not the password haHA",
	resave: false,
	saveUninitialized: false
}));

// passport js setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// adds property currentUser with the value of req.user so that the propery exists to avoid error upon load.
app.use((req, res, next)=>{
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

// Use route files
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, () => {
	console.log("Yelp Camp connected");
});

