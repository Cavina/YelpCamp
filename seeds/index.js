const mongoose = require('mongoose');
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {useNewUrlParser: true,
useUnifiedTopology: true})
.then(()=> {
    console.log("MONGO CONNECTION OPEN!!!")
})
.catch(err => {
    console.log("MONGO CONNECTION ERROR!!")
    console.timeLog(err)
})


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("DB connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];


const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            author: '65b14b366d13f2f6c3fb4ed2',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis repellendus doloribus suscipit sit voluptates exercitationem, rerum minus? Laborum id voluptatibus vero necessitatibus' 
            + 'enim odit delectus fuga dolorem quo. Eaque, asperiores?',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dbopv88ow/image/upload/v1707761929/YelpCamp/egqgtdhlggz6cmsencoh.jpg',
                    filename: 'YelpCamp/egqgtdhlggz6cmsencoh'
                },
                {
                    url: 'https://res.cloudinary.com/dbopv88ow/image/upload/v1707761957/YelpCamp/r1krklegwmewfehxkmvh.jpg',
                    filename: 'YelpCamp/r1krklegwmewfehxkmvh'
                }
            ]

        })
        await camp.save();

    }    


}

seedDB().then(() => {
    mongoose.connection.close();
})