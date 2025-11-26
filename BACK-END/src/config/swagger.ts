import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ExploitDB API',
      version: '1.0.0',
      description: 'API completa para gerenciamento de usuários, papers e plataformas',
      contact: {
        name: 'API Support',
        email: 'support@exploitdb.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Token JWT obtido através do endpoint /api/login'
        }
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensagem de erro para o usuário'
            },
            messageDev: {
              type: 'string',
              description: 'Mensagem técnica para desenvolvedores'
            },
            method: {
              type: 'string',
              description: 'Método onde o erro ocorreu'
            }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'usuario@exemplo.com',
              description: 'Email do usuário'
            },
            password: {
              type: 'string',
              format: 'password',
              example: 'senha123',
              description: 'Senha do usuário'
            }
          }
        },
        LoginResponse: {
          type: 'object',
          properties: {
            content: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                  description: 'Token JWT para autenticação'
                },
                user: {
                  $ref: '#/components/schemas/UserResponse'
                }
              }
            },
            message: {
              type: 'string',
              example: 'Login realizado com sucesso'
            },
            status: {
              type: 'number',
              example: 200
            }
          }
        },
        UserCreate: {
          type: 'object',
          required: ['name', 'username', 'email', 'password', 'cpf', 'primaryPhone', 'dateOfBirth', 'genre'],
          properties: {
            name: {
              type: 'string',
              minLength: 3,
              maxLength: 100,
              example: 'João da Silva',
              description: 'Nome completo do usuário'
            },
            username: {
              type: 'string',
              minLength: 3,
              maxLength: 30,
              example: 'joaosilva',
              description: 'Nome de usuário único'
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'joao@exemplo.com',
              description: 'Email do usuário'
            },
            password: {
              type: 'string',
              minLength: 6,
              format: 'password',
              example: 'senha123',
              description: 'Senha do usuário'
            },
            cpf: {
              type: 'string',
              pattern: '^\\d{11}$',
              example: '12345678901',
              description: 'CPF do usuário (apenas números)'
            },
            primaryPhone: {
              type: 'string',
              example: '11987654321',
              description: 'Telefone principal'
            },
            secondaryPhone: {
              type: 'string',
              example: '11912345678',
              description: 'Telefone secundário (opcional)'
            },
            dateOfBirth: {
              type: 'string',
              format: 'date',
              example: '1990-01-15',
              description: 'Data de nascimento'
            },
            genre: {
              type: 'string',
              enum: ['Masculino', 'Feminino', 'Outro'],
              example: 'Masculino',
              description: 'Gênero do usuário'
            }
          }
        },
        UserUpdate: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              minLength: 3,
              maxLength: 100,
              example: 'João da Silva Santos'
            },
            username: {
              type: 'string',
              minLength: 3,
              maxLength: 30,
              example: 'joaosilva2024'
            },
            cpf: {
              type: 'string',
              pattern: '^\\d{11}$',
              example: '12345678901'
            },
            primaryPhone: {
              type: 'string',
              minLength: 11,
              example: '11987654321'
            },
            secondaryPhone: {
              type: 'string',
              minLength: 11,
              example: '11912345678'
            },
            dateOfBirth: {
              type: 'string',
              format: 'date',
              example: '1990-01-15'
            },
            genre: {
              type: 'string',
              enum: ['Masculino', 'Feminino', 'Outro'],
              example: 'Masculino'
            }
          }
        },
        UserResponse: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              example: 1
            },
            name: {
              type: 'string',
              example: 'João da Silva'
            },
            username: {
              type: 'string',
              example: 'joaosilva'
            },
            email: {
              type: 'string',
              example: 'joao@exemplo.com'
            },
            cpf: {
              type: 'string',
              example: '12345678901'
            },
            primaryPhone: {
              type: 'string',
              example: '11987654321'
            },
            secondaryPhone: {
              type: 'string',
              nullable: true,
              example: '11912345678'
            },
            dateOfBirth: {
              type: 'string',
              format: 'date',
              example: '1990-01-15'
            },
            genre: {
              type: 'string',
              example: 'Masculino'
            }
          }
        },
        PlatformCreate: {
          type: 'object',
          required: ['name'],
          properties: {
            name: {
              type: 'string',
              minLength: 3,
              example: 'HackerOne',
              description: 'Nome da plataforma'
            }
          }
        },
        PlatformResponse: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              example: 1
            },
            name: {
              type: 'string',
              example: 'HackerOne'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-15T10:30:00Z'
            }
          }
        },
        PlatformPaginationQuery: {
          type: 'object',
          properties: {
            search: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  example: 'Hacker'
                }
              }
            },
            filter: {
              type: 'object',
              properties: {
                id: {
                  type: 'number',
                  example: 1
                }
              }
            },
            page: {
              type: 'number',
              example: 1,
              description: 'Número da página'
            },
            pageSize: {
              type: 'number',
              example: 10,
              description: 'Quantidade de itens por página'
            }
          }
        },
        PapersCreate: {
          type: 'object',
          required: ['title', 'language', 'platformId'],
          properties: {
            title: {
              type: 'string',
              minLength: 3,
              example: 'SQL Injection Vulnerability',
              description: 'Título do paper'
            },
            language: {
              type: 'string',
              minLength: 2,
              example: 'pt-BR',
              description: 'Linguagem do paper'
            },
            platformId: {
              type: 'number',
              example: 1,
              description: 'ID da plataforma associada'
            }
          }
        },
        PapersResponse: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              example: 1
            },
            title: {
              type: 'string',
              example: 'SQL Injection Vulnerability'
            },
            language: {
              type: 'string',
              example: 'pt-BR'
            },
            userId: {
              type: 'number',
              example: 1
            },
            platformId: {
              type: 'number',
              example: 1
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-15T10:30:00Z'
            }
          }
        },
        PapersPaginationQuery: {
          type: 'object',
          properties: {
            search: {
              type: 'object',
              properties: {
                title: {
                  type: 'string',
                  example: 'SQL'
                },
                language: {
                  type: 'string',
                  example: 'pt-BR'
                }
              }
            },
            filter: {
              type: 'object',
              properties: {
                id: {
                  type: 'number',
                  example: 1
                },
                userId: {
                  type: 'number',
                  example: 1
                },
                platformId: {
                  type: 'number',
                  example: 1
                }
              }
            },
            order: {
              type: 'object',
              properties: {
                createdAt: {
                  type: 'string',
                  enum: ['ASC', 'DESC'],
                  example: 'DESC'
                }
              }
            },
            page: {
              type: 'number',
              example: 1
            },
            pageSize: {
              type: 'number',
              example: 10
            }
          }
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            content: {
              type: 'object',
              description: 'Conteúdo da resposta'
            },
            message: {
              type: 'string',
              description: 'Mensagem de sucesso'
            },
            status: {
              type: 'number',
              description: 'Código de status HTTP'
            }
          }
        }
      },
      responses: {
        UnauthorizedError: {
          description: 'Token de autenticação inválido ou ausente',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'Token inválido ou expirado',
                messageDev: 'JWT verification failed',
                method: 'JwtMiddleware.verifyToken'
              }
            }
          }
        },
        BadRequestError: {
          description: 'Requisição inválida',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'O nome é obrigatório',
                messageDev: 'Validation Error',
                method: 'CreateUserController.handle'
              }
            }
          }
        },
        NotFoundError: {
          description: 'Recurso não encontrado',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'Recurso não encontrado',
                messageDev: 'Resource not found in database',
                method: 'FindUserByIdUsecase.execute'
              }
            }
          }
        },
        ServerError: {
          description: 'Erro interno do servidor',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'Erro interno do servidor',
                messageDev: 'Database connection failed',
                method: 'Server.startServer'
              }
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Authentication',
        description: 'Endpoints de autenticação'
      },
      {
        name: 'Users',
        description: 'Gerenciamento de usuários'
      },
      {
        name: 'Platform',
        description: 'Gerenciamento de plataformas'
      },
      {
        name: 'Papers',
        description: 'Gerenciamento de papers'
      }
    ]
  },
  apis: ['./src/config/swagger-routes.ts']
};

export const swaggerSpec = swaggerJsdoc(options);
