@regression_test_company @regression_test
Feature: Company Module > Add Company

  Description: In this feature user is able to enable/disable create company toggle rights and manage added
               company and verify validations for created company

  Background:
    Given 'User1' is on the company listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C22989) --------------------------

  Scenario: As a User, Verify when user don't have rights to create company then '+ Company' button should not be shown
    When verifying 'User2' when rights are disabled for right name of 'switch_Contact_add' through 'User1'
    Then add company module is not visible and log in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C22988) --------------------------

  Scenario: As a User, Verify that 'Create Company' button should be shown in 'Company Grid' view
    When verifying 'User2' when rights are enabled for right name of 'switch_Contact_add' through 'User1'
    Then add company module is visible and log in through 'User1'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C22990) --------------------------

  Scenario: As a User, Verify the name of module 'Company' should display as per dynamic module name set
    When dynamic module name 'Company' of 'pluralName' should be displayed as 'Company1'
    Then verification of updated dynamic company module name 'Company1'
    Then dynamic module name 'Company' of 'pluralName' should be displayed as 'Company'

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C22993) --------------------------

  Scenario: As a User, Verify the 'Link' button should be displayed for the website type field after adding a link to the field
    When user is on "Add New Company" page
    When verify the "Link" button should be displayed for the website type field
      | Website | https://pixabay.com/images/search/rose/ |

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C22994) --------------------------

  Scenario: As a User, Verify only active currencies should be display for currency field
    When user is able to see Active currencies only in currency dropdown
    Then verify active currencies under company module

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C22995) --------------------------

  Scenario: As a User, Verify user able to search the contacts in 'Associate Contacts' field
    When user is on "Add New Company" page
    When verify that user able to search contacts as 'Test' in "Associate Contacts" field

#------------------------ Case:7 (http://testrails.rapidops.com/index.php?/cases/view/C22996) --------------------------

  Scenario: As a User, Verify user able to associate the contacts from 'Add new company' pop up
    When user is on "Add New Company" page
    When verify user able to associate the contacts from "Add new company" pop up
      | Associate Contact | Test            |
      | Company Name      | Flx             |
      | Custom Field      | Company Details |
    Then verify notification message as 'Company Created'
    Then check added companies count

#------------------------ Case:8 (http://testrails.rapidops.com/index.php?/cases/view/C22997) --------------------------

  Scenario: As a User, Verify user able to associate the 'N' number of contacts to the company at a time
    When user is on "Add New Company" page
    When verify user able to associate the "N" number of contacts to the company at a time
      | Associate Contact 01 | Test Contact    |
      | Associate Contact 02 | Test Contact    |
      | Company Name         | Tcs             |
      | Custom Field         | Companies       |
    Then verify notification message as 'Company Created'
    Then check added companies count

#------------------------ Case:9 (http://testrails.rapidops.com/index.php?/cases/view/C22998) --------------------------

  Scenario: As a User, Verify user able to remove the association by clicking on 'X' button in 'Add New Company' pop up
    When user is on "Add New Company" page
    When verify user able to remove the association 'Test' by clicking on "X" button in "Add New Company" pop up

#------------------------ Case:11 (http://testrails.rapidops.com/index.php?/cases/view/C23000) -------------------------

  Scenario: As a User, Verify 'Manage Fields' option should not be shown when user don't have rights to manage the fields
    When verifying 'User2' when rights are disabled for right name of '406' through 'User1'
    Then system shows validation upon clicking on "Manage Fields" and log in through 'User1'

#------------------------ Case:10 (http://testrails.rapidops.com/index.php?/cases/view/C22999) -------------------------

  Scenario: As a User, Verify user able to manage the fields from 'Add new company' pop up
    When verifying 'User2' when rights are enabled for right name of '406' through 'User1'
    Then redirect to company layout page and log in through 'User1'

#------------------------ Case:12 (http://testrails.rapidops.com/index.php?/cases/view/C23001) -------------------------

  Scenario: As a User, Verify new company created after clicking on 'Save' button
    When user is on "Add New Company" page
    When verify new company created after clicking on Save button
     | Company Name      | HP          |
     | Owner             | Vijal Patel |
     | Custom Field      | Company     |
    Then verify notification message as 'Company Created'
    Then check added companies count

#------------------------ Case:13 (http://testrails.rapidops.com/index.php?/cases/view/C23002) -------------------------

  Scenario: As a User, Verify new company created and same 'Add new company' pop up opens after clicking on 'Save and add other' button
    When user is on "Add New Company" page
    When add new company details
     | Company Name      | Global  |
     | Custom Field      | Company |
    Then same "Add new company" pop up opens after click on "Save and add other" and check 'Company Created'


#------------------------ Case:14 (http://testrails.rapidops.com/index.php?/cases/view/C23003) -------------------------

  Scenario: As a User, Verify the timeline entry should updated after creating new company
    When verify the timeline entry should updated after creating new company

#------------------------ Case:15 (http://testrails.rapidops.com/index.php?/cases/view/C23004) -------------------------

  Scenario: As a User, Verify new company should not created after clicking on 'Cancel' or 'X' button
    When verify new company should not created after clicking on Cancel or "X" button

#------------------------ Case:16 (http://testrails.rapidops.com/index.php?/cases/view/C23005) -------------------------

  Scenario: As a User, Verify that validation message should display if user do not add value to the required fields
    When user is on "Add New Company" page
    Then verify validation of 'Name is required'