@skip_in_ci
Feature: Company Module > Company Preview Widgets > Contact Tab > Associated Contacts

  Description: In this feature user is able to edit associated contacts widgets details under preview page of company module

  Background:
    Given 'User1' is on the company listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C25257) --------------------------

  Scenario: As a User, Verify user able to associate the contact by clicking on 'Add associate contact'
    When user is on preview page > contact tab
    When verify user able to associate contact 'Test Contact' by clicking on "Add associate contact"
    Then verify added associated contact details

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C25258) --------------------------

  Scenario: As a User, verify user able to create new contact and associate the contact to the company
    When user is on preview page > contact tab
    When verify user able to create new contact and associate the contact to company
      | Last Name    | Yash        |
      | First Name   | Agarwal     |
      | Mobile       | 9502411242  |
      | Text Field   | Contact     |

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C25259) --------------------------

  Scenario: As a User, Verify user able to associate multiple contacts in a company
    When user is on preview page > contact tab
    When get count of associate contacts before operation
    When verify user able to associate multiple contacts in a company
      | Contact 1  | Contact 02      |
      | Contact 2  | Contact 05      |
      | Contact 3  | Sample Contact  |
    Then verify associated contact counts should increase

#------------------------ Case:4,5 (http://testrails.rapidops.com/index.php?/cases/view/C25260,C25261) ----------------------

  Scenario: As a User, Verify user able to remove the contacts by clicking on 'X' button
    When user is on preview page > contact tab
    When get count of associate contacts before operation
    When verify user able to remove the contacts by clicking on "X" button
    Then verify associated contact counts should decrease

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C25262) --------------------------

  Scenario: As a User, Verify user able to navigate to details view of contact
    When user is on preview page > contact tab
    Then verify user able to navigate to details view of contact

#------------------------ Case:7 (http://testrails.rapidops.com/index.php?/cases/view/C25263) --------------------------

  Scenario: As a User, Verify the no. of associated contact counts should be reflected in the 'Associated Contacts' column in the grid view of company
    When user is on preview page > contact tab
    When get count of associate contacts before operation
    Then verify the number of associated contact counts should be increased in "Associated Contacts" column in the grid view of company
      | Contact 01 | Sample Contact |
    When get count of associate contacts before operation
    Then verify the number of associated contact counts should be decreased in "Associated Contacts" column in the grid view of company
    Then verify associated contact counts should decrease