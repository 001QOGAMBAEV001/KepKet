const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'KepKet API',
            version: '1.0.0',
            description: 'API for KepKet restaurant ordering system',
            contact: {
                name: 'API Support',
                email: 'support@kepket.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
            {
                url: 'https://api.kepket.com',
                description: 'Production server',
            },
        ],
        tags: [
            {
                name: 'Auth',
                description: 'Authentication endpoints',
            },
            {
                name: 'Users',
                description: 'User management endpoints',
            },
            {
                name: 'Orders',
                description: 'Order management endpoints',
            },
            {
                name: 'Menu',
                description: 'Menu management endpoints',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'User ID',
                        },
                        nickName: {
                            type: 'string',
                            description: 'User nickname',
                        },
                        role: {
                            type: 'string',
                            enum: ['client', 'waiter', 'admin'],
                            description: 'User role',
                        },
                    },
                },
                Order: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Order ID',
                        },
                        user: {
                            type: 'string',
                            description: 'User ID who placed the order',
                        },
                        tableNumber: {
                            type: 'integer',
                            description: 'Table number',
                        },
                        items: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    name: {
                                        type: 'string',
                                        description: 'Item name',
                                    },
                                    quantity: {
                                        type: 'integer',
                                        description: 'Item quantity',
                                    },
                                    price: {
                                        type: 'number',
                                        description: 'Item price',
                                    },
                                },
                            },
                        },
                        totalPrice: {
                            type: 'number',
                            description: 'Total order price',
                        },
                        status: {
                            type: 'string',
                            enum: ['pending', 'preparing', 'ready', 'delivered'],
                            description: 'Order status',
                        },
                    },
                },
                MenuItem: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Menu item ID',
                        },
                        name: {
                            type: 'string',
                            description: 'Menu item name',
                        },
                        description: {
                            type: 'string',
                            description: 'Menu item description',
                        },
                        price: {
                            type: 'number',
                            description: 'Menu item price',
                        },
                        category: {
                            type: 'string',
                            description: 'Menu item category',
                        },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.js'], // API routes fayllari joylashgan papka
};

const specs = swaggerJsdoc(options);

module.exports = specs;