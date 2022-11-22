@regression_test_setup @regression_test @apps_voice
Feature: Geo Location Tracking 

    The App to track the location as from where contact, company, activity, deal created. This works only if record 
    create using mobile apps.

    Background: 
        Given the 'User1' is on apps page

    #---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/16685) ----------------------
    
    Scenario: The user is able to install the Geo Location app
        Given the Geo Location app is uninstalled
        When the user clicks on the Install button of Geo Location app
        Then the Geo Location app should get installed

    #---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/16686) ----------------------

    Scenario: The user is able to enable the Geo Location Tracking settings
        Given the Geo Location app is installed
        When the user clicks on the Configure button of Geo Location app
            And Contact creation: 'True'
            And Company creation: 'True'
            And Deal creation: 'True'
            And Activity creation: 'True'
        Then the Geo Location settings should get updated
    
    #---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/16687) ----------------------

    Scenario: The user is able to disable the Geo Location Tracking settings
        Given the Geo Location app is installed
        When the user clicks on the Configure button of Geo Location app
            And Contact creation: 'False'
            And Company creation: 'False'
            And Deal creation: 'False'
            And Activity creation: 'False'
        Then the Geo Location settings should get updated
    
    #---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/16688) ----------------------
    
    Scenario: The user is able to uninstall the Geo Location Tracking app
        Given the Geo Location app is installed
        When the user clicks on the Configure button of Geo Location app
            And click on the Remove button
        Then the Geo Location app should get uninstalled