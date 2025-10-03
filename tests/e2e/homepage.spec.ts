import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load the homepage successfully', async ({ page }) => {
    await page.goto('/')

    // Check for main heading
    await expect(page.locator('h1')).toContainText('Автоматизация')
  })

  test('should have working navigation', async ({ page }) => {
    await page.goto('/')

    // Check if navigation is visible
    const nav = page.locator('nav')
    await expect(nav).toBeVisible()
  })

  test('should have CTA buttons', async ({ page }) => {
    await page.goto('/')

    // Check for CTA buttons
    const startButton = page.getByRole('button', { name: /начать работу/i })
    await expect(startButton).toBeVisible()

    const learnMoreButton = page.getByRole('button', { name: /узнать больше/i })
    await expect(learnMoreButton).toBeVisible()
  })

  test('should scroll to features section', async ({ page }) => {
    await page.goto('/')

    const learnMoreButton = page.getByRole('button', { name: /узнать больше/i })
    await learnMoreButton.click()

    // Wait for scroll animation
    await page.waitForTimeout(1000)

    // Check if features section is visible
    const featuresSection = page.locator('#features')
    await expect(featuresSection).toBeInViewport()
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    const heading = page.locator('h1')
    await expect(heading).toBeVisible()
  })
})
