const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await User.deleteMany({});
    await Thought.deleteMany({});
    const users = [
        {
            username: "tedMosby",
            email: "ted@mosby.com",
        },
        {
            username: "barneyStinson",
            email: "barney@stinson.com",
        },
        {
            username: "lilyAldrin",
            email: "lily@aldrin.com",
        },
        {
            username: "marshallEriksen",
            email: "marshall@eriksen.com",
        },
        {
            username: "robinSparkles",
            email: "robin@sparkles.com",
        },
        {
            username: "tracyMcConell",
            email: "tracy@mcconell.com",
        },
    ];
    const thoughts = [
        {
            username: "tedMosby",
            thoughtText: "Nothing good happens after 2:00 am… when 2:00 am rolls around, just go home and go to sleep.",
        },
        {
            username: "barneyStinson",
            thoughtText: "Every Halloween, I bring a spare costume, in case I strike out with the hottest girl at the party. That way, I have a second chance to make a first impression.",
        },
        {
            username: "lilyAldrin",
            thoughtText: "So really the biggest mistake would be not to make that mistake, because then you’ll go your whole life not knowing if something was a mistake or not.",
        },
        {
            username: "marshallEriksen",
            thoughtText: "That’s life, you know. We never end up where you thought you wanted to be.",
        },
        {
            username: "robinSparkles",
            thoughtText: "If I ask you to change too many things about yourself, you're not gonna be the man I fell in love with.",
        },
        {
            username: "tracyMcConell",
            thoughtText: "Funny how sometimes you just find things.",
        },
    ];

    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);

    console.table(users);
    console.table(thoughts);
    console.info("---------SEEDED---------");
    process.exit(0);
});