import { expect, Page } from "@playwright/test";

export async function goToPapersTab(page: Page) {
  await page.goto("https://localhost/exploits");
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(1000);

  const meusPostsButton = page.getByRole("button", { name: "Meus posts" });
  await expect(meusPostsButton).toBeVisible();
  await meusPostsButton.click();

  await expect(page).toHaveURL(/\/user\/posts\/exploits/);

  const papersTab = page.getByRole("tab", { name: "Papers" });
  await expect(papersTab).toBeVisible();
  await papersTab.click();

  await expect(page).toHaveURL("https://localhost/user/posts/papers");
  await expect(page.getByRole("table")).toBeVisible();
}

export async function goToExploitsTab(page: Page) {
  await page.goto("https://localhost/exploits", {
    waitUntil: "domcontentloaded",
  });
  await page.waitForTimeout(1000);

  const meusPostsButton = page.getByRole("button", { name: "Meus posts" });
  await expect(meusPostsButton).toBeVisible();
  await meusPostsButton.click();

  await expect(page).toHaveURL(/\/user\/posts\/exploits/);

  const exploitsTab = page.getByRole("tab", { name: "Exploits" });
  await expect(exploitsTab).toBeVisible();
  await exploitsTab.click();

  await expect(page).toHaveURL("https://localhost/user/posts/exploits");
  await expect(page.getByRole("table")).toBeVisible();
}
