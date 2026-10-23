import * as productsModel from "../models/products.model.js";

export const getAll = async () => {
  return await productsModel.findAll();
};

export const getById = async (id) => {
  const product = await productsModel.findById(id);
  if (!product) {
    const error = new Error("Producto no encontrado");
    error.status = 404;
    throw error;
  }
  return product;
};

export const createProduct = async (data) => {
  const { name, price, category } = data;

  if (!name || price === undefined || !category) {
    const error = new Error("Faltan campos obligatorios: name, price, category");
    error.status = 400;
    throw error;
  }

  if (typeof price !== "number" || price < 0) {
    const error = new Error("El precio debe ser un número positivo");
    error.status = 400;
    throw error;
  }

  return await productsModel.create(data);
};

export const deleteProduct = async (id) => {
  const product = await productsModel.findById(id);
  if (!product) {
    const error = new Error("Producto no encontrado");
    error.status = 404;
    throw error;
  }
  await productsModel.remove(id);
  return product;
};