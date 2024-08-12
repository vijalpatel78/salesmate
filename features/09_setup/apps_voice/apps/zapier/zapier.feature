@regression_test_setup @regression_test @apps_voice
Feature: Zapier Integration

    The user can do so much more with Salesmate by connecting it to scores of cloud apps like Gmail, Google Sheets, 
    Slack, Gravity Forms, etc. to automate day to day work. Easily move data between different apps without having 
    to code. Data can flow from Salesmate to Zapier and vice versa using the bi-directional integrations.

    Background: 
        Given the 'User1' is on apps page

    #---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/16570) ----------------------
    
    Scenario: It should redirect to the Zapier configuration page on click of the configure button
        When the user clicks on the Configure button of Zapier app
        Then the system should open Zapier configuration page

    #---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/16571) ----------------------
    
    Scenario: It should redirect to the support page on click of the ‘clicking here’ link
        When the user clicks on the Configure button of Zapier app
            And click on the clicking here link
        Then the system should redirect to the support page of Zapier app