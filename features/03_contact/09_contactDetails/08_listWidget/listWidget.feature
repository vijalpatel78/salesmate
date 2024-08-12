@regression_test_contact @regression_test
Feature: Contact Module > Contact Details > List Widget

  Description: In this feature user is able to add lists under list widgets

  Background:
    Given 'User1' is on the contact listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C22608) --------------------------

  Scenario: Test removing a list from a contact from contact's details page for user with and without manage list rights
    When user is on contact details page
    When 'User2' is able to remove lists when 'User1' is with and without manage list rights
    Then removing a list from a contact from contacts details page
    And check notification message as 'Sample Contact removed from List 04 list successfully.'
    Then verify removed list should not be displayed

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C22610) --------------------------

  Scenario: Test 'NO' option of confirm delete pop-up window for cancelling the operation of removing a list from a contact
    When user is on contact details page
    Then "NO" option of confirm delete pop-up window for cancelling the operation of removing a list from a contact

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C22611) --------------------------

  Scenario: Verify the contact name and list name on 'Confirm Delete' pop-up window
    When user is on contact details page
    Then verify the contact name and list name on "Confirm Delete" pop-up window

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C22612) --------------------------

  Scenario: Test page reload on confirm pop-up window at the time of removing a contact from a list
    When user is on contact details page
    Then page reload on confirm pop-up window at the time of removing a contact from a list