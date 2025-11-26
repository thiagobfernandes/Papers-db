export const PAPER_CREATED_TEMPLATE = `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="utf-8">
  <title>Novo Paper no Papers JT!</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    /* Design System: Cores e estilos críticos */
    :root {
      --color-bg-primary: #121212;
      --color-bg-secondary: #1E1E1E;
      --color-bg-tertiary: #2B2B2B;
      --color-primary: #4A90E2;
      --color-error: #FF6B6B;
      --color-success: #4CAF50;
      --color-text-primary: #EAEAEA;
      --color-text-secondary: #A0A0A0;
      --border-radius: 10px;
      --shadow-md: 0 2px 8px #0002;
    }
    body {
      background-color: var(--color-bg-primary);
      color: var(--color-text-primary);
      margin: 0;
      font-family: 'Inter', 'Roboto', Arial, sans-serif;
      line-height: 1.7;
    }
    .container {
      max-width: 720px;
      margin: 32px auto;
      background: var(--color-bg-secondary);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-md);
      border: 1px solid #232323;
      padding: 0;
      overflow: hidden;
    }
    .header {
      background: var(--color-bg-tertiary);
      padding: 32px 0 24px 0;
      text-align: center;
      border-bottom: 1px solid #333;
    }
    .header h2 {
      color: var(--color-primary);
      font-size: 2rem;
      font-weight: 700;
      margin: 0;
      letter-spacing: 0.01em;
    }
    .content {
      padding: 32px 42px 20px 42px;
    }
    @media (max-width: 600px) {
      .container { max-width: 96vw; padding: 0 }
      .content { padding: 18px 8vw; }
      .header { padding: 24px 0 16px 0;}
    }
    .details-list {
      margin: 32px 0 28px 0;
      padding: 0;
      display: grid;
      grid-gap: 14px;
    }
    .details-list li {
      background: var(--color-bg-tertiary);
      padding: 16px 18px;
      border-radius: 7px;
      color: var(--color-text-primary);
      font-size: 1.07rem;
      font-weight: 400;
      border-left: 4px solid var(--color-primary);
      box-shadow: 0 1px 2px #2223;
      display: flex;
      align-items: center;
    }
    .details-list li strong { font-weight: 600; color: var(--color-primary); margin-right: 8px; }
    .button {
      background: var(--color-primary);
      color: #fff !important;
      font-size: 1.1rem;
      font-weight: 700;
      border-radius: 6px;
      padding: 14px 34px;
      display: inline-block;
      margin-top: 15px;
      text-decoration: none;
      transition: background .2s;
      border: none;
      box-shadow: 0 0 0 2px #245a8f3b;
    }
    .button:hover { background: #3A74C1; }
    .footer {
      background: var(--color-bg-tertiary);
      font-size: .88em;
      text-align: center;
      color: var(--color-text-secondary);
      padding: 18px 0;
      border-top: 1px solid #333;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>📰 Novo Paper Publicado no Papers JT</h2>
    </div>
    <div class="content">
      <p>Olá <span style="font-weight: bold; color: var(--color-primary);">{{name}}</span>,</p>
      <p>
        Um novo artigo técnico foi publicado na plataforma Papers JT – aproveite conteúdo aprofundado sobre <strong style="color: var(--color-primary);">segurança e vulnerabilidades</strong>.
      </p>
      <ul class="details-list">
        <li><strong>Título:</strong> {{subject}}</li>
        <li><strong>Autor:</strong> {{author}}</li>
        <li><strong>Resumo:</strong> {{body}}</li>
        <li><strong>Publicado em:</strong> {{sentAt}}</li>
      </ul>
      <div style="text-align:center;">
        <a href="{{link}}" class="button" target="_blank">Ver o Paper Completo</a>
      </div>
      <p style="margin-top:32px; color: var(--color-text-secondary); text-align:center;">
        Fique por dentro das novidades em Papers JT.<br>Seu hub de conhecimento em segurança.
      </p>
    </div>
    <div class="footer">
      Notificação automática do Papers JT • Dark Mode nativo • Design System aplicado
    </div>
  </div>
</body>
</html>
`;

export interface TemplateData {
    name: string;
    subject: string; // Título do paper
    body: string; // Resumo do paper
    author: string; // Autor do paper
    link: string; 
    sentAt: string;
}