@regression_test_activity @regression_test
Feature: Activity Module > Mass Operations > Mass Import/Export

  Description: In this feature user is able to enable/disable mass import/export activity rights and manage mass
               import/export operations

  Background:
    Given 'User1' is on the activity listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C25650) --------------------------

  Scenario: Verify, 'Import Deals' option should not be displayed when the user doesn't have import data rights
    When verifying 'User2' when rights are disabled for right name of '005' through 'User1'
    Then user is on activity listing page
    Then 'Import from Excel or CSV file' link is not visible under "Actions" and log in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C25651) --------------------------

  Scenario: Verify, 'Import Deals' option should be display when the user have import data rights
    When verifying 'User2' when rights are enabled for right name of '005' through 'User1'
    Then user is on activity listing page
    Then 'Import from Excel or CSV file' link is visible under "Actions" and log in through 'User1'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C25652) --------------------------

  Scenario: Verify, on click of the 'Import Deals' options, the system should redirect to the respective import page
    When on click of 'Import from Excel or CSV file' option, the system should redirect to respective import page