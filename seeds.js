const mongoose = 	require("mongoose"),
	  Campground = 	require("./models/campground"),
	  Comment = 	require("./models/comment");

var seeds = [
	{
		name: "Clouds Rest",
		image: "https://californiathroughmylens.com/wp-content/uploads/2017/07/clouds-rest-20-640x427.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet eget sit amet tellus cras adipiscing. Integer feugiat scelerisque varius morbi enim nunc. Tempor id eu nisl nunc. Sit amet est placerat in egestas. Placerat orci nulla pellentesque dignissim enim. Morbi non arcu risus quis varius quam quisque. Turpis in eu mi bibendum neque. Eget nunc lobortis mattis aliquam faucibus purus in massa. Arcu cursus euismod quis viverra nibh cras pulvinar. Viverra justo nec ultrices dui sapien. Sollicitudin nibh sit amet commodo nulla. Dignissim enim sit amet venenatis urna cursus eget nunc. Facilisis sed odio morbi quis commodo. Nunc mattis enim ut tellus elementum sagittis vitae et leo. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Tellus cras adipiscing enim eu turpis egestas pretium aenean pharetra. Et pharetra pharetra massa massa ultricies mi quis hendrerit dolor."
	},
	{
		name: "Desert Mesa ",
		image: "https://cdn8.dissolve.com/p/D1101_32_051/D1101_32_051_0004_600.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet eget sit amet tellus cras adipiscing. Integer feugiat scelerisque varius morbi enim nunc. Tempor id eu nisl nunc. Sit amet est placerat in egestas. Placerat orci nulla pellentesque dignissim enim. Morbi non arcu risus quis varius quam quisque. Turpis in eu mi bibendum neque. Eget nunc lobortis mattis aliquam faucibus purus in massa. Arcu cursus euismod quis viverra nibh cras pulvinar. Viverra justo nec ultrices dui sapien. Sollicitudin nibh sit amet commodo nulla. Dignissim enim sit amet venenatis urna cursus eget nunc. Facilisis sed odio morbi quis commodo. Nunc mattis enim ut tellus elementum sagittis vitae et leo. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Tellus cras adipiscing enim eu turpis egestas pretium aenean pharetra. Et pharetra pharetra massa massa ultricies mi quis hendrerit dolor."
	},
	{
		name: "Canyon Floor",
		image: "https://californiathroughmylens.com/wp-content/uploads/2017/07/clouds-rest-20-640x427.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet eget sit amet tellus cras adipiscing. Integer feugiat scelerisque varius morbi enim nunc. Tempor id eu nisl nunc. Sit amet est placerat in egestas. Placerat orci nulla pellentesque dignissim enim. Morbi non arcu risus quis varius quam quisque. Turpis in eu mi bibendum neque. Eget nunc lobortis mattis aliquam faucibus purus in massa. Arcu cursus euismod quis viverra nibh cras pulvinar. Viverra justo nec ultrices dui sapien. Sollicitudin nibh sit amet commodo nulla. Dignissim enim sit amet venenatis urna cursus eget nunc. Facilisis sed odio morbi quis commodo. Nunc mattis enim ut tellus elementum sagittis vitae et leo. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Tellus cras adipiscing enim eu turpis egestas pretium aenean pharetra. Et pharetra pharetra massa massa ultricies mi quis hendrerit dolor."
	}
];

async function seedDB(){
	
	try {
		await Campground.remove({});
		console.log("campgrounds removed");
		await Comment.remove({});
		console.log("comments removed");

		// for(const seed of seeds){
		// 	let campground = await Campground.create(seed);
		// 	console.log("Campground created")
		// 	let comment = await Comment.create(
		// 		{
		// 			text: "Wow siiick place",
		// 			author: "the lo"
		// 		}
		// 	);
		// 	console.log("comment created")
		// 	campground.comments.push(comment);
		// 	campground.save();
		// 	console.log("comment added to campground")
		// }
	} catch(err) {
		console.log(err);
	}

}

module.exports = seedDB;

