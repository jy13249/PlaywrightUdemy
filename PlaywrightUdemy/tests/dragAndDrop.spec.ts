import {expect, test} from '@playwright/test';

test('drag and drop with iframes', async({page}) => {
    await page.goto('https://globalsqa.com/demo-site/draganddrop/')
    
    //in order to interact with elements inside an iframe
    //you will need to grab the locator for the iframe 
    //and then find the elements below that
    const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')

    await frame.locator('li', {hasText: "High Tatras 2"}).dragTo(frame.locator('#trash'))

    //more precise control of drag and drop
    await frame.locator('li', {hasText: "High Tatras 4"}).hover()
    await page.mouse.down()
    await frame.locator('#trash').hover()
    await page.mouse.up()
    await expect(frame.locator('#trash li h5')).toHaveText(["High Tatras 2", "High Tatras 4"])
})