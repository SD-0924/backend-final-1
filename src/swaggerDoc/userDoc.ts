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
 *                       example: "12345-abcde-67890"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     role:
 *                       type: string
 *                       example: "user"
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */

/****************************************** */
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
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1NiIsInJvbGUiOiJ1c2VyIn0.VYmIqaWo9NfD4aWoJX5pPbtm_FJxZ1n1T8Cnl26l9g4"
 *       401:
 *         description: Unauthorized, invalid credentials
 *       500:
 *         description: Internal server error
 */
/*************************************** */

