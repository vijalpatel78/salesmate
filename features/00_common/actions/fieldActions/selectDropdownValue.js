const assert = require('assert');
const formElementObj = require('../../webElements/formElements');

/*  This function is written to select a value from the single select dropdown field.
    This function will cover the following 3 cases:
        1. will check whether the provided value is valid or not
        2. will check whether the provided value is already selected or not
        3. will select the provided value if it is not selected
*/

async function selectDropdownValue(driver,screenshotPath,dropdownNameAttribute,newDropdownValue,isDropdownSearchExist = 'no'){
    let existingDropdownValue, currentlySelectedDropdownValue;
    let isNewDropdownValueValid = 'no';

    //will find specified dropdown 
    const dropdown = await formElementObj.findDropdown(driver,screenshotPath,dropdownNameAttribute);
    
    //will select the provided new dropdown value if it is not selected
    currentlySelectedDropdownValue = await dropdown.getText();
    if(newDropdownValue != currentlySelectedDropdownValue){
        //will click on the dropdown 
        await dropdown.click();
        await driver.sleep(2000);

        //will search the provided value if the dropdown contains a search box
        if(isDropdownSearchExist.toLowerCase() == 'yes'){
            const dropdownSearchBox = await formElementObj.findDropdownSearchBox(driver,screenshotPath,dropdownNameAttribute);
            await dropdownSearchBox.sendKeys(newDropdownValue);
            await driver.sleep(2000);
        }

        //will find dropdown list
        const dropdownListElement = await formElementObj.findDropdownListElement(driver);
        //will travel dropdown value list
        for(let i=0; i<dropdownListElement.length; i++){
            //will select the provided value if it is exist
            existingDropdownValue = await dropdownListElement[i].getText();
            if(newDropdownValue == existingDropdownValue){
                isNewDropdownValueValid = 'yes'
                const newDropdownValueElement = await formElementObj.findNewDropdownValueElement(driver,screenshotPath,newDropdownValue);
                await newDropdownValueElement.click();
                await driver.sleep(1000);
                break;   
            }
        }   
    }else{
        isNewDropdownValueValid = 'yes';
        console.log('The \''+newDropdownValue+'\' value is already selected...');
    }

    //will mark the test case as failed if the provided new dropdown value is not valid
    if(isNewDropdownValueValid == 'no'){
        //will close the dropdown before failing test case
        await dropdown.click();
        await assert.fail('Due to the provided \''+newDropdownValue+'\' dropdown value is not valid, the test case execution has been aborted.');
    }
}exports.selectDropdownValue=selectDropdownValue;