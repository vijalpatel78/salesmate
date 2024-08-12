@regression_test_contact @regression_test
Feature: Contact Module > Preview Page > Edit Contact

  Description: In this feature user is able to enable/disable edit contact toggle rights and manage updated
  contact and verify validations for updated contact

  Background:
    Given 'User1' is on the contact listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C22651) --------------------------

  Scenario: As a User, Verify that by default It should display detail view of Contact in Edit mode upon Opening quick view of contact
    When user is on the contact preview page
    Then verify that by default it should display detail view of Contact in Edit mode upon Opening quick view of contact

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C22652) --------------------------

  Scenario: As a User, Verify that it should allow me to change contact data from Preview
    When user is on the contact preview page
    Then verify that it should allow me to change contact data from Preview
      | First Name            | Contact                                     |
      | Last Name             | Test                                        |
      | Mobile                | 954321097                                   |
      | Email                 | abcxyz@gmail.com                            |
      | Job Title             | Developer                                   |
      | Phone                 | 7809652598                                  |
      | Other Phone           | 8341038772                                  |
      | Owner                 | Vijal Patel                                 |
    And check notification message as 'Record updated successfully'
    Then check updated contact details in contact preview page

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C22653) --------------------------

  Scenario: As a User, Verify Upon clicking on the Update button it should update Contact info with Updated values
    When verify Upon clicking on the Update button it should update Contact info with Updated values

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C22655) --------------------------

  Scenario: As a User, Verify that if I update from preview without adding Mandatory field it should display validation message
    When user is on the contact preview page
    Then verify that if I update from preview without adding Mandatory field it should display validation message
      | Name  |        |
    And check validation as 'First Name or Last Name is required' message

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C22654) --------------------------

  Scenario: As a User, Verify that when User don't have rights to Update contact it should not enable update button
    When verifying 'User2' when rights are disabled for right name of 'switch_Contact_edit' through 'User1'
    Then user not able to see edit 'icon-ic_contact' module and log in through 'User1'