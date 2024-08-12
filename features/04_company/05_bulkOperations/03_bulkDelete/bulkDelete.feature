@regression_test_company @regression_test
Feature: Company Module > Bulk Operations > Bulk Delete

  Description: In this feature user is able to enable/disable mass delete companies rights and can able to perform delete
               operations on companies from companies listing page

  Background:
    Given 'User1' is on the company listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C21007) --------------------------

  Scenario: As a user, Verify that the Delete button should not be displayed on the bulk operation when the user doesn't have a right to Mass Delete Company
    When verifying 'User2' when rights are disabled for right name of '302' through 'User1'
    Then user is on company listing page
    Then 'Delete' button is not displayed and logged in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C21008) --------------------------

  Scenario: As a user, I should able to see the 'Delete' option while clicking to the checkbox available on grid header
    When verifying 'User2' when rights are enabled for right name of '302' through 'User1'
    Then user is on company listing page
    Then 'Delete' button is displayed and logged in through 'User1'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C21010) --------------------------

  Scenario: As a user, I should be able to bulk delete companies from the companies listing screen
    When user should be able to bulk delete companies from company listing screen and verify 'Company deleted successfully'