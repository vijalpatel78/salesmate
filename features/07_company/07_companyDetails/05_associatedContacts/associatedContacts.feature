@regression_test_company @regression_test
Feature: Company Module > Company Details Widgets > Associated Contacts

  Description: In this feature user is able to edit associated contacts widgets details

  Background:
    Given 'User1' is on the company listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C24519) --------------------------

  Scenario: As a User, Verify UI of 'Associated Contacts' widget
    When user is on company details page
    Then As a User, Verify UI of "Associated Contacts" widget and 'No results found.' message

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C24520) --------------------------

  Scenario: As a User, Verify that it should allow me to collapse and expand the 'Associated Contacts' widget
    When user is on company details page
    Then verify that it should allow user to collapse and expand "Associated Contacts" widget

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C24521) --------------------------

  Scenario: As a User, Verify user able to associate the contact by clicking on 'Add associate contact'
    When user is on company details page
    When verify user able to associate the contact 'Test Contact' by clicking on "Add associate contact"
    Then verify added associate contact details

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C24522) --------------------------

  Scenario: As a User, verify user able to create new contact and associate the contact to the company
    When user is on company details page
    When verify user able to create new contact and associate the contact to the company
     | Last Name    | Yash        |
     | First Name   | Agarwal     |
     | Mobile       | 9502411242  |
     | Text Field   | Contact     |

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C24523) --------------------------

  Scenario: As a User, Verify user able to associate multiple contacts in a company
    When user is on company details page
    When get count of associate contacts before operation
    When verify user able to associate multiple contacts in a company
     | Contact 1  | Contact 02      |
     | Contact 2  | Contact 05      |
     | Contact 3  | Sample Contact  |
    Then verify associated contact counts should increase

#------------------------ Case:6,7 (http://testrails.rapidops.com/index.php?/cases/view/C24524,C24525) ----------------------

  Scenario: As a User, Verify user able to remove the contacts by clicking on 'X' button
    When user is on company details page
    When get count of associate contacts before operation
    When verify user able to remove the contacts by clicking on "X" button
    Then verify associated contact counts should decrease

#------------------------ Case:8 (http://testrails.rapidops.com/index.php?/cases/view/C24526) --------------------------

  Scenario: As a User, Verify user able to navigate to details view of contact
    When user is on company details page
    Then verify user able to navigate to details view of contact

#------------------------ Case:9 (http://testrails.rapidops.com/index.php?/cases/view/C24527) --------------------------

  Scenario: As a User, Verify the no. of associated contact counts should be reflected in the 'Associated Contacts' column in the grid view of company
    When user is on company details page
    When get count of associate contacts before operation
    Then verify the number of associated contact counts should be increased in "Associated Contacts" column in the grid view of company
      | Contact 01 | Sample Contact |
    When get count of associate contacts before operation
    Then verify the number of associated contact counts should be decreased in "Associated Contacts" column in the grid view of company
    Then verify associated contact counts should decrease

#------------------------ Case:10 (http://testrails.rapidops.com/index.php?/cases/view/C24528) -------------------------

  Scenario: As a User, Verify user able to initiate the call from mobile number of the contact
    When user is on company details page
    Then verify user able to initiate the call from mobile number of the contact

#------------------------ Case:11 (http://testrails.rapidops.com/index.php?/cases/view/C24529) -------------------------

  Scenario: As a User, Verify user able to send a text to the contact from mobile number field
    When user is on company details page
    Then verify user able to send a text as 'Hello,How are you?!' to the contact from mobile number field