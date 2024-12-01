import { Request, RequestHandler, Response } from "express";
import { getNewArrivalsService } from "../services/productService";
import {
  getAllProductsService,
  getProductByIdService,
  addProductService,
  updateProductService,
  deleteProductService,
  getProductRatingsService,
} from "../services/productService";
import {
  uploadProductImageToFirebase,
  getProductImageUrlFromFirebase,
  deleteProductImageFromFirebase,
} from "../utils/firebaseUtils";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await getAllProductsService();

    const productsWithImages = await Promise.all(
      products.map(async (product) => {
        if (product.imageUrl) {
          product.imageUrl = await getProductImageUrlFromFirebase(
            product.imageUrl
          );
        } else {
          product.imageUrl =
            "https://shop.songprinting.com/global/images/PublicShop/ProductSearch/prodgr_default_300.png";
        }
        return product;
      })
    );

    res.status(201).json(productsWithImages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
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

export const getNewArrivals = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const { products, pagination } = await getNewArrivalsService(page, limit);

    res.status(200).json({
      success: true,
      data: products,
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
