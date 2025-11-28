export const PAPER_CREATED_TEMPLATE = `
<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <title>Novo Paper - Papers JT</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body style="margin:0; padding:0; background:#121212; font-family:Arial, sans-serif; color:#EAEAEA;">

  <!-- Container -->
  <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#121212">
    <tr>
      <td align="center" style="padding:30px 0;">

        <table width="720" cellpadding="0" cellspacing="0" bgcolor="#1E1E1E" 
               style="width:720px; max-width:720px; border-radius:10px; border:1px solid #232323;">

          <!-- Header -->
          <tr>
            <td bgcolor="#2B2B2B" style="padding:32px 0 24px 0; text-align:center; border-bottom:1px solid #333;">
              <h2 style="color:#4A90E2; margin:0; font-size:28px; font-weight:700;">
                📰 Novo Paper Publicado no Papers JT
              </h2>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:32px 42px 20px 42px; color:#EAEAEA;">

              <p style="margin:0 0 16px 0; font-size:16px;">
                Olá <span style="font-weight:bold; color:#4A90E2;">{{name}}</span>,
              </p>

              <p style="margin:0 0 24px 0; color:#EAEAEA; font-size:16px;">
                Um novo artigo técnico foi publicado na plataforma Papers JT – aproveite conteúdo aprofundado sobre
                <strong style="color:#4A90E2;">segurança e vulnerabilidades</strong>.
              </p>

              <!-- Lista -->
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding:0;">

                    <!-- Item -->
                    <table width="100%" cellspacing="0" cellpadding="0" 
                           style="margin-bottom:14px; background:#2B2B2B; border-left:4px solid #4A90E2; border-radius:6px;">
                      <tr>
                        <td style="padding:16px 18px; color:#EAEAEA; font-size:16px;">
                          <strong style="color:#4A90E2;">Título:</strong> {{subject}}
                        </td>
                      </tr>
                    </table>

                    <!-- Item -->
                    <table width="100%" cellspacing="0" cellpadding="0" 
                           style="margin-bottom:14px; background:#2B2B2B; border-left:4px solid #4A90E2; border-radius:6px;">
                      <tr>
                        <td style="padding:16px 18px; color:#EAEAEA; font-size:16px;">
                          <strong style="color:#4A90E2;">Autor:</strong> {{author}}
                        </td>
                      </tr>
                    </table>

                    <!-- Item -->
                    <table width="100%" cellspacing="0" cellpadding="0" 
                           style="margin-bottom:14px; background:#2B2B2B; border-left:4px solid #4A90E2; border-radius:6px;">
                      <tr>
                        <td style="padding:16px 18px; color:#EAEAEA; font-size:16px;">
                          <strong style="color:#4A90E2;">Resumo:</strong> {{body}}
                        </td>
                      </tr>
                    </table>

                    <!-- Item -->
                    <table width="100%" cellspacing="0" cellpadding="0" 
                           style="margin-bottom:14px; background:#2B2B2B; border-left:4px solid #4A90E2; border-radius:6px;">
                      <tr>
                        <td style="padding:16px 18px; color:#EAEAEA; font-size:16px;">
                          <strong style="color:#4A90E2;">Publicado em:</strong> {{sentAt}}
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

              <!-- Botão -->
              <div style="text-align:center; margin-top:30px;">
                <a href="{{link}}" download   
                   style="background:#4A90E2; color:#fff; font-size:18px; font-weight:bold;
                          text-decoration:none; padding:14px 34px; border-radius:6px; display:inline-block;">
                  Ver o Paper Completo
                </a>
              </div>

              <p style="margin:32px 0 0 0; color:#A0A0A0; text-align:center; font-size:14px;">
                Fique por dentro das novidades em Papers JT.<br>
                Seu hub de conhecimento em segurança.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td bgcolor="#2B2B2B" style="padding:18px 0; text-align:center; color:#A0A0A0; font-size:13px; border-top:1px solid #333;">
              Notificação automática do Papers JT • Dark Mode nativo
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

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