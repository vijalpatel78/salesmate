@regression_test_contact @regression_test
Feature: Contact Module > Preview Page > Related Tab > Lists

  Description: In this feature user is able to lists, update and manage lists

  Background:
    Given 'User1' is on the contact listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C22735) --------------------------

  Scenario: Test, add contacts to a list from contact's quick view screen
    When user is on Related Tab
    Then check 'Not added to any list' message and add contacts to a list from contacts quick view screen
    And check notification message as 'Added to list'
    And verify added list details

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C22742) --------------------------

  Scenario: Verify new list creation at the time of selecting the lists from contacts page while adding contacts to a list
    Then new list creation at the time of selecting the lists from contacts page
      | List Name        | List 05      |
      | List Description | Contact List |
    And check newly added list details and check 'List 05 list created successfully.'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C22746) --------------------------

  Scenario: Verify behavior of add to list window when User clicks on the save button without selecting any list from the select drop-down
    Then verify behavior of add to list window when User clicks on save button without selecting any list from the select drop-down
    And check validation 'Please provide at least one List' message

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C22747) --------------------------

  Scenario: Verify the behavior of cancel button and X-mark icon of add to list pop-up window
    Then verify the behavior of cancel button and X-mark icon of add to list pop-up window

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C22748) --------------------------

  Scenario: Verify creation of new list from Add to list window for User without manage list rights
    Then 'User2' is not able to create lists when 'User1' without manage list rights

#------------------------ Case:7 (http://testrails.rapidops.com/index.php?/cases/view/C22750) --------------------------

  Scenario: Test 'NO' option of confirm delete pop-up window for cancelling the operation of removing a list from a contact
    When user is on Related Tab
    Then Test No option of confirm delete pop-up window for cancelling the operation of removing a list from a contact

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C22751) --------------------------

  Scenario: Test removing a list from a contact from Contact's quick view screen
    When user is on Related Tab
    Then removing a list from a contact from Contacts quick view screen
    And check notification message as 'Test Contact removed from List 01 list successfully.'

#------------------------ Case:8 (http://testrails.rapidops.com/index.php?/cases/view/C22752) --------------------------

  Scenario: Verify the contact name and list name on 'Confirm Delete' pop-up window
    When user is on Related Tab
    Then verify contact name and list name on Confirm Delete pop-up window

#------------------------ Case:9 (http://testrails.rapidops.com/index.php?/cases/view/C22753) --------------------------

  Scenario: Test page reload on confirm pop-up window at the time of removing a contact from a list
    When user is on Related Tab
    Then Test page reload on confirm pop-up window at the time of removing a contact from a list