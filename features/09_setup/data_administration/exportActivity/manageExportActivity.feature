@regression_test_setup @regression_test @data_administration
Feature: Export Activity Feature

  Description: In this feature,user will export data of activity module and verify fields existence and
               also verifies whether check data displays under select fields and uncheck data not displays
               under select fields and manages all fields data

  Background:
    Given the 'User1' is on export activity page

#---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/17413) -----------------------------

  Scenario: Verify, the system should display dynamic module name of activity
    When the system should display dynamic module name of activity

#---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/17414) -----------------------------

  Scenario: Verify, the system should display custom view list that displayed on the activity list page
    When the system display custom view list that displayed on the activity list page

#---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/17415) -----------------------------

  Scenario: Verify, the user is able to export the activity data
    When the user is able to export the activity data and verify 'We are preparing your export.'

#---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/17416) -----------------------------

  Scenario: Verify, the user is able to search the activity fields
    When the user is able to search the activity fields
      | Existing Search Word      | Title  |
      | Non-Existing Search Word  | xyz    |

#---------------------- Case:5 (http://testrails.rapidops.com/index.php?/cases/view/17417) -----------------------------

  Scenario: Verify, the user is able to manage the fields for the export
    When the user is able to manage the fields for the export activity
      | Search Field Data          | Last Modified By |
      | Enabling Last Modified By  | Enable           |
    Then check data 'Last Modified By' displayed under selected fields of export activity
    When the user is able to manage the fields for export activity
      | Search Field Data          | Last Modified By |
      | Disabling Last Modified By | Disable          |
    Then uncheck data 'Last Modified By' should not be displayed under selected fields of export activity

#---------------------- Case:6 (http://testrails.rapidops.com/index.php?/cases/view/17418) -----------------------------

  Scenario: Verify,the deal,contact and company module name should be displayed on the respective module fields
    When the company module name displayed on the company fields
      | Company Search Field Data   | Associated Contacts |
      | Associated Contacts         | Enable              |
    Then check data 'Associated Contacts' and verify postfixed company singular name
    When the contact module name displayed on the contact fields
      | Contact Search Field Data   | Last Name  |
      | Last Name                   | Enable     |
    Then check data 'Last Name' and verify postfixed contact singular name
    When the deal module name displayed on the deal fields
      | Deal Search Field Data      | Title      |
      | Title                       | Enable     |
    Then check data 'Title' and verify postfixed deal singular name