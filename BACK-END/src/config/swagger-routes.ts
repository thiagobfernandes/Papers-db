/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Realizar login
 *     description: Autentica um usuário e retorna um token JWT
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Registrar novo usuário
 *     description: Cria um novo usuário no sistema
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   $ref: '#/components/schemas/UserResponse'
 *                 message:
 *                   type: string
 *                   example: Usuário criado com sucesso
 *                 status:
 *                   type: number
 *                   example: 201
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Buscar usuário por ID
 *     description: Retorna os dados de um usuário específico
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   $ref: '#/components/schemas/UserResponse'
 *                 message:
 *                   type: string
 *                   example: Usuário encontrado com sucesso
 *                 status:
 *                   type: number
 *                   example: 200
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   put:
 *     summary: Atualizar usuário
 *     description: Atualiza os dados de um usuário existente
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   $ref: '#/components/schemas/UserResponse'
 *                 message:
 *                   type: string
 *                   example: Usuário atualizado com sucesso
 *                 status:
 *                   type: number
 *                   example: 200
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /api/platform:
 *   post:
 *     summary: Criar nova plataforma
 *     description: Cria uma nova plataforma no sistema
 *     tags: [Platform]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlatformCreate'
 *     responses:
 *       201:
 *         description: Plataforma criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   $ref: '#/components/schemas/PlatformResponse'
 *                 message:
 *                   type: string
 *                   example: Plataforma criada com sucesso
 *                 status:
 *                   type: number
 *                   example: 201
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   get:
 *     summary: Listar plataformas com paginação
 *     description: Retorna uma lista paginada de plataformas com filtros opcionais
 *     tags: [Platform]
 *     parameters:
 *       - in: query
 *         name: search[name]
 *         schema:
 *           type: string
 *         description: Buscar por nome da plataforma
 *       - in: query
 *         name: filter[id]
 *         schema:
 *           type: integer
 *         description: Filtrar por ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Itens por página
 *     responses:
 *       200:
 *         description: Lista de plataformas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PlatformResponse'
 *                 message:
 *                   type: string
 *                 status:
 *                   type: number
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /api/platform/{id}:
 *   get:
 *     summary: Buscar plataforma por ID
 *     description: Retorna os dados de uma plataforma específica
 *     tags: [Platform]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da plataforma
 *     responses:
 *       200:
 *         description: Plataforma encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   $ref: '#/components/schemas/PlatformResponse'
 *                 message:
 *                   type: string
 *                 status:
 *                   type: number
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   put:
 *     summary: Atualizar plataforma
 *     description: Atualiza os dados de uma plataforma existente
 *     tags: [Platform]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da plataforma
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlatformCreate'
 *     responses:
 *       200:
 *         description: Plataforma atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   $ref: '#/components/schemas/PlatformResponse'
 *                 message:
 *                   type: string
 *                 status:
 *                   type: number
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   delete:
 *     summary: Deletar plataforma
 *     description: Remove uma plataforma do sistema
 *     tags: [Platform]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da plataforma
 *     responses:
 *       200:
 *         description: Plataforma deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 status:
 *                   type: number
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /api/papers:
 *   post:
 *     summary: Criar novo paper
 *     description: Cria um novo paper associado ao usuário autenticado
 *     tags: [Papers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PapersCreate'
 *     responses:
 *       201:
 *         description: Paper criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   $ref: '#/components/schemas/PapersResponse'
 *                 message:
 *                   type: string
 *                   example: Papers criado com sucesso
 *                 status:
 *                   type: number
 *                   example: 201
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   get:
 *     summary: Listar papers com paginação
 *     description: Retorna uma lista paginada de papers com filtros e ordenação opcionais
 *     tags: [Papers]
 *     parameters:
 *       - in: query
 *         name: search[title]
 *         schema:
 *           type: string
 *         description: Buscar por título
 *       - in: query
 *         name: search[language]
 *         schema:
 *           type: string
 *         description: Buscar por linguagem
 *       - in: query
 *         name: filter[id]
 *         schema:
 *           type: integer
 *         description: Filtrar por ID
 *       - in: query
 *         name: filter[userId]
 *         schema:
 *           type: integer
 *         description: Filtrar por ID do usuário
 *       - in: query
 *         name: filter[platformId]
 *         schema:
 *           type: integer
 *         description: Filtrar por ID da plataforma
 *       - in: query
 *         name: order[createdAt]
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *         description: Ordenar por data de criação
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Itens por página
 *     responses:
 *       200:
 *         description: Lista de papers retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PapersResponse'
 *                 message:
 *                   type: string
 *                 status:
 *                   type: number
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /api/papers/{id}:
 *   get:
 *     summary: Buscar paper por ID
 *     description: Retorna os dados de um paper específico
 *     tags: [Papers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paper
 *     responses:
 *       200:
 *         description: Paper encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   $ref: '#/components/schemas/PapersResponse'
 *                 message:
 *                   type: string
 *                 status:
 *                   type: number
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   put:
 *     summary: Atualizar paper
 *     description: Atualiza os dados de um paper existente (apenas o proprietário pode atualizar)
 *     tags: [Papers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paper
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PapersCreate'
 *     responses:
 *       201:
 *         description: Paper atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   $ref: '#/components/schemas/PapersResponse'
 *                 message:
 *                   type: string
 *                   example: Papers atualizado com sucesso
 *                 status:
 *                   type: number
 *                   example: 201
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   delete:
 *     summary: Deletar paper
 *     description: Remove um paper do sistema (apenas o proprietário pode deletar)
 *     tags: [Papers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paper
 *     responses:
 *       200:
 *         description: Paper deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 status:
 *                   type: number
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
