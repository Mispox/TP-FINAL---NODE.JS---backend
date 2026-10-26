import * as productsService from "../services/products.service.js";

export const getProducts = async (req, res) => {
  try {
    const products = await productsService.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await productsService.getById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const nuevo = await productsService.createProduct(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await productsService.deleteProduct(req.params.id);
    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const actualizado = await productsService.updateProduct(req.params.id, req.body);
    res.json(actualizado);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};