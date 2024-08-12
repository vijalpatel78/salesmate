const {execSync,exec} = require('child_process');
const testingEnvironment = process.argv[process.argv.length-1]; 

const login_index = require('./features/loginModule');
const myAcc_general_index = require('./features/myAcc_generalModule');
const myAcc_changePassword_index =  require('./features/myAcc_changePasswordFeature');
const myAcc_interfacePreference_index = require('./features/myAcc_interfacePreferenceFeature');
const myAcc_slackPreference_index = require('./features/myAcc_slackPreferenceFeature');
const myAcc_accessKey_index = require('./features/myAcc_accessKeyFeature');
const myAcc_notificationPreference_index = require('./features/myAcc_notificationPreferenceFeature');
const myAcc_ringCentralPreference_index = require('./features/myAcc_ringCentralPreferenceFeature');
const myAcc_calenderSync_index = require('./features/myAcc_calenderSyncFeature');
const setup_profilePermissions_index = require('./features/setup_profilePermissions');
const setup_users_index = require('./features/setup_users');
const setup_tagManagement_index = require('./features/setup_tagManagement');
const setup_contact_index = require('./features/setup_contact');

//will set the test module sequence for the test execution
const index = [ ...myAcc_interfacePreference_index ];

//will execute the test cases sequentially and then will generate the test report
try{
    execSync(`./node_modules/.bin/cucumber-js ${index.join(' ')} -f json:./cucumber_testReport/cucumber_testOutput.json ${testingEnvironment}`, {stdio: 'inherit'});
    exec('node ./cucumber_testReport/cucumber_reportGenerator.js');
    process.exit(0);
}catch(err){
    exec('node ./cucumber_testReport/cucumber_reportGenerator.js');
    process.exit(0);
}

//use the following command to run this file 
//node cucumber_run.js <testingEnvironment>
//<testingEnvironment>: goto 'cucumber_config.js' file to check the available testing environments

