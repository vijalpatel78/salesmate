@regression_test_setup @regression_test @data_administration
Feature: Export History

    As a Salesmate allows users to export Salesmate data, it also maintains the exported data history. So, the user can 
    track exported data history. On this page, the user can see some valuable information, like which data exported, 
    by whom, on which date and time as well as can download exported data.

    Background: 
        Given the 'User1' is on Export History page
    
    #---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/17373) ----------------------

    Scenario: The system should display exported file details
        When one exported file is available
        Then the system should display exported file details
    
    #---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/17374) ----------------------
@skip_in_ci
    Scenario: The system should give validation message on downloading other user’s files
        When the exported file of 'Automation Link' user is available
            And click on the Download button of 'Automation Link' user file
        Then the system should give validation message on downloading other user file
    
    #---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/17375) ----------------------
@skip_in_ci
    Scenario: The user is able to download exported file
        When the exported file of 'All Contact' view is available
            And click on the Download button of 'All Contact' view file
        Then the 'All Contact' view file should get downloaded
