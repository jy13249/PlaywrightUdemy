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

test('locating parent elements', async ({page}) => {
    await page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: 'Email'}).click()

    await page.locator('nb-card').filter({hasText: 'Basic form'}).getByRole('textbox', {name: 'Email'}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: 'Password'}).click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: 'Sign in'})
    .getByRole('textbox', {name: 'Email'}).click()
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: 'Email'}).click()
})

test('Reusing the locators', async ({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'})
    const emailField = basicForm.getByRole('textbox', {name: 'Email'})


    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', {name: 'Password'}).fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')
})

test('Extracting values', async({page}) => {
    //single text value
    const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    //all text values
    const allRadioButtonsText = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsText).toContain('Option 1')

    //input value
    const emailField = basicForm.getByRole('textbox', {name: 'Email'})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    //attribute value
    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')

})

test('Assertions', async ({page}) => {
    const basicFormButton = page.locator('nb-card').filter({hasText: 'Basic form'}).locator('button')
    //General assertions
    const value = 5
    expect(value).toEqual(5)

    const text = await basicFormButton.textContent()
    expect(text).toEqual('Submit')

    //locator assertions
    await expect(basicFormButton).toHaveText('Submit')  
    
    //Soft assertion(continues test regardless of failure)
    await expect.soft(basicFormButton).toHaveText('Submit')
    await basicFormButton.click()

})
