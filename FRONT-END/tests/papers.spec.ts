import { test, expect } from "@playwright/test";
import { loginViaUI } from "./utils/auth";
import { goToPapersTab } from "./utils/got-to-tabs";

test.describe.serial("Criação de Exploits após login", () => {
  test("deve fazer login e criar um novo paper com sucesso", async ({
    page,
  }) => {
    await loginViaUI(page);
    await page.reload();

    await goToPapersTab(page);

    await page.getByRole("button", { name: "Criar novo" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await page.locator('input[name="title"]').fill("Paper de Teste E2E");
    await page.locator('input[name="language"]').fill("PHP");

    await page
      .locator('.ant-form-item:has-text("Plataforma") .ant-select')
      .click();
    await page.waitForSelector(".ant-select-dropdown");
    await page
      .locator(".ant-select-item-option-content", { hasText: "PHP" })
      .click();

    await page.getByRole("button", { name: "Salvar" }).click();

    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(page.getByText(/paper criado com sucesso/i)).toBeVisible();
  });

  test("deve exibir mensagens de erro ao tentar criar um paper com campos obrigatórios vazios", async ({
    page,
  }) => {
    await loginViaUI(page);
    await page.reload();

    await goToPapersTab(page);

    await page.getByRole("button", { name: "Criar novo" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await page.getByRole("button", { name: "Salvar" }).click();

    await expect(page.getByText("Título obrigatório")).toHaveCount(1);
    await expect(page.getByText("Linguagem obrigatória")).toBeVisible();
    await expect(page.getByText("Plataforma obrigatória")).toBeVisible();
  });

  test("deve listar os papers na tabela", async ({ page }) => {
    await loginViaUI(page);
    await page.reload();

    await goToPapersTab(page);

    const rows = page.locator("table tbody tr");
    await expect(await rows.count()).toBeGreaterThan(0);
  });

  test("deve mostrar erro ao tentar salvar edição com título vazio", async ({
    page,
  }) => {
    await loginViaUI(page);
    await page.reload();

    await goToPapersTab(page);

    const editButton = page.getByRole("button", { name: "✏️" }).first();
    await expect(editButton).toBeVisible();
    await editButton.click();

    const modal = page.getByRole("dialog", { name: /editar paper/i });
    await expect(modal).toBeVisible();

    const titleInput = page.locator('input[name="title"]');
    await titleInput.fill("");

    await page.getByRole("button", { name: "Salvar" }).click();
    await expect(page.getByText("Título obrigatório")).toBeVisible();
  });

  test("deve permitir editar um paper existente", async ({ page }) => {
    await loginViaUI(page);
    await page.reload();

    await goToPapersTab(page);

    const editButton = page.getByRole("button", { name: "✏️" }).first();
    await expect(editButton).toBeVisible();
    await editButton.click();

    const modal = page.getByRole("dialog", { name: /editar paper/i });
    await expect(modal).toBeVisible();

    const titleInput = page.locator('input[name="title"]');
    await titleInput.fill("Paper editado via E2E");

    await page.getByRole("button", { name: "Salvar" }).click();

    await expect(modal).not.toBeVisible();
    await expect(page.getByText(/paper atualizado com sucesso/i)).toBeVisible();

    await expect(page.getByText("Paper editado via E2E")).toBeVisible();
  });

  test("deve permitir deletar um paper existente", async ({ page }) => {
    await loginViaUI(page);
    await page.reload();

    await goToPapersTab(page);

    await page.getByRole("button", { name: "🗑️" }).first().click();

    const confirmModal = page.getByRole("dialog", {
      name: /confirmar exclusão/i,
    });
    await expect(confirmModal).toBeVisible();

    await page.getByRole("button", { name: "Sim, deletar" }).click();
    await expect(page.getByText(/paper deletado com sucesso/i)).toBeVisible();
  });
});
