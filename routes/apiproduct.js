const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const apiLimiter = rateLimit({
    windowMs: 1000*60*1,   // 1 minutes
    max: 5,
    message: 'Too many requests, please try again after 1 minutes!'
});

const productsController = require('../controllers/products');

router.post('/products',apiLimiter, productsController.createProduct);
router.put('/products',apiLimiter, productsController.updateProduct);
router.delete('/products/:id',apiLimiter, productsController.deleteProduct);
router.get('/products/:id',apiLimiter, productsController.getProduct);
router.get('/products/q/:term',apiLimiter, productsController.getProductsByTerm);
router.get('/products',apiLimiter, productsController.getProducts);

module.exports = router;

/**
 * @swagger
 * components:
 *    schemas:
 *      Product:
 *        type: object
 *        properties:
 *          product_id:
 *            type: integer
 *            description: The unique identifier of the product.
 *          name:
 *            type: string
 *            description: The name of the product.
 *          description:
 *            type: string
 *            description: A description of the product.
 *          price:
 *            type: number
 *            format: decimal
 *            description: The price of the product.
 *          category:
 *            type: string
 *            description: The category of the product.
 *          image_url:
 *            type: string
 *            description: The image URL of the product.
 *        required:
 *          - none
 */

/**
 * @swagger
 * /api/v1/p/products:
 *   get:
 *     summary: Get All Products
 *     tags: [Products]
 *     description: Returns a list of all products in the database.
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error.
 * 
 */

/**
 * @swagger
 * /api/v1/p/products/{id}:
 *   get:
 *     summary: Get Product by ID
 *     tags: [Products]
 *     description: Returns a single Product object based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The unique identifier of the Product.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product object found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating Product not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating an internal server error.
 *                 error:
 *                   type: string
 *                   description: Detailed error message.
 */

/**
 * @swagger
 * /api/v1/p/products:
 *   post:
 *     summary: Create a new Product 
 *     tags: [Products]
 *     description: create a new product on database 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product object created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error.
 *
 */

/**
 * @swagger
 * /api/v1/p/products:
 *   put:
 *     summary: Update a Product
 *     tags: [Products]
 *     description: Update product information in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *             required:
 *               - product_id
 *               - name
 *               - description
 *               - price
 *               - category
 *               - image_url
 *     responses:
 *       200:
 *         description: Product information updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product to update not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/p/products/{id}:
 *   delete:
 *     summary: Delete Product by ID
 *     tags: [Products]
 *     description: Deletes a single product object based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The unique identifier of the product.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product object deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/customers/q/{term}:
 *   get:
 *     summary: Search Customers by Term
 *     tags: [Customers]
 *     description: Search for customers by a term that matches their first name or email.
 *     parameters:
 *       - in: path
 *         name: term
 *         description: The search term to find matching customers.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of customers matching the search term.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating customer not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating an internal server error.
 *                 error:
 *                   type: string
 *                   description: Detailed error message.
 */

/**
 * @swagger
 * /api/v1/p/products/q/{term}:
 *   get:
 *     summary: Search Products by Term
 *     tags: [Products]
 *     description: Search for products by a term that matches their name or description.
 *     parameters:
 *       - in: path
 *         name: term
 *         description: The search term to find matching products.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of products matching the search term.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating product not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating an internal server error.
 *                 error:
 *                   type: string
 *                   description: Detailed error message.
 */
