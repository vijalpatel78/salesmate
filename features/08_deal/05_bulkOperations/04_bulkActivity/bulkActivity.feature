@regression_test_deal @regression_test
Feature: Deal Module > Bulk Operations > Bulk Activity

  Description: In this feature user is able to enable/disable create activity deal rights and manage operations

  Background:
    Given 'User1' is on the deal listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C25403) --------------------------

  Scenario: As a user, I should able to see the 'create activities' option while clicking to the checkbox available on grid header
    When verifying 'User2' when rights are enabled for right name of 'switch_Task_add' through 'User1'
    Then user is on deals listing page
    Then 'Create Activities' button is visible and logged in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C25406) --------------------------

  Scenario: As a user, I will create bulk activities with call type by adding all data
    When verify activities count before adding on listing page
    When user is on create activity dialog
    When user will create bulk activities with call type by adding all data
     | Title         | {{ call }} for {{ Deal.name }}  |
     | Type          | Call                            |
     | Due Date      | Sep 17, 2021                    |
     | Duration      | 10:00 am                        |
     | Text Area     | First Bulk Task of the team     |
     | Owner         | Vijal Patel                     |
     | Tags          | Deal Task                       |
   Then check notification message as 'Activities created successfully'
   Then verify added activities on listing page

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C25409) --------------------------

  Scenario: As a user, I able to see some default field value in the activity creation pop up
    When user is on create activity dialog
    When user able to see default field value as '{{Activity.type}} for {{Deal.title}}' in activity creation pop up

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C25410) --------------------------

  Scenario: As a User, I should able to Check Mandatory Fields
    When user is on create activity dialog
    When user does not enter data in title field
      | Title  |       |
    When verify validation of 'Title is required'

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C25410) --------------------------

  Scenario: As a user, I able to see any field of 'contact', 'company' and 'deal' using show merge link in the 'title' and 'description' text box
    When user able to see any field of "contact","company" and "deal" using show merge link in the "title" and "description" text box

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C25410) --------------------------

  Scenario: Verify save & cancel button functionality on creating bulk new Activity
    When verify save button functionality on creating bulk new Activity
      | Owner             | Vijal Patel    |
      | Text Field        | Activity       |
      | Text Area Field   | Deal Activity  |
     Then check notification message as 'Activities created successfully'
    When user is on create activity dialog
    When verify cancel button functionality on creating bulk new Activity

#------------------------ Case:7 (http://testrails.rapidops.com/index.php?/cases/view/C25410) --------------------------

  Scenario: As a user, I can't able to see the 'create activity' button while I don't have the right to create activity
    When verifying 'User2' when rights are disabled for right name of 'switch_Task_add' through 'User1'
    Then user is on deals listing page
    Then 'Create Activities' button is not visible and logged in through 'User1'

#------------------------ Case:8 (http://testrails.rapidops.com/index.php?/cases/view/C25414) --------------------------

  Scenario: As a user, I should able to do create the activity with the company variable using show merge field in the 'title' and 'description' text box
    When user is on create activity dialog
    When user able to do create activity with company variable using show merge field in the "title" and "description" text box
    Then check notification message as 'Activities created successfully'

#------------------------ Case:9 (http://testrails.rapidops.com/index.php?/cases/view/C25415) --------------------------

  Scenario: As a user, I should able to do create the activity with the company variable using show merge field in the 'title' and 'description' text box
    When user is on create activity dialog
    When user able to do create activity with contact variable using show merge field in the "title" and "description" text box
    Then check notification message as 'Activities created successfully'

#------------------------ Case:10 (http://testrails.rapidops.com/index.php?/cases/view/C25416) --------------------------

  Scenario: As a user, I should able to do create the activity with the company variable using show merge field in the 'title' and 'description' text box
    When user is on create activity dialog
    When user able to do create activity with deal variable using show merge field in the "title" and "description" text box
    Then check notification message as 'Activities created successfully'