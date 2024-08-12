@regression_test_setup @regression_test @apps_voice
Feature: MPZMail Integration

    MPZMail is a cloud-based email marketing software solution that helps users design, create and schedule emails 
    and track performance. MPZMail lets users auto-sync contacts from Salesmate to MPZMail and sends newsletters & 
    sales drip emails.

    Background: 
        Given the 'User1' is on apps page

    #---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/16574) ----------------------
    
    Scenario: It should redirect to the support page on click of the ‘Configure’ button
        When the user clicks on the Configure button of MPZMail app
        Then the system should redirect to the support page of MPZMail app