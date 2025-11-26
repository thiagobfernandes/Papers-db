import { expect, Page } from "@playwright/test";

export const loginViaUI = async (page: Page) => {
  await page.goto("https://localhost/login");

  await expect(
    page.getByRole("heading", { name: "Acessar Conta" })
  ).toBeVisible();

  await page
    .getByPlaceholder("Digite seu email")
    .fill("joaopaulo_bazan@hotmail.com");
  await page.getByPlaceholder("Digite sua senha").fill("!Paulo123");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/dashboard|exploits/i);
};
