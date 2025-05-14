const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const apiLimiter = rateLimit({
    windowMs: 1000*60*1,   // 1 minutes
    max: 5, // 5 times
    message: 'Too many requests, please try again after 1 minutes!' // if have sent more that have show message 
});
const userController = require('../controllers/users');
const authController = require('../controllers/auth');
const customerController = require('../controllers/customers');

router.post('/customers', apiLimiter, customerController.createCustomer);
router.put('/customers', apiLimiter, customerController.updateCustomer);
router.delete('/customers/:id',apiLimiter, customerController.deleteCustomer);
router.get('/customers/:id', apiLimiter, customerController.getCustomer);
router.get('/customers/q/:term', apiLimiter, customerController.getCustomersByTerm);
router.get('/customers', apiLimiter, customerController.getCustomers);
router.get('/customers', authController.verifyToken, customerController.getCustomers);

router.post('/users', userController.createUser);
router.post('/login', authController.login);
router.get('/logout', authController.logout);


module.exports = router;

/**
 * @swagger
 * components:
 *    schemas:
 *      Customer:
 *        type: object
 *        properties:
 *          customer_id:
 *            type: integer
 *            description: The unique identifier of the customer.
 *          first_name:
 *            type: string
 *            description: The customer's firstname.
 *          last_name:
 *            type: string
 *            description: The customer's lastname.
 *          address:
 *            type: string
 *            description: The customer's address.
 *          email:
 *            type: string
 *            description: The customer's email (unique).
 *          phone_number:
 *            type: string
 *            description: The customer's phone number.
 *        required:
 *          - none
 */

/**
 * @swagger
 * /api/v1/customers:
 *   get:
 *     summary: Get All Customers
 *     tags: [Customers]
 *     description: Returns a list of all customers in the database.
 *     responses:
 *       200:
 *         description: A list of customers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Internal server error.
 * 
 */

/**
 * @swagger
 * /api/v1/customers/{id}:
 *   get:
 *     summary: Get Customer by ID
 *     tags: [Customers]
 *     description: Returns a single customer object based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The unique identifier of the customer.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Customer object found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
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
 *
 */

/**
 * @swagger
 * /api/v1/customers:
 *   post:
 *     summary: Create a new Customer 
 *     tags: [Customers]
 *     description: create a new customer on database 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Customer object created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Internal server error.
 *
 */

/**
 * @swagger
 * /api/v1/customers:
 *   put:
 *     summary: Update Customer
 *     tags: [Customers]
 *     description: Update customer information in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Customer'
 *             required:
 *               - customer_id
 *               - first_name
 *               - last_name
 *               - address
 *               - email
 *               - phone_number
 *     responses:
 *       200:
 *         description: Customer information updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer to update not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/customers/{id}:
 *   delete:
 *     summary: Delete Customer by ID
 *     tags: [Customers]
 *     description: Deletes a single customer object based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The unique identifier of the customer.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Customer object deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
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
