const util = require('util');
const fs = require('fs');
const writeFile = util.promisify(fs.writeFile);

//this function will take a screenshot of the current page in the PNG format and save it on the specified place
async function takeScreenshot(driver,filePath){
    let image = await driver.takeScreenshot();
    await writeFile(filePath,image,'base64');
}exports.takeScreenshot=takeScreenshot;