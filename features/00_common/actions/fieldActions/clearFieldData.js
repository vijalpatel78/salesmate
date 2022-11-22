const key = require('selenium-webdriver').Key;

/*  As clear() function is not working on some fields, 
    this function will remove field data  
*/
    
async function clearFieldData(field){
    const fieldData = await field.getAttribute('value');
    for(let i=0;i<fieldData.length;i++){
        await field.sendKeys(key.BACK_SPACE);
    }
}exports.clearFieldData=clearFieldData;