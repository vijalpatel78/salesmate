@regression_test_myAccount @regression_test
Feature: Slack Preference App

Description: In this feature user will be able to install slack preference feature and able to authorize app
             and also user will be able to remove installed slack app.

Background:
 Given the 'User1' is on slack preference page

#---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/11113) ----------------------

Scenario: Verify, the slack preferences tab is displayed only when the slack app is enabled
  When the user is able to install slack app then slack preferences tab should be displayed

#---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/11114) ----------------------
@skip_in_ci
Scenario: Verify, the user is able to authorize slack
  When the user checks authorization of slack app

#---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/11116) ----------------------

Scenario: Verify the user is able to enable slack preferences
  When the user is able to enabling all toggle buttons in slack preference

#---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/11117) ----------------------

Scenario: Verify the user is able to disable slack preferences
  When the user is able to disabling all toggle buttons in slack preference

#---------------------- Case:5 (http://testrails.rapidops.com/index.php?/cases/view/11118) ----------------------

Scenario: Verify, the slack integration is user wise
  When the 'User1' verifies through 'User2' wise there should be no impact on preferences

#---------------------- Case:6 (http://testrails.rapidops.com/index.php?/cases/view/11115) ----------------------

Scenario: Verify, the user is able to remove slack integration
  When the user is able to remove slack integration