@regression_test_contact @regression_test
Feature: Contact Module > Bulk Operations > Bulk Delete

  Description: In this feature user is able to enable/disable mass delete contacts rights and can able to perform delete
               operations on contacts from contact listing page

  Background:
    Given 'User1' is on the contact listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C21007) --------------------------

  Scenario: As a user, Verify that the Delete button should not be displayed on the bulk operation when the user doesn't have a right to Mass Delete Contact
    When verifying 'User2' when rights are disabled for right name of '302' through 'User1'
    Then user is on contact listing page
    Then 'Delete' button is not displayed and logged in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C21008) --------------------------

  Scenario: As a user, I should able to see the 'Delete' option while clicking to the checkbox available on grid header
    When verifying 'User2' when rights are enabled for right name of '302' through 'User1'
    Then user is on contact listing page
    Then 'Delete' button is displayed and logged in through 'User1'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C21010) --------------------------

  Scenario: As a user, I should be able to bulk delete contacts from the contacts listing screen
    When user should be able to bulk delete contacts from contact listing screen and verify 'Contact deleted successfully'