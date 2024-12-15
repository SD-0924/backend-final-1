/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user in the system.
 *     operationId: registerUser
 *     tags:
 *       - User
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
 *                 example: "strongpassword123"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "6afd477d-e3cb-489a-ae09-3bb39fd6fde8"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     first:
 *                       type: string
 *                       example: "John"
 *                     last:
 *                       type: string
 *                       example: "Doe"
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Logs in a user and returns a JWT token along with user details.
 *     operationId: loginUser
 *     tags:
 *       - User
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
 *                 example: "strongpassword123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 firstName:
 *                   type: string
 *                   example: "John"
 *                 lastName:
 *                   type: string
 *                   example: "Doe"
 *       401:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid email or password"
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Fetch user details by their ID.
 *     operationId: getUserById
 *     tags:
 *       - User
 *     security:
 *       - JWT: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to fetch
 *         schema:
 *           type: string
 *           example: "6afd477d-e3cb-489a-ae09-3bb39fd6fde8"
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "6afd477d-e3cb-489a-ae09-3bb39fd6fde8"
 *                 email:
 *                   type: string
 *                   example: "user@example.com"
 *                 first:
 *                   type: string
 *                   example: "John"
 *                 last:
 *                   type: string
 *                   example: "Doe"
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user details
 *     description: Update user information such as email, password, etc.
 *     operationId: updateUser
 *     tags:
 *       - User
 *     security:
 *       - JWT: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *           example: "6afd477d-e3cb-489a-ae09-3bb39fd6fde8"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "newemail@example.com"
 *               first:
 *                 type: string
 *                 example: "John"
 *               last:
 *                 type: string
 *                 example: "Doe"
 *               oldPassword:
 *                 type: string
 *                 example: "strongpassword123"
 *               newPassword:
 *                 type: string
 *                 example: "newstrongpassword123"
 *               confirmPassword:
 *                 type: string
 *                 example: "newstrongpassword123"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User updated successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "6afd477d-e3cb-489a-ae09-3bb39fd6fde8"
 *                     email:
 *                       type: string
 *                       example: "newemail@example.com"
 *       400:
 *         description: Invalid input data or old password is incorrect
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/address/{id}:
 *   put:
 *     summary: Update user address
 *     description: Update the address and mobile number for the user.
 *     operationId: updateUserAddress
 *     tags:
 *       - User
 *     security:
 *       - JWT: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *           example: "6afd477d-e3cb-489a-ae09-3bb39fd6fde8"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               street:
 *                 type: string
 *                 example: "123 Main St"
 *               state:
 *                 type: string
 *                 example: "California"
 *               city:
 *                 type: string
 *                 example: "Los Angeles"
 *               pincode:
 *                 type: string
 *                 example: "90001"
 *               mobileNum:
 *                 type: string
 *                 example: "1234567890"
 *     responses:
 *       200:
 *         description: Address updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User updated successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "6afd477d-e3cb-489a-ae09-3bb39fd6fde8"
 *                     address:
 *                       type: string
 *                       example: "123 Main St, California, Los Angeles, 90001"
 *                     mobileNum:
 *                       type: string
 *                       example: "1234567890"
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Deletes the user with the provided ID from the system.
 *     operationId: deleteUser
 *     tags:
 *       - User
 *     security:
 *       - JWT: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *           example: "6afd477d-e3cb-489a-ae09-3bb39fd6fde8"
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
