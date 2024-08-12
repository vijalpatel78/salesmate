@regression_test_company @regression_test
Feature: Company Module > Edit Company

  Description: In this feature user is able to enable/disable edit company toggle rights and manage updated
               company and verify validations for updated company

  Background:
    Given 'User1' is on the company listing page

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C23014) --------------------------

  Scenario: As a User, Verify 'Edit' button should not be visible when user don't have rights to edit the company
    When verifying 'User2' when rights are disabled for right name of 'switch_Contact_edit' through 'User1'
    Then edit company icon is not visible and log in through 'User1'

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C23009) --------------------------

  Scenario: As a User, Verify that edit button should be visible beside name of the company name
    When verifying 'User2' when rights are enabled for right name of 'switch_Contact_edit' through 'User1'
    Then edit company icon is visible and log in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C23010) --------------------------

  Scenario: As a User, Verify that 'Edit Company' pop up should be open and content should be saved after clicking on 'Update' button
    When user is on "Edit New Company" page
    When verify that content should be saved after clicking on Update button
     | Company Name      | DQ              |
     | Phone             | 7890547321      |
     | Employees         | 500             |
     | Custom Field      | Global Company  |
    Then verify notification message as 'Record updated successfully'
    Then check updated company details

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C23011) --------------------------

  Scenario: As a User, Verify the validation message should be display for required field if user remove the value from required field
    When user is on "Edit New Company" page
    When verify validations 'Name is required' and 'Custom Field 01 is required' should be displayed for required fields

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C23012) --------------------------

  Scenario: As a User, Verify the timeline entry after the user update the company
    When verify the timeline entry after the user update the company

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C23013) --------------------------

  Scenario: As a User, Verify that user able to manage the fields by clicking on 'Manage Fields'
    When verifying 'User2' when rights are enabled for right name of '406' through 'User1'
    Then redirect to company layout page and logged in through 'User1'

#------------------------ Case:7 (http://testrails.rapidops.com/index.php?/cases/view/C23015) --------------------------

  Scenario: As a User, verify user able to see dynamic name of company module at respective places
    When dynamic module name 'Company' of 'pluralName' should be displayed as 'Company1'
    Then verification of updated dynamic company module name 'Company1'
    Then dynamic module name 'Company' of 'pluralName' should be displayed as 'Companies'