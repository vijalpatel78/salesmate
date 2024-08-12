@regression_test_company @regression_test
Feature: Company Module > Bulk Operations > Bulk Export

  Description: In this feature user is able to verify visibility of export button and user can also be able to
               export companies

  Background:
    Given 'User1' is on the company listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C21012) --------------------------

  Scenario: Verify that the Export button should not be displayed on the bulk operation when the user doesn't have a right to Export Contact/Company
    When verifying 'User2' when rights are disabled for right name of '101' through 'User1'
    Then user is on company listing page
    Then 'Export' button should not be displayed and logged in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C21011) --------------------------

  Scenario: Verify user is able to see 'Export' option on grid header while clicking to the available checkbox on the companies listing screen
    When verifying 'User2' when rights are enabled for right name of '101' through 'User1'
    Then user is on company listing page
    Then 'Export' button should be displayed and logged in through 'User1'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C21029) --------------------------

  Scenario: Verify that it should allow me to export selected companies from the companies listing page
    When user is on company listing page
    When Verify that it should allow me to export selected companies from the companies listing page