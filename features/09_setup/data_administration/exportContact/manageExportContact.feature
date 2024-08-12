@regression_test_setup @regression_test @data_administration
Feature: Export Contact Feature

  Description: In this feature,user will export data of contact module and verify fields existence and
               also verifies whether check data displays under select fields and uncheck data not displays
               under select fields and manages all fields data

  Background:
    Given the 'User1' is on export contact page

#---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/16866) -----------------------------

  Scenario: Verify, the system should display dynamic module name of contact
    When the system should display dynamic module name of contact

#---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/16867) -----------------------------

  Scenario: Verify, the system should display custom view list that displayed on the contact list page
    When the system display custom view list that displayed on the contact list page

#---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/16868) -----------------------------

  Scenario: Verify, the user is able to export the contact data
    When the user is able to export the contact data and verify 'We are preparing your export.'

#---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/16869) -----------------------------

  Scenario: Verify, the user is able to search the contact fields
    When the user is able to search the contact fields
     | Existing Search Word      | Name   |
     | Non-Existing Search Word  | xyz    |

#---------------------- Case:5 (http://testrails.rapidops.com/index.php?/cases/view/16870) -----------------------------

  Scenario: Verify, the user is able to manage the fields for the export
    When the user is able to manage the fields for the export
     | Search Field Data          | Last Modified By |
     | Enabling Last Modified By  | Enable           |
    Then check data 'Last Modified By' should be displayed under selected fields section
    When the user is able to manage the fields for the export contact
     | Search Field Data          | Last Modified By |
     | Disabling Last Modified By | Disable          |
    Then uncheck data 'Last Modified By' should not be displayed under selected fields

#---------------------- Case:6 (http://testrails.rapidops.com/index.php?/cases/view/16871) -----------------------------

  Scenario: Verify, the company module name should be displayed on the company fields
    When the company module name should be displayed on the company fields
     | Search Field Data   | Associated Contacts |
     | Associated Contacts | Enable              |
    Then check data 'Associated Contacts' should be displayed under selected fields division