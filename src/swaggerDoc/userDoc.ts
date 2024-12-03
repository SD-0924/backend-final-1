/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user or admin
 *     description: This endpoint allows you to register a new user or admin, depending on the role specified.
 *     operationId: registerUserOrAdmin
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
 *     summary: Update user info by ID
 *     description: Update details of a user by their ID. Requires admin privileges.
 *     operationId: updateUser
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
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 * 
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
 * /users/address/{id}:
 *   put:
 *     summary: Update user address by user ID
 *     description: Update address of a user by their ID. Requires admin privileges.
 *     operationId: updateUseradress
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
 *               street:
 *                 type: string
 *               state:
 *                 type: string
 *               city:
 *                 type: string
 *               mobileNum:
 *                 type: string
 *               pincode:
 *                 type: string
 * 
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Old password is incorrect
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete user by ID
 *     description: Delete a user by their ID. Requires admin privileges.
 *     operationId: deleteUser
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
