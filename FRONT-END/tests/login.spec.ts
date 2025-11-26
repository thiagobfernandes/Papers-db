import { test, expect } from "@playwright/test";

test.describe("Página de Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://localhost/login");
  });

  test("deve exibir os elementos corretos na página de login", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", { name: "Acessar Conta" })
    ).toBeVisible();
    await expect(page.getByPlaceholder("Digite seu email")).toBeVisible();
    await expect(page.getByPlaceholder("Digite sua senha")).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeEnabled();
    await expect(
      page.getByRole("button", { name: "Criar nova conta" })
    ).toBeVisible();
  });

  test("deve exibir mensagens de erro para campos vazios", async ({ page }) => {
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText("Email obrigatório")).toBeVisible();
    await expect(page.getByText("Senha obrigatória")).toBeVisible();
  });

  test("deve exibir mensagem de erro para email inválido", async ({ page }) => {
    await page.getByPlaceholder("Digite seu email").fill("emailinvalido");
    await page.getByPlaceholder("Digite sua senha").fill("senha123");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText(/Email inválido/i)).toBeVisible();
  });

  test("deve realizar o login com sucesso e navegar para a página de exploits", async ({
    page,
  }) => {
    await page.route("**/api/login", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ content: "fake-jwt-token-de-sucesso" }),
      });
    });

    await page.getByPlaceholder("Digite seu email").fill("usuario@valido.com");
    await page.getByPlaceholder("Digite sua senha").fill("senhaCorreta123");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL("https://localhost/exploits");
    await expect(page.getByText("Login realizado com sucesso.")).toBeVisible();
  });

  test("deve exibir mensagem de erro para credenciais inválidas (status 400 ou 403)", async ({
    page,
  }) => {
    await page.route("**/api/login", async (route) => {
      await route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({ message: "Email ou senha incorretos" }),
      });
    });

    await page
      .getByPlaceholder("Digite seu email")
      .fill("usuario@invalido.com");
    await page.getByPlaceholder("Digite sua senha").fill("senhaIncorreta");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText(/email ou senha inválidos/i)).toBeVisible();
    await expect(page).toHaveURL("https://localhost/login");
  });

  test("deve exibir mensagem de erro genérica para falha na API (outros status)", async ({
    page,
  }) => {
    await page.route("**/api/login", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ message: "Erro interno do servidor" }),
      });
    });

    await page.getByPlaceholder("Digite seu email").fill("qualquer@email.com");
    await page.getByPlaceholder("Digite sua senha").fill("qualquer_senha");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(
      page.getByText(/erro ao fazer login\.? tente novamente/i)
    ).toBeVisible();
    await expect(page).toHaveURL("https://localhost/login");
  });

  test("deve navegar para a página de registro ao clicar em 'Criar nova conta'", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Criar nova conta" }).click();
    await expect(page).toHaveURL("https://localhost/register");
  });
});
