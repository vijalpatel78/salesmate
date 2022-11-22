@regression_test_contact @regression_test
Feature: Contact Module > Delete Contact

  Description: In this feature user is able to enable/disable delete contact toggle rights and verify deleted contact
               details

  Background:
    Given 'User1' is on the contact listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C20979) --------------------------

  Scenario: Verify, delete contact button should not be displayed when the user doesn't have delete contact rights
    When verifying 'User2' when rights are disabled for right name of 'switch_Contact_delete' through 'User1'
    Then delete contact button is not visible and log in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C20980) --------------------------

  Scenario: Verify, the delete contact button should be displayed only when the user has delete contact rights
    When verifying 'User2' when rights are enabled for right name of 'switch_Contact_delete' through 'User1'
    Then delete contact button is visible and log in through 'User1'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C20981) --------------------------

  Scenario: Verify, the user is able to delete a contact
    When Verify, the user is able to delete a contact and verify 'Contact deleted successfully'