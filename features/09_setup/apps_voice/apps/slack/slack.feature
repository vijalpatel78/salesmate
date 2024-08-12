@skip_in_ci
Feature: Slack Integration

    Salesmate Slack Integration lets Salesmate send a notification to the designated channel every time a deal is created
    OR marked as won OR marked as lost. It helps sales teams to collaborate quickly and close more deals.

    Background:
        Given the 'User1' is on apps page

    #---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/16695) ----------------------

    Scenario: The user is able to install the Slack app
        Given the Slack app is uninstalled
        When the user clicks on the Install button of Slack app
        Then the Slack app should get installed

    #---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/16696) ----------------------

    Scenario: The user is able to update the Slack integration settings
        Given the Slack app is installed
        When the user clicks on the Configure button of Slack app
        And update the Slack integration settings
        And click on the Update button
        Then the Slack integration settings should get updated

    #---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/16697) ----------------------

    Scenario: The user is able to uninstall the Slack app
        Given the Slack app is installed
        When the user clicks on the Configure button of Slack app
        And click on the Remove button
        Then the Slack app should get uninstalled