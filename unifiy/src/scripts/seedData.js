const mongoose = require('mongoose');
const User = require('../src/models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const seedUsers = [
    { nickName: 'admin', password: 'admin123', role: 'admin' },
    { nickName: 'waiter1', password: 'waiter123', role: 'waiter' },
    { nickName: 'client1', password: 'client123', role: 'client' },
];

const seedDB = async () => {
    await User.deleteMany({});
    await User.create(seedUsers);
    console.log('Database seeded');
};

seedDB().then(() => {
    mongoose.connection.close();
});