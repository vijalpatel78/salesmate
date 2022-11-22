@regression_test_company @regression_test
Feature: Company Module > Company Details > Add Activity

  Description: In this feature user is able to add activity under company details page

  Background:
    Given 'User1' is on the company listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C24566) --------------------------

  Scenario: As a User, Verify the UI of 'Add Activity'
    When user is on company details page
    Then verify the UI of 'Add Activity' tab

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C24567) --------------------------

  Scenario: As a User, Verify that upon clicking on Save button user can add new Activity
    When user is on company details page
    Then verify that upon clicking on Save button user can add new Activity
      | Activity Type  | Call              |
      | Title          | Inbound Call      |
      | Text           | Activity          |
      | Text Area      | Company Activity  |
    And check notification message as 'Activity added successfully'
    And verify 'icon-ic_company' module and check newly added activity details

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C24568) --------------------------

  Scenario: As a User, Verify validation message for required activity fields
    When user is on company details page
    Then verify activity with adding blank data
      | Title          |       |
    And check validation message as 'Title is required'

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C24569) --------------------------
@skip_in_ci
  Scenario: As a User, Verify that user should be able to set recurrence
    When user is on company details page
    Then verify that user should be able to set recurrence
      | Title          | Bound Call        |
      | Recurrence     | Doesn't repeat    |
    Then check generated recurrence notification

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C24570) --------------------------

  Scenario: As a User, Verify that current contact should be display filled in associated contact
    When user is on company details page
    Then verify that current contact should be display filled in associated contact

#------------------------ Case:7 (http://testrails.rapidops.com/index.php?/cases/view/C24572) --------------------------

  Scenario: As a User, Verify user able to change the owner from 'Owner' field
    When user is on company details page
    Then verify user able to change the owner field
      | Title  | Test Call   |
      | Owner  | Vijal Patel |

#------------------------ Case:8 (http://testrails.rapidops.com/index.php?/cases/view/C24573) --------------------------

  Scenario: As a User, Verify 'Add Activity' tab should not be visible to user if user don't have rights for activity module
    When verifying 'User2' when rights are disabled for right name of 'switch_Task_add' through 'User1'
    When user is on company listing page
    When user is on company details page
    Then add activity tab is not visible as 'switch_Task_add' is disabled and log in through 'User1'

#------------------------ Case:9 (http://testrails.rapidops.com/index.php?/cases/view/C24574) --------------------------

  Scenario: As a User, Verify that timeline entry should get updated after adding activity
    When user is on company details page
    When enter data in activity fields
      | Title          | Activity Call     |
      | Text           | Test Activity     |
    Then verify that timeline entry should get updated after adding activity

#------------------------ Case:10 (http://testrails.rapidops.com/index.php?/cases/view/C24575) -------------------------

  Scenario: As a User, Verify user able to delete the activity from company timeline entry
    When user is on company details page
    When verify user able to delete activity from company timeline entry and verify 'Activity deleted successfully' message

#------------------------ Case:11 (http://testrails.rapidops.com/index.php?/cases/view/C24576) -------------------------
@skip_in_ci
  Scenario: As a User, verify user able to add the note to activity in company's timeline entry
    When user is on company details page
    Then verify user able to add note as 'Bound Activity' to activity and check 'Note added successfully' message

#------------------------ Case:12 (http://testrails.rapidops.com/index.php?/cases/view/C24577) -------------------------

  Scenario: As a User, Verify user able to close/re-open the activity from timeline entry
    When user is on company details page
    Then verify user able to close or re-open activity and check 'Activity completed' and 'Activity re-opened' messages

#------------------------ Case:13 (http://testrails.rapidops.com/index.php?/cases/view/C24578) -------------------------

  Scenario: As a User, Verify user able to see the quick view of activity from company timeline entry
    When user is on company details page
    Then verify user able to see the quick view of activity from company timeline entry