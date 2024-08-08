const mongoose = require('mongoose');
const User = require('./src/models/User'); // User modelingiz joylashuviga qarab yo'lni o'zgartiring
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB-ga ulanish muvaffaqiyatli'))
    .catch(err => console.error('MongoDB-ga ulanishda xato:', err));

const users = [
    { nickName: 'admin1', password: 'admin123', role: 'admin' },
    { nickName: 'waiter1', password: 'waiter123', role: 'waiter' },
    { nickName: 'waiter2', password: 'waiter456', role: 'waiter' },
    { nickName: 'client1', password: 'client123', role: 'client' },
    { nickName: 'client2', password: 'client456', role: 'client' },
];

const seedUsers = async () => {
    try {
        await User.deleteMany({}); // Avvalgi barcha foydalanuvchilarni o'chirish
        const createdUsers = await User.create(users);
        console.log('Foydalanuvchilar muvaffaqiyatli yaratildi:', createdUsers);
    } catch (error) {
        console.error('Foydalanuvchilarni yaratishda xato:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedUsers();