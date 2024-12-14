import request from 'supertest';
import app from '../../app';
import * as discountService from '../../services/discountService';
import { validateRequest } from '../../middlewares/validateRequest';

// محاكاة الخدمة (mock service)
jest.mock('../../services/discountService');
jest.mock('../../middlewares/validateRequest', () => ({
    validateRequest: jest.fn().mockImplementation((req, res, next) => next()),  // Mock to bypass validation
}));

describe("Discount Endpoints", () => {
    const mockDiscount = {
        id: 'discount123',
        discountPercentage: 10,
        productId: 'product123',
        startDate: new Date().toISOString(),
        endDate: new Date(new Date().getTime() + 86400000).toISOString(), // 1 day later
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/discounts", () => {
        it("should return all discounts with status 200", async () => {
            (discountService.getAllDiscounts as jest.Mock).mockResolvedValue([mockDiscount]);

            const response = await request(app).get('/api/discounts');
            console.log(response.body);  // Debugging line

            expect(response.status).toBe(200);
            expect(response.body).toEqual([mockDiscount]);
            expect(discountService.getAllDiscounts).toHaveBeenCalled();
        });
    });

    describe("GET /api/discounts/:id", () => {
        it("should return a discount by ID with status 200", async () => {
            (discountService.getDiscountById as jest.Mock).mockResolvedValue(mockDiscount);

            const response = await request(app).get(`/api/discounts/${mockDiscount.id}`);
            console.log(response.body);  // Debugging line

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockDiscount);
            expect(discountService.getDiscountById).toHaveBeenCalledWith(mockDiscount.id);
        });

        it("should return 404 if discount not found", async () => {
            (discountService.getDiscountById as jest.Mock).mockResolvedValue(null);

            const response = await request(app).get(`/api/discounts/nonexistentId`);
            console.log(response.body);  // Debugging line

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'Discount not found' });
        });
    });

    describe("POST /api/discounts", () => {
        it("should create a discount and return it with status 201", async () => {
            (discountService.createDiscount as jest.Mock).mockResolvedValue(mockDiscount);

            const response = await request(app).post('/api/discounts').send(mockDiscount);
            console.log(response.body);  // Debugging line

            expect(response.status).toBe(201);
            expect(response.body).toEqual(mockDiscount);
            expect(discountService.createDiscount).toHaveBeenCalledWith(mockDiscount);
        });
    });

    describe.skip("PUT /api/discounts/:id", () => {
        it("should update a discount and return it with status 200", async () => {
            (discountService.updateDiscount as jest.Mock).mockResolvedValue(mockDiscount);

            const response = await request(app).put(`/api/discounts/${mockDiscount.id}`).send({ discountPercentage: 20 });
            console.log(response.body);  // Debugging line

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockDiscount);
            expect(discountService.updateDiscount).toHaveBeenCalledWith(mockDiscount.id, { discountPercentage: 20 });
        });

        it("should return 404 if discount not found", async () => {
            (discountService.updateDiscount as jest.Mock).mockResolvedValue(null);

            const response = await request(app).put(`/api/discounts/nonexistentId`).send({ discountPercentage: 20 });
            console.log(response.body);  // Debugging line

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'Discount not found' });
        });
    });

    describe.skip("DELETE /api/discounts/:id", () => {
        it("should delete a discount and return status 204", async () => {
            (discountService.deleteDiscount as jest.Mock).mockResolvedValue(true);

            const response = await request(app).delete(`/api/discounts/${mockDiscount.id}`);
            console.log(response.body);  // Debugging line

            expect(response.status).toBe(204);
            expect(discountService.deleteDiscount).toHaveBeenCalledWith(mockDiscount.id);
        });

        it("should return 404 if discount not found", async () => {
            (discountService.deleteDiscount as jest.Mock).mockRejectedValue(new Error('Discount not found'));

            const response = await request(app).delete(`/api/discounts/nonexistentId`);
            console.log(response.body);  // Debugging line

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'Discount not found' });
        });
    });

    describe("GET /api/discounts/:discountId/time-remaining", () => {
        it("should return remaining time with status 200", async () => {
            (discountService.getDiscountById as jest.Mock).mockResolvedValue(mockDiscount);

            const response = await request(app).get(`/api/discounts/${mockDiscount.id}/time-remaining`);
            console.log(response.body);  // Debugging line

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('remainingTime');
            expect(response.body).toHaveProperty('formattedTime');
        });

        it("should return 404 if discount not found", async () => {
            (discountService.getDiscountById as jest.Mock).mockResolvedValue(null);

            const response = await request(app).get(`/api/discounts/nonexistentId/time-remaining`);
            console.log(response.body);  // Debugging line

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'Discount not found' });
        });
    });
});
