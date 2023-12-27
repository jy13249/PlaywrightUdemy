import {expect, test} from '@playwright/test';

test('the first test', async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    await expect(page.getByText('Inline form')).toBeVisible()
})

