const testReport = require('cucumber-html-reporter');

//will customize the test report
const options = {
    name: 'Salesmate',
    brandTitle: 'Functional Test',
    theme: 'hierarchy',
    jsonFile: './cucumber_testReport/cucumber_testOutput.json',
    output: './cucumber_testReport/cucumber_report.html',
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    metadata:{
    }
};

//will generate a test report in the HTML format
testReport.generate(options);