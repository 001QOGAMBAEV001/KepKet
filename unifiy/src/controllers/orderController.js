const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    try {
        const { tableNumber, items } = req.body;
        const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const order = new Order({
            user: req.user._id,
            tableNumber,
            items,
            totalPrice
        });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};