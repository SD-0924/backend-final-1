// Import the service functions
import {
  fetchAllCoupons,
  fetchCouponById,
  addCoupon,
  modifyCoupon,
  removeCoupon,
  fetchCouponOrders,
} from "../../services/couponService";

// Mock the repository module
jest.mock("../../reposetories/couponPepository", () => ({
  getAllCouponsRepo: jest.fn(),
  getCouponByIdRepo: jest.fn(),
  createCouponRepo: jest.fn(),
  updateCouponRepo: jest.fn(),
  deleteCouponRepo: jest.fn(),
  getCouponOrdersRepo: jest.fn(),
}));

// Import the mocked functions
import {
  getAllCouponsRepo,
  getCouponByIdRepo,
  createCouponRepo,
  updateCouponRepo,
  deleteCouponRepo,
  getCouponOrdersRepo,
} from "../../reposetories/couponPepository";

// Test suite for Coupon Services
describe("Coupon Services", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  test("fetchAllCoupons should call getAllCouponsRepo and return its result", async () => {
    const mockCoupons = [
      { id: "1", code: "DISCOUNT10", discountValue: 10 },
      { id: "2", code: "DISCOUNT20", discountValue: 20 },
    ];
    (getAllCouponsRepo as jest.Mock).mockResolvedValue(mockCoupons);

    const result = await fetchAllCoupons();

    expect(getAllCouponsRepo).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockCoupons);
  });

  test("fetchCouponById should call getCouponByIdRepo with correct id and return its result", async () => {
    const mockCoupon = { id: "1", code: "DISCOUNT10", discountValue: 10 };
    (getCouponByIdRepo as jest.Mock).mockResolvedValue(mockCoupon);

    const result = await fetchCouponById("1");

    expect(getCouponByIdRepo).toHaveBeenCalledWith("1");
    expect(result).toEqual(mockCoupon);
  });

  test("addCoupon should call createCouponRepo with couponData and return its result", async () => {
    const newCoupon = { code: "NEWCOUPON", discountValue: 15 };
    const mockResponse = { id: "3", ...newCoupon };
    (createCouponRepo as jest.Mock).mockResolvedValue(mockResponse);

    const result = await addCoupon(newCoupon);

    expect(createCouponRepo).toHaveBeenCalledWith(newCoupon);
    expect(result).toEqual(mockResponse);
  });

  test("modifyCoupon should call updateCouponRepo with correct id and data", async () => {
    const updatedCoupon = { code: "UPDATEDCOUPON", discountValue: 20 };
    const mockResponse = { id: "1", ...updatedCoupon };
    (updateCouponRepo as jest.Mock).mockResolvedValue(mockResponse);

    const result = await modifyCoupon("1", updatedCoupon);

    expect(updateCouponRepo).toHaveBeenCalledWith("1", updatedCoupon);
    expect(result).toEqual(mockResponse);
  });

  test("removeCoupon should call deleteCouponRepo with correct id", async () => {
    (deleteCouponRepo as jest.Mock).mockResolvedValue(true);

    const result = await removeCoupon("1");

    expect(deleteCouponRepo).toHaveBeenCalledWith("1");
    expect(result).toBe(true);
  });

  test("fetchCouponOrders should call getCouponOrdersRepo with correct id and return its result", async () => {
    const mockOrders = [
      { orderId: "101", couponId: "1", amount: 50 },
      { orderId: "102", couponId: "1", amount: 75 },
    ];
    (getCouponOrdersRepo as jest.Mock).mockResolvedValue(mockOrders);

    const result = await fetchCouponOrders("1");

    expect(getCouponOrdersRepo).toHaveBeenCalledWith("1");
    expect(result).toEqual(mockOrders);
  });
});
