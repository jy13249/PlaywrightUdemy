import {expect, test} from '@playwright/test';


test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
})

test.describe('suite1', () => {
    test.beforeEach(async ({page}) => {
        await page.getByRole('link', { name: 'Charts', exact: true }).click()
    })
    
    test('the first test', async ({page}) => {
    await page.getByText('Echarts').click()
    })
})

test.describe('suite2', () => {
    test.beforeEach(async ({page}) => {
        await page.getByText('Forms').click()
    })
    
    test('the first test', async ({page}) => {
    await page.getByText('Form Layouts').click()
    await expect(page.getByText('Inline form')).toBeVisible()
    })

})