import {expect, test} from '@playwright/test';


test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test.skip('Locator Syntax Rules', async ({page}) => {
    //by Tag name
    page.locator('input')

    //by ID
    page.locator('#inputEmail1')

    //by Class value
    page.locator('.shape-rectangle')

    //by Attribute
    page.locator('[placeholder="Email"]')

    //by entire Class value
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine different selectors
    page.locator('input[placeholder="Email"].shape-rectangle')

    //by XPath (Not recommended)
    page.locator('//input[@placeholder="Email"]')

    //by partial Text match
    page.locator(':text("Using")')

    //by exact text match
    page.locator(":text-is('Using the Grid')")
})

test.skip('User facing locators', async ({page}) => {
    await page.getByRole('textbox', {name: 'Email'}).first().click()

    await page.getByRole('button', {name: 'Sign in'}).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid').click()

    await page.getByTitle('IoT Dashboard').click()

    //await page.getByTestId().click()
})

test('Locating child elements', async ({page}) => {
    
    //can place all locators in one line(similar to xpaths)
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()

    //or you can chain locators
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
    await page.locator('nb-card').getByRole('button', {name: 'Sign in'}).first().click()

    //find the index of the element from the specified locator(not recommended)
    await page.locator('nb-card').nth(3).getByRole('button').click()

})
