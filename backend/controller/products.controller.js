import Product from "../model/product.model.js";

const fetchProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();

    if (!allProducts?.length) {
      return res
        .status(404)
        .json({ success: false, message: "No products available" });
    }

    res.status(200).json({ success: true, data: allProducts });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const addProducts = async (req, res) => {
  const { name, price, image } = req.body;

  
  if (!name || !price || !image) {
    return res
      .status(400) // Changed to 400 Bad Request
      .json({ success: false, message: "Please provide all information!" });
  }

  const newProduct = new Product({ name, price, image });

  try {
  
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteProducts = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateProducts = async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;

  // Check if at least one field is provided for update
  if (!name && !price && !image) {
    return res
      .status(400)
      .json({ success: false, message: "No data to update" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, image },
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const allController = {
  fetchProducts,
  addProducts,
  deleteProducts, 
  updateProducts,
};

export default allController;
