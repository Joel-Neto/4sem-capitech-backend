import { Router } from 'express';
import { TrailController } from '../controller/TrailController';
import { ensureAuthenticate } from '../middlewares/Authorization';

const routes = Router();
const trailController = new TrailController();
/**
 * @swagger
 * /trilhas:
 *   get:
 *     summary: Retrieve a list of trails
 *     tags:
 *       - Trail
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items to retrieve
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of items to skip
 *     responses:
 *       200:
 *         description: Success in retrieving trails
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Trail'
 *       500:
 *         description: Error retrieving trails
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
routes.get('/trilhas', trailController.getAll);

/**
 * @swagger
 * /trilhas/{id}:
 *   get:
 *     summary: Retrieve a single trail by ID
 *     tags:
 *       - Trail
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The trail ID
 *     responses:
 *       200:
 *         description: Success in retrieving the trail
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trail'
 *       404:
 *         description: Trail not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error retrieving the trail
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
routes.get('/trilhas/:id', trailController.getOne);

/**
 * @swagger
 * /trilhas:
 *   post:
 *     summary: Create a new trail
 *     tags:
 *       - Trail
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Trail object to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Trail'
 *     responses:
 *       201:
 *         description: Trail created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trail'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
routes.post('/trilhas', ensureAuthenticate, trailController.create);

/**
 * @swagger
 * /trilhas/{id}:
 *   put:
 *     summary: Update an existing trail
 *     tags:
 *       - Trail
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The trail ID
 *     requestBody:
 *       description: Trail object to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Trail'
 *     responses:
 *       200:
 *         description: Trail updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trail'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Trail not found
 *       500:
 *         description: Internal server error
 */
routes.put('/trilhas/:id', ensureAuthenticate, trailController.update);

/**
 * @swagger
 * /trilhas/{id}:
 *   delete:
 *     summary: Delete an existing trail
 *     tags:
 *       - Trail
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The trail ID
 *     responses:
 *       200:
 *         description: Trail deleted successfully
 *       404:
 *         description: Trail not found
 *       500:
 *         description: Internal server error
 */
routes.delete('/trilhas/:id', ensureAuthenticate, trailController.delete);

export default routes;
