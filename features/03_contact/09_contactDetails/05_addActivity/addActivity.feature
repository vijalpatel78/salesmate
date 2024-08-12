@regression_test_contact @regression_test
Feature: Contact Module > Contact Details > Add Activity

  Description: In this feature user is able to add activity under contact details page

  Background:
    Given 'User1' is on the contact listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C22466) --------------------------

  Scenario: As a User, Verify the UI of 'Add Activity'
    When user is on contact details page
    Then verify the UI of 'Add Activity' tab

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C22467) --------------------------

  Scenario: As a User, Verify that upon clicking on Save button user can add new Activity
    When user is on contact details page
    When user is on activity tab
    Then verify that upon clicking on Save button user can add new Activity
     | Activity Type  | Call              |
     | Title          | Inbound Call      |
     | Date           | Oct 05, 2021      |
     | Time           | 08:30 PM          |
    And check notification message as 'Activity added successfully'
    And verify 'icon-ic_contacts' module and check newly added activity details

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C22468) --------------------------

  Scenario: As a User, Verify Cancel button functionality for Add Activity
    When user is on contact details page
    When user is on activity tab
    Then enter data in activity fields
     | Title          | Inbound Call      |
     | Text           | Test Activity     |
    Then verify Cancel button functionality for Add Activity

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C22469) --------------------------

  Scenario: As a User, Verify that timeline entry should get updated after adding activity
    When user is on contact details page
    Then verify that timeline entry should get updated after adding activity

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C22469) --------------------------

  Scenario: As a User, Verify validation message for required activity fields
    When user is on contact details page
    When user is on activity tab
    Then verify activity with adding blank data
     | Title          |       |
     | Date           |       |
     | Time           |       |
    And check validation message as 'Title is required'

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C22470) --------------------------

  Scenario: As a User, Verify that current contact should be display filled in associated contact
    When user is on contact details page
    When user is on activity tab
    Then verify that current contact should be display filled in associated contact

#------------------------ Case:7 (http://testrails.rapidops.com/index.php?/cases/view/C22471) --------------------------

  Scenario: As a User, Verify that user should be able to set recurrence
    When user is on contact details page
    When user is on activity tab
    Then verify that user should be able to set recurrence
     | Title          | Bound Call        |
     | Repeat Every   | 2                 |
     | Ends           | enable            |
     | Occurrences    | 3                 |
    Then check generated recurrence notification

#------------------------ Case:8 (http://testrails.rapidops.com/index.php?/cases/view/C22472) --------------------------

  Scenario: As a User, Verify that more field - less field link should work properly
    When user is on contact details page
    Then verify that more field - less fields link should work properly