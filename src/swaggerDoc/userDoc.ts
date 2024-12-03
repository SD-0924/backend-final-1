/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user or admin
 *     description: This endpoint allows you to register a new user or admin, depending on the role specified.
 *     operationId: registerUserOrAdmin
 *     tags:
 *       - user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               first:
 *                 type: string
 *                 example: "John"
 *               last:
 *                 type: string
 *                 example: "Doe"
 *               password:
 *                 type: string
 *                 example: "userpassword123"
 *               confirmPassword:
 *                 type: string
 *                 example: "userpassword123"
 *               mobileNum:
 *                 type: string
 *                 example: "1234567890"
 *               address:
 *                 type: string
 *                 example: "123 User Street"
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 example: "user"
 *     responses:
 *       201:
 *         description: User or Admin registered successfully
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     description: This endpoint allows users to login and get a JWT token.
 *     operationId: loginUser
 *     tags:
 *       - user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "userpassword123"
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized, invalid credentials
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Fetch a list of all users. Requires admin privileges.
 *     operationId: getAllUsers
 *     tags:
 *       - user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "12345-abcde-67890"
 *                   email:
 *                     type: string
 *                     example: "user@example.com"
 *                   role:
 *                     type: string
 *                     example: "user"
 *       403:
 *         description: Forbidden, access denied
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Fetch details of a user by their ID. Requires admin privileges.
 *     operationId: getUserById
 *     tags:
 *       - user
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "12345-abcde-67890"
 *                 email:
 *                   type: string
 *                   example: "user@example.com"
 *                 role:
 *                   type: string
 *                   example: "user"
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user by ID
 *     description: Update details of a user by their ID. Requires admin privileges.
 *     operationId: updateUser
 *     tags:
 *       - user
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               first:
 *                 type: string
 *               last:
 *                 type: string
 *               mobileNum:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     description: Delete a user by their ID. Requires admin privileges.
 *     operationId: deleteUser
 *     tags:
 *       - user
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to delete
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
