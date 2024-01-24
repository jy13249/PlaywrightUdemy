import {expect, test} from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200')
})

test.describe('Form Layouts Page', () => {
    test.beforeEach(async ({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('input fields', async ({page}) => {
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'})

        //enter text into input field
        await usingTheGridEmailInput.fill('test@test.com')

        //clear text from input field
        await usingTheGridEmailInput.clear()

        //another way to enter text into input field(adds delay between each character)
        await usingTheGridEmailInput.pressSequentially('test2@test.com', {delay: 500})

        //generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toBe('test2@test.com')

        //locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')
    })

    test('radio buttons', async ({page}) => {
        const usingTheGridForm = page.locator('nb-card', {hasText: 'Using the Grid'})

        //check radio button by label(force is used if element is visually hidden)
        //await usingTheGridForm.getByLabel('Option 1').check({force: true})

        //check radio button by role
        await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).check({force: true})
        const radioStatus = await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked()

        //generic assertion
        expect(radioStatus).toBeTruthy()

        //locator assertion
        await expect(usingTheGridForm.getByRole('radio', {name: 'Option 1'})).toBeChecked()

        //check 2nd radio button
        await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).check({force: true})
        expect(await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked()).toBeFalsy()
        expect(await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).isChecked()).toBeTruthy()
    })


})

