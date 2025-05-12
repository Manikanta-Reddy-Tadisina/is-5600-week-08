const { mockDb, mockProducts, mockModel } = require('./db.mock');
const { list, get, destroy } = require('../products');
const productTestHelper = require('./test-utils/productTestHelper');

jest.mock('../db', () => mockDb);

describe('Product Module', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Uncomment these if you need to set up or clean up test data
    // beforeAll(async () => {
    //     await productTestHelper.setupTestData();
    // });

    // afterAll(async () => {
    //     await productTestHelper.cleanupTestData();
    // });

    it('should list products', async () => {
        const products = await list();

        expect(products.length).toBe(2);
        expect(products[0].description).toBe('Product 1');
        expect(products[1].description).toBe('Product 2');
    });

    it('should get a product by id', async () => {
        mockModel.findById = jest.fn().mockResolvedValue({ description: 'Product 1' });

        const product = await get(1234);
        expect(product.description).toBe('Product 1'); // corrected to match the mocked return
        expect(mockModel.findById).toHaveBeenCalledWith('1234');
    });

    it('should delete a product by id', async () => {
        mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

        const deletionResult = await destroy('1234');
        expect(deletionResult.deletedCount).toBe(1);
        expect(mockModel.deleteOne).toHaveBeenCalledWith({ _id: '1234' });
    });
});