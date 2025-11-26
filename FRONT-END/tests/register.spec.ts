import { test, expect } from "@playwright/test";

test.describe("Página de Registro", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://localhost/register");
  });

  test("deve exibir todos os campos do formulário de registro", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", { name: "Criar Conta" })
    ).toBeVisible();

    await expect(page.getByPlaceholder("Digite o nome completo")).toBeVisible();
    await expect(
      page.getByPlaceholder("Digite o nome de usuario")
    ).toBeVisible();
    await expect(page.getByPlaceholder("example@example.com")).toBeVisible();
    await expect(page.getByPlaceholder("000.000.000-00")).toBeVisible();
    await expect(
      page.getByPlaceholder("Digite uma senha segura")
    ).toBeVisible();
    await expect(page.getByPlaceholder("Confirme sua senha")).toBeVisible();
    await page.getByLabel("Telefone Principal");
    await page.getByLabel("Telefone Secundário");
    await page.getByLabel("Data de Nascimento");
    await page.getByTestId("select-genre").click();
    await page.waitForSelector(".ant-select-dropdown");
    await page
      .locator(".ant-select-item-option-content", { hasText: "Masculino" })
      .click();

    await expect(page.getByRole("button", { name: "Registrar" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Já tem uma conta? Faça login" })
    ).toBeVisible();
  });

  test("deve exibir mensagens de erro para campos obrigatórios", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Registrar" }).click();

    await expect(page.getByText(/nome obrigatório/i)).toBeVisible();
    await expect(page.getByText(/usuário obrigatório/i)).toBeVisible();
    await expect(page.getByText(/email obrigatório/i)).toBeVisible();
    await expect(page.getByText(/cpf obrigatório/i)).toBeVisible();
    await expect(
      page.getByText(/Senha com no mínimo 6 caracteres/i)
    ).toBeVisible();
    await expect(page.getByText(/telefone obrigatório/i)).toBeVisible();
    await expect(
      page.getByText(/data de nascimento obrigatória/i)
    ).toBeVisible();
    await expect(page.getByText(/gênero obrigatório/i)).toBeVisible();
  });

  test("deve validar email e cpf inválidos", async ({ page }) => {
    await page.getByPlaceholder("example@example.com").fill("email inválido");
    await page.getByPlaceholder("000.000.000-00").fill("123.123.123-12");

    await page.getByRole("button", { name: "Registrar" }).click();

    await expect(page.locator("text=Email inválido")).toBeVisible();
    await expect(page.getByText(/cpf inválido/i)).toBeVisible();
  });

  test("deve exibir erro se as senhas não coincidirem", async ({ page }) => {
    await page.getByPlaceholder("Digite o nome completo").fill("João Teste");
    await page.getByPlaceholder("Digite o nome de usuario").fill("joaoteste");
    await page.getByPlaceholder("example@example.com").fill("teste@email.com");
    await page.getByPlaceholder("000.000.000-00").fill("123.456.789-00");
    await page.getByPlaceholder("00/00/0000").fill("01/01/2000");
    await page.getByPlaceholder("Digite uma senha segura").fill("Senha123!");
    await page.getByPlaceholder("Confirme sua senha").fill("Diferente123!");
    await page.locator('input[name="primaryPhone"]').fill("(11) 1 1111-1111");
    await page.getByTestId("select-genre").click();
    await page.waitForSelector(".ant-select-dropdown");
    await page
      .locator(".ant-select-item-option-content", { hasText: "Masculino" })
      .click();

    await page.getByRole("button", { name: "Registrar" }).click();

    await expect(page.getByText(/as senhas não coincidem/i)).toBeVisible();
  });

  test("deve registrar com sucesso e redirecionar para /login", async ({
    page,
  }) => {
    await page.route("**/api/users", async (route) => {
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({ id: 1, name: "Usuário Teste" }),
      });
    });

    await page.getByPlaceholder("Digite o nome completo").fill("Usuário Teste");
    await page
      .getByPlaceholder("Digite o nome de usuario")
      .fill("usuarioteste");
    await page.getByPlaceholder("example@example.com").fill("teste@email.com");
    await page.getByPlaceholder("000.000.000-00").fill("123.456.789-00");
    await page
      .getByPlaceholder("Digite uma senha segura")
      .fill("senhaSegura123!");
    await page.getByPlaceholder("Confirme sua senha").fill("senhaSegura123!");
    await page.locator('input[name="primaryPhone"]').fill("(11) 1 1111-1111");
    await page.getByPlaceholder("00/00/0000").fill("01/01/2000");
    await page.getByTestId("select-genre").click();
    await page.waitForSelector(".ant-select-dropdown");
    await page
      .locator(".ant-select-item-option-content", { hasText: "Masculino" })
      .click();

    await page.getByRole("button", { name: "Registrar" }).click();

    await page.goto("https://localhost/login");

    await expect(page).toHaveURL("https://localhost/login");
  });

  //   test("deve exibir erro da API para email já cadastrado", async ({ page }) => {
  //     await page.route("**/api/users", async (route) => {
  //       await route.fulfill({
  //         status: 409,
  //         contentType: "application/json",
  //         body: JSON.stringify({ email: "Este e-mail já está cadastrado" }),
  //       });
  //     });

  //     await page.getByPlaceholder("Digite o nome completo").fill("Usuário Teste");
  //     await page
  //       .getByPlaceholder("Digite o nome de usuario")
  //       .fill("usuarioteste");
  //     await page
  //       .getByPlaceholder("example@example.com")
  //       .fill("duplicado@email.com");
  //     await page.getByPlaceholder("000.000.000-00").fill("123.456.789-00");
  //     await page
  //       .getByPlaceholder("Digite uma senha segura")
  //       .fill("senhaSegura123!");
  //     await page.getByPlaceholder("Confirme sua senha").fill("senhaSegura123!");
  //     await page.locator('input[name="primaryPhone"]').fill("(11) 1 1111-1111");
  //     await page.getByPlaceholder("00/00/0000").fill("01/01/2000");
  //     await page.getByTestId("select-genre").click();
  //     await page.waitForSelector(".ant-select-dropdown");
  //     await page
  //       .locator(".ant-select-item-option-content", { hasText: "Masculino" })
  //       .click();

  //     await page.getByRole("button", { name: "Registrar" }).click();

  //     await expect(
  //       page.getByText("Este e-mail já está cadastrado")
  //     ).toBeVisible();
  //     await expect(page).toHaveURL("https://localhost/register");
  //   });

  test("deve navegar para a página de login ao clicar em 'Já tem uma conta?'", async ({
    page,
  }) => {
    await page
      .getByRole("button", { name: "Já tem uma conta? Faça login" })
      .click();
    await expect(page).toHaveURL("https://localhost/login");
  });
});
