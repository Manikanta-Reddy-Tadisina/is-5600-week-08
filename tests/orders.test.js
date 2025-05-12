const { create, get, list, edit } = require('../orders');
const orderData = require('../data/order1.json');
const productTestHelper = require('./test-utils/productTestHelper');

describe('Orders Module', () => {
    let createdOrder;

    beforeAll(async () => {
        await productTestHelper.setupTestData();
        await productTestHelper.createTestOrders(5);
        // Create an order for the get and edit tests
        createdOrder = await create(orderData);
    });

    afterAll(async () => {
        await productTestHelper.cleanupTestData();
    });

    describe('list', () => {
        it('should list orders', async () => {
            const orders = await list();
            expect(orders.length).toBeGreaterThan(4);
        });
    });

    describe('create', () => {
        it('should create an order', async () => {
            const newOrder = await create(orderData);
            expect(newOrder).toBeDefined();
            expect(newOrder.buyerEmail).toBe(orderData.buyerEmail);
        });
    });

    describe('get', () => {
        it('should get an order by id', async () => {
            const order = await get(createdOrder._id);
            expect(order).toBeDefined();
            expect(order._id).toBe(createdOrder._id);
        });
    });

    describe('edit', () => {
        it('should edit an order', async () => {
            const change = { status: 'COMPLETED' };
            const editedOrder = await edit(createdOrder._id, change);
            expect(editedOrder).toBeDefined();
            expect(editedOrder.status).toBe(change.status);
        });
    });
});