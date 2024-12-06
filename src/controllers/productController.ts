import { Request, RequestHandler, Response } from "express";
import { getNewArrivalsService } from "../services/productService";
import {
  getAllProductsService,
  getProductByIdService,
  addProductService,
  updateProductService,
  deleteProductService,
  getProductRatingsService,
  getProductsByBrandService,
  getProductsByCategoryService,
  getLimitedEditionService,
  fetchHandpickedProducts,
  getDiscountedProductsService,
  getPopularProductsService,
} from "../services/productService";
import {
  uploadProductImageToFirebase,
  getProductImageUrlFromFirebase,
  deleteProductImageFromFirebase,
} from "../utils/firebaseUtils";
import { getDiscountByProductId } from "../services/discountService";
import { getDiscountTimeRemainingById } from "../services/discountService";

export const getAllProducts = async (req: Request, res: Response) => {
  // BUG
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const brandName = req.query.brandName || "";
    const categoryName = req.query.categoryName || "";

    const { products, pagination } = await getAllProductsService(
      page,
      limit,
      brandName,
      categoryName
    );

    if (products.length === 0) {
      res.status(404).json({ message: "No products found." });
      return;
    }

    const updatedProducts = await Promise.all(
      products.map(async (product) => {
        if (product.imageUrl) {
          try {
            const updatedImageUrl = await getProductImageUrlFromFirebase(
              product.imageUrl
            );
            console.log(
              `Updated image URL for product ${product.id}:`,
              updatedImageUrl
            );
            return { ...product, imageUrl: updatedImageUrl };
          } catch (error) {
            console.error(
              `Error fetching image for product ${product.id}:`,
              error
            );
            return product;
          }
        } else {
          product.imageUrl =
            "https://shop.songprinting.com/global/images/PublicShop/ProductSearch/prodgr_default_300.png";
        }
        return product;
      })
    );

    res.status(201).json({
      success: true,
      data: updatedProducts,
      pagination,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productId = req.params.id;

    const product = await getProductByIdService(productId);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    if (product.imageUrl) {
      try {
        const updatedImageUrl = await getProductImageUrlFromFirebase(
          product.imageUrl
        );
        product.imageUrl = updatedImageUrl;
      } catch (error) {
        console.error(`Error fetching image for product ${productId}:`, error);
      }
    } else {
      product.imageUrl =
        "https://shop.songprinting.com/global/images/PublicShop/ProductSearch/prodgr_default_300.png";
    }

    res.status(201).json(product);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    if (req.file) {
      const imageUrl = await uploadProductImageToFirebase(
        req.file.path,
        productData.name
      );
      productData.imageUrl = imageUrl;
    } else {
      productData.imageUrl =
        "https://shop.songprinting.com/global/images/PublicShop/ProductSearch/prodgr_default_300.png";
    }

    const newProduct = await addProductService(productData);

    res.status(201).json({
      success: true,
      message: "Product added successfully!",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add product. Please try again later.",
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;

    if (req.file) {
      const imageUrl = await uploadProductImageToFirebase(
        req.file.path,
        updatedData.name || "product"
      );
      updatedData.imageUrl = imageUrl;
    } else {
      updatedData.imageUrl =
        "https://shop.songprinting.com/global/images/PublicShop/ProductSearch/prodgr_default_300.png";
    }

    const updatedProduct = await updateProductService(productId, updatedData);

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: updatedProduct,
    });
  } catch (error: any) {
    console.error("Error updating product:", error);
    if (error.message === "Product not found") {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to update product. Please try again later.",
      });
    }
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    const product = await getProductByIdService(productId);
    if (product && product.imageUrl) {
      await deleteProductImageFromFirebase(product.imageUrl);
    }

    await deleteProductService(productId);

    res.status(204).json({
      success: true,
      message: "Product deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete product. Please try again later.",
    });
  }
};

export const getProductRatings = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const ratings = await getProductRatingsService(productId);
    res.status(201).json(ratings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch ratings" });
  }
};

export const getLimitedEdition = async (req: Request, res: Response) => {
  try {
    const products = await getLimitedEditionService();
    if (products.length === 0) {
      res.status(404).json({ message: "No limited edition products found." });
      return;
    }

    const updatedProducts = await Promise.all(
      products.map(async (product) => {
        if (product.imageUrl) {
          try {
            const updatedImageUrl = await getProductImageUrlFromFirebase(
              product.imageUrl
            );
            console.log(
              `Updated image URL for product ${product.id}:`,
              updatedImageUrl
            );
            return { ...product, imageUrl: updatedImageUrl };
          } catch (error) {
            console.error(
              `Error fetching image for product ${product.id}:`,
              error
            );
            return product;
          }
        } else {
          product.imageUrl =
            "https://shop.songprinting.com/global/images/PublicShop/ProductSearch/prodgr_default_300.png";
        }
        return product;
      })
    );

    res.status(200).json(updatedProducts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getDiscountedProducts = async (req: Request, res: Response) => {
  try {
    const products = await getDiscountedProductsService();

    if (products.length === 0) {
      res.status(404).json({ message: "No discounted products found." });
      return;
    }

    const updatedProducts = await Promise.all(
      products.map(async (product) => {
        if (product.imageUrl) {
          try {
            const updatedImageUrl = await getProductImageUrlFromFirebase(
              product.imageUrl
            );
            console.log(
              `Updated image URL for product ${product.id}:`,
              updatedImageUrl
            );
            return { ...product, imageUrl: updatedImageUrl };
          } catch (error) {
            console.error(
              `Error fetching image for product ${product.id}:`,
              error
            );
            return product;
          }
        } else {
          product.imageUrl =
            "https://shop.songprinting.com/global/images/PublicShop/ProductSearch/prodgr_default_300.png";
        }
        return product;
      })
    );

    res.status(200).json(updatedProducts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getPopularProducts = async (req: Request, res: Response) => {
  try {
    const products = await getPopularProductsService();

    if (products.length === 0) {
      res.status(404).json({ message: "No popular products found." });
      return;
    }

    const updatedProducts = await Promise.all(
      products.map(async (product) => {
        if (product.imageUrl) {
          try {
            const updatedImageUrl = await getProductImageUrlFromFirebase(
              product.imageUrl
            );
            console.log(
              `Updated image URL for product ${product.id}:`,
              updatedImageUrl
            );
            return { ...product, imageUrl: updatedImageUrl };
          } catch (error) {
            console.error(
              `Error fetching image for product ${product.id}:`,
              error
            );
            return product;
          }
        } else {
          product.imageUrl =
            "https://shop.songprinting.com/global/images/PublicShop/ProductSearch/prodgr_default_300.png";
        }
        return product;
      })
    );

    res.status(200).json(updatedProducts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getNewArrivals = async (
  req: Request,

  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const { products, pagination } = await getNewArrivalsService(page, limit);

    const updatedProducts = await Promise.all(
      products.map(async (product) => {
        if (product.imageUrl) {
          try {
            const updatedImageUrl = await getProductImageUrlFromFirebase(
              product.imageUrl
            );
            console.log(
              `Updated image URL for product ${product.id}:`,
              updatedImageUrl
            );
            return { ...product, imageUrl: updatedImageUrl };
          } catch (error) {
            console.error(
              `Error fetching image for product ${product.id}:`,
              error
            );
            return product;
          }
        } else {
          product.imageUrl =
            "https://shop.songprinting.com/global/images/PublicShop/ProductSearch/prodgr_default_300.png";
        }
        return product;
      })
    );

    res.status(200).json({
      success: true,
      data: updatedProducts,
      pagination,
    });
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch new arrivals. Please try again later.",
    });
  }
};

export const getHandpicked = async (req: Request, res: Response) => {
  try {
    const products = await fetchHandpickedProducts();
    if (products.length === 0) {
      res.status(404).json({ message: "No handpicked products found." });
      return;
    }

    const updatedProducts = await Promise.all(
      products.map(async (product) => {
        if (product.imageUrl) {
          try {
            const updatedImageUrl = await getProductImageUrlFromFirebase(
              product.imageUrl
            );
            console.log(
              `Updated image URL for product ${product.id}:`,
              updatedImageUrl
            );
            return { ...product, imageUrl: updatedImageUrl };
          } catch (error) {
            console.error(
              `Error fetching image for product ${product.id}:`,
              error
            );
            return product;
          }
        } else {
          product.imageUrl =
            "https://shop.songprinting.com/global/images/PublicShop/ProductSearch/prodgr_default_300.png";
        }
        return product;
      })
    );

    res.status(200).json(updatedProducts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getProductsByBrandController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { brandId } = req.params;
  try {
    const products = await getProductsByBrandService(brandId);
    if (products.length === 0) {
      res
        .status(404)
        .json({ message: "No products found for the specified brand." });
    } else {
      const updatedProducts = await Promise.all(
        products.map(async (product) => {
          const updatedImageUrl = await getProductImageUrlFromFirebase(
            product.imageUrl
          );
          return {
            ...product.toJSON(),
            logoUrl: updatedImageUrl,
          };
        })
      );
      res.status(200).json({ products: updatedProducts });
    }
  } catch (error: any) {
    console.error("Error fetching products by brand:", error.message);
    if (error.message === "Brand not found") {
      res.status(404).json({ message: "Brand not found" });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
};

export const getProductsByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { categoryId } = req.params;
  try {
    const products = await getProductsByCategoryService(categoryId);
    if (products.length === 0) {
      res
        .status(404)
        .json({ message: "No products found for the specified category." });
    } else {
      const updatedProducts = await Promise.all(
        products.map(async (product) => {
          const updatedImageUrl = await getProductImageUrlFromFirebase(
            product.imageUrl
          );
          return {
            ...product.toJSON(),
            logoUrl: updatedImageUrl,
          };
        })
      );
      res.status(200).json({ products: updatedProducts });
    }
  } catch (error: any) {
    console.error("Error fetching products by category:", error.message);
    if (error.message === "Category not found") {
      res.status(404).json({ message: "Category not found" });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
};

export const getProductPriceAfterDiscount = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const product = await getProductByIdService(id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    const discount = await getDiscountByProductId(id);

    if (discount) {
      const discountTimeStatus = await getDiscountTimeRemainingById(
        discount.id
      );

      if (discountTimeStatus.remainingTime > 0) {
        const discountAmount =
          product.price * (discount.discountPercentage / 100);
        const finalPrice = product.price - discountAmount;
        res.json({
          productId: product.id,
          finalPrice,
          originalPrice: product.price,
          discountPercentage: discount.discountPercentage,
          discountEndDate: discount.endDate,
        });
        return;
      } else {
        res.json({
          productId: product.id,
          finalPrice: product.price,
          originalPrice: product.price,
          discountPercentage: 0,
          discountEndDate: null,
        });
        return;
      }
    } else {
      res.json({
        productId: product.id,
        finalPrice: product.price,
        originalPrice: product.price,
        discountPercentage: 0,
        discountEndDate: null,
      });
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
