@regression_test_contact @regression_test
Feature: Contact Module > Contact Details Widgets > Actions > Add To Contact List

  Description: In this feature user is able to add contacts to multiple lists and manage lists

  Background:
    Given 'User1' is on the contact listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C22056) --------------------------

  Scenario: Verify, the user can add contact to the list
    When user is on contact details screen page > actions > add to list
    Then the user can add contact to the list
    Then check notification message as 'Added to list'
    And verify added contact list details

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C22057) --------------------------
@skip_in_ci
  Scenario: Verify, the user can add contact to the multiple lists simultaneously
    When user is on contact details screen page > actions > add to list
    Then the user can add contact to the multiple lists simultaneously
    Then check notification message as 'Added to list'
    And verify added contacts for multiple lists

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C22058) --------------------------

  Scenario: Verify new list creation at the time of selecting the lists from contacts page while adding contacts to a list
    When user is on contact details screen page > actions > add to list
    Then user can able to create new
     | List Name         | List 03          |
     | List Description  | List Contact     |
    And check newly added list details and check 'List 03 list created successfully.'
    Then check notification message as 'Added to list'
    And verify newly created list details

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C22060) --------------------------

  Scenario: Verify, create new list link should not be displayed for the standard profile user
    When user is on contact details screen page > actions > add to list
    Then verify admin user list link length
    Then verifying 'User2' when rights are disabled for right name of '418' through 'User1'
    Then create new list link should not be displayed and log in through 'User1'