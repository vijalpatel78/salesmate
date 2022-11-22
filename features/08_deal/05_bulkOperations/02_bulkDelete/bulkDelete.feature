@regression_test_deal @regression_test
Feature: Deal Module > Bulk Operations > Bulk Delete

  Description: In this feature user is able to enable/disable mass delete deal rights and can able to perform delete
               operations on deals from deals listing page

  Background:
    Given 'User1' is on the deal listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C21007) --------------------------

  Scenario: As a user, Verify that the Delete button should not be displayed on the bulk operation when the user doesn't have a right to Mass Delete Company
    When verifying 'User2' when rights are disabled for right name of '308' through 'User1'
    Then user is on deals listing page
    Then 'Delete' button is not displayed and logged in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C21008) --------------------------

  Scenario: As a user, I should able to see the 'Delete' option while clicking to the checkbox available on grid header
    When verifying 'User2' when rights are enabled for right name of '308' through 'User1'
    Then user is on deals listing page
    Then 'Delete' button is displayed and logged in through 'User1'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C21010) --------------------------

  Scenario: As a user, I should be able to bulk delete companies from the companies listing screen
    When user should be able to bulk delete deals from deal listing screen and verify 'Deal deleted successfully'