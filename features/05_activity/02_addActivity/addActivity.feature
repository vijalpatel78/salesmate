@regression_test_activity @regression_test
Feature: Activity Module > Add Activity

  Description: In this feature user is able to enable/disable activity toggle rights and verify activity module dynamic
               singular and plural names

  Background:
    Given 'User1' is on the activity listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C22986) --------------------------

  Scenario: As a Admin User, I shouldn't be able to see activity module if I don't have company module view rights
    When verifying 'User2' when rights are disabled for right name of 'switch_Task_add' through 'User1'
    Then add activity button is not visible and log in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C22985) --------------------------

  Scenario: As a Admin User, I should be able to see activity module if I have company module view rights
    When verifying 'User2' when rights are enabled for right name of 'switch_Task_add' through 'User1'
    Then add activity button is visible and log in through 'User1'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C22990) --------------------------

  Scenario: As a User, Verify the name of module 'Activity' should display as per dynamic module name set
    When dynamic module name 'Activity' of 'pluralName' should be displayed as 'Activity1'
    Then verification of updated dynamic activity module name 'Activity1'
    Then dynamic module name 'Activity' of 'pluralName' should be displayed as 'Activities'

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C23000) --------------------------

  Scenario: As a User, Verify 'Manage Fields' option should not be shown when user don't have rights to manage the fields
    When verifying 'User2' when rights are disabled for right name of '406' through 'User1'
    Then system shows validation message upon clicking on "Manage Fields" of 'Activity' under 'icon-ic_activity' module and log in through 'User1'

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C22999) --------------------------

  Scenario: As a User, Verify user able to manage the fields from 'Add new company' pop up
    When verifying 'User2' when rights are enabled for right name of '406' through 'User1'
    Then user is able to move to 'icon-ic_activity' Layout page and click 'Activity' and log in through 'User1'

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C23005) -------------------------

  Scenario: As a User, Verify validation message for required activity fields
    When user is on add activity page
    Then verify activity with adding blank data
      | Title          |       |
    And check validation message as 'Title is required'

#------------------------ Case:7 (http://testrails.rapidops.com/index.php?/cases/view/C24567) --------------------------

  Scenario: As a User, Verify that upon clicking on Save button user can add new Activity
    When user is on add activity page
    Then verify that upon clicking on Save button user can add new Activity
      | Activity Type  | Call              |
      | Title          | Inbound Call      |
      | Text           | Activity          |
      | Text Area      | Company Activity  |
    And check notification message as 'Activity added successfully'
    And verify 'icon-ic_activity' module and check newly added activity details

#------------------------ Case:8 (http://testrails.rapidops.com/index.php?/cases/view/C24569) --------------------------

  Scenario: As a User, Verify that user should be able to set recurrence
    When user is on add activity page
    Then verify that user should be able to set recurrence
      | Title          | Bound Call        |
      | Recurrence     | Daily             |
    Then check generated recurrence notification

#------------------------ Case:9 (http://testrails.rapidops.com/index.php?/cases/view/C23003) -------------------------

  Scenario: As a User, Verify that timeline entry should get updated after adding activity
    When user is on add activity page
    When enter data in activity fields
      | Title          | Activity Call     |
      | Text           | Test Activity     |
    Then verify that timeline entry should get updated after adding activity

#------------------------ Case:10 (http://testrails.rapidops.com/index.php?/cases/view/C24577) -------------------------

  Scenario: As a User, Verify user able to close/re-open the activity from timeline entry
    Then verify user able to close or re-open activity and check 'Activity completed' and 'Activity re-opened' messages

#------------------------ Case:11 (http://testrails.rapidops.com/index.php?/cases/view/C24578) -------------------------

  Scenario: As a User, Verify user able to see the quick view of activity from company timeline entry
    Then verify user able to see the quick view of activity from company timeline entry