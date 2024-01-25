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

test('checkboxes', async ({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    //uncheck checkbox
    await page.getByRole('checkbox', {name: 'Hide on Click'}).uncheck({force: true})

    //check checkbox
    await page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).check({force: true})

    //check all checkboxes
    const allCheckboxes = page.getByRole('checkbox')

    //loop through all checkboxes and check them
    for (let checkbox of await allCheckboxes.all()) {
        await checkbox.check({force: true})
        expect(await checkbox.isChecked()).toBeTruthy()
    }

    //loop through all checkboxes and uncheck them
    for (let checkbox of await allCheckboxes.all()) {
        await checkbox.uncheck({force: true})
        expect(await checkbox.isChecked()).toBeFalsy()
    }

})

test('lists and dropdowns', async ({page}) => {
    const dropdownMenu = page.locator('ngx-header nb-select')
    await dropdownMenu.click()

    page.getByRole('list') //list can be used when there is a UL tag
    page.getByRole('listitem') //listitem can be used when there is a LI tag

    //const optionList = page.getByRole('list').locator('nb-option')
    const optionList = page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate'])
    await optionList.filter({hasText: 'Cosmic'}).click()
    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    //loop through all colors and check if header color changes
    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }

    await dropdownMenu.click()
    for(let color in colors){
        await optionList.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if(color != "Corporate")    
            await dropdownMenu.click()
    }
})

test('tooltips', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const tooltipCard = page.locator('nb-card', {hasText: 'Tooltip Placements'})
    await tooltipCard.getByRole('button', {name: 'Top'}).hover()

    page.getByRole('tooltip') //if you have a role tooltip created
    const toolTip = await page.locator('nb-tooltip').textContent()
    expect(toolTip).toEqual('This is a tooltip')
})

test("dialog boxes", async({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    //create a listener for browser-based dialog boxes
    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual("Are you sure you want to delete?")
        dialog.accept()
    })

    await page.getByRole('table').locator('tr', {hasText: "mdo@gmail.com"}).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
})

test("web tables", async({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    //get the row by any text in the row
    const targetRow = page.getByRole('row', {name: "twitter@outlook.com"})
    await targetRow.locator(".nb-edit").click()
    await page.locator("input-editor").getByPlaceholder("Age").clear()
    await page.locator("input-editor").getByPlaceholder("Age").fill("35")
    await page.locator(".nb-checkmark").click()

    //get the row based on the value in the specific column
    await page.locator(".ng2-smart-pagination-nav").getByText("2").click()
    //grabs 2 rows, grabs the 2nd column values for each rows, and only grabs the column with the text 11
    const targetRowById = page.getByRole("row", {name: "11"}).filter({has: page.locator("td").nth(1).getByText("11")})
    await targetRowById.locator(".nb-edit").click()
    await page.locator("input-editor").getByPlaceholder("E-mail").clear()
    await page.locator("input-editor").getByPlaceholder("E-mail").fill("test@test.com")
    await page.locator(".nb-checkmark").click()
    await expect(targetRowById.locator("td").nth(5)).toHaveText("test@test.com")

    //test the filter of the table
    const ages = ["20", "30", "40", "200"]

    //first loop to loop through all ages
    for(let age of ages)
    {
        //clear the age filter and input age
        await page.locator("input-filter").getByPlaceholder("Age").clear()
        await page.locator("input-filter").getByPlaceholder("Age").fill(age)

        if(age != "200")
        {
            //dynamic wait to wait for first row to contain age
            await page.locator("tbody tr").nth(0).getByText(age).waitFor()
            const ageRows = page.locator("tbody tr")

            //second loop to get text for all rows and assert age in rows is age in filter
            for(let row of await ageRows.all())
            {
                const cellValue = await row.locator("td").last().textContent()
                expect(cellValue).toEqual(age)
            }
        }

        //used for ages that don't return any rows of data
        else{
            await page.locator("tbody td").getByText("No data found").waitFor()
            expect(await page.locator("tbody td").allInnerTexts()).toContain("No data found")
        }
        //get all rows after filter is applied
        
    }


})

test("datepickers", async({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const datepickerForm = page.getByPlaceholder("Form Picker")
    await datepickerForm.click()

    //logic to allow for any date within the same month to be picked
    let date = new Date()
    date.setDate(date.getDate() + 200)
    const expectedDate = date.getDate().toString()
    const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
    const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
    const expectedYear = date.getFullYear()
    const expectedFullDate = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
    let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `

    //loop through and find correct month
    while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
        calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    }
    
    //click on 14th day of current month in calendar
    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()
    await expect(datepickerForm).toHaveValue(expectedFullDate)
})

test('sliders', async({page}) => {
    //update attribute
    /* const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    await tempGauge.evaluate( node => {
        node.setAttribute('cx', '232.630')
        node.setAttribute('cy', '232.630')
    })
    await tempGauge.click() */

    //mouse movement
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await tempBox.scrollIntoViewIfNeeded()

    //creates a bounding box that you can mimic mouse movemount from
    const box = await tempBox.boundingBox()

    //setting the center of the box to be the origin
    const x = box.x + box.width / 2
    const y = box.y + box.height / 2
    //place mouse on center of box
    await page.mouse.move(x, y)

    //move the mouse down and to the right
    await page.mouse.down()
    await page.mouse.move(x + 100, y)
    await page.mouse.move(x + 100, y + 100)
    await page.mouse.up()
    await expect(tempBox).toContainText("30")
})





