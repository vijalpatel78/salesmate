@regression_test_contact @regression_test
Feature: Contact Module > Contact Details Widgets > Actions > Edit Contact

  Description: In this feature user is able to enable/disable edit contact toggle rights and manage updated
  contact and verify validations for updated contact

  Background:
    Given 'User1' is on the contact listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C20033) --------------------------

  Scenario: Verify, As a User i should not be able to see Edit contact option if i don't have Edit contact rights
    When verifying 'User2' when rights are disabled for right name of 'switch_Contact_edit' through 'User1'
    Then edit contact module is not visible and log in through 'User1'

  Scenario: Verify, As a User i should be able to see Edit contact option only if i have Edit contact rights
    When verifying 'User2' when rights are enabled for right name of 'switch_Contact_edit' through 'User1'
    Then edit contact module is visible and log in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C20034) --------------------------

  Scenario: Verify, As a User I should be able Access edit contact dialog from icon beside contact name in the listing screen
    When user is able to Access 'Edit Contact' dialog from icon beside contact name in the listing screen

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C20038) --------------------------

  Scenario: Verify, As a User I should be able to update contact
    When user is able to update a contact
      | First Name            | Contact                                     |
      | Last Name             | 05                                          |
      | Mobile                | 954321097                                   |
      | Email                 | lucky.priya369@gmail.com                    |
      | Job Title             | Automation Tester                           |
      | Phone                 | 7809652598                                  |
      | Other Phone           | 8341038772                                  |
      | Owner                 | Vijal Patel                                 |
      | Type                  | Lead                                        |
      | Email Opt Out Checkbox| Enable                                      |
      | Email Opt Out Reason  | Due to phising attack                       |
      | SMS Opt Out           | Disable                                     |
      | Time Zone             | Asia/Dubai                                  |
      | Skype                 | Vijal Patel                                 |
      | Website               | details.com                        |
      | Facebook              | Vijal                                       |
      | LinkedIn              | P Vijal                                     |
      | Twitter               | Vijal P                                     |
      | Instagram             | Vijal Patel                                 |
      | Description           | This contact contains details of contact    |
      | Tags                  | Details                                     |
      | Address Line1         | Door Number:7-907                           |
      | Address Line2         | Surya Nagar                                 |
      | City                  | Paloncha                                    |
      | ZipCode               | 533034                                      |
      | State                 | Khammam                                     |
      | Country               | India                                       |
      | Text Field            | Personal Details                            |
      | Text Area             | Contact details must be updated             |
      | Integer               | 89034568                                    |
      | Decimal               | 70098321                                    |
      | Date                  | Aug 03, 2021                                |
      | Date And Time         | Apr 07, 2021 09:45 AM                       |
      | Email Field           | abc123@gmail.com                            |
      | Phone Field           | 5678903215                                  |
      | Select Field          | S3                                          |
      | URL                   | contacts.com                                |
      | Big Integer           | 7770986543                                  |
      | Percentage            | 79                                          |
      | Boolean               | Enable                                      |
      | Currency field        | 500432194                                   |
    Then check 'Record updated successfully' message and verify updated contact details

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C20039) --------------------------

  Scenario: Verify, as a User if i click on the cancel button it should terminate update process
    When the user click on the cancel button it should terminate update process
      | First Name  | Jui   |
      | Last Name   | Shah  |

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C20040) --------------------------

  Scenario: Verify, As a User timeline should be updated for that contact after editing contact
    When the user timeline should be updated for that contact after editing contact

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C20042) --------------------------

  Scenario: Verify, As a User It should show me validation message upon clicking on Manage fields when i don't have rights to manage layout
    When verifying 'User2' when rights are disabled for right name of '406' through 'User1'
    Then manage fields link is not visible and log in through 'User1'

#------------------------ Case:7 (http://testrails.rapidops.com/index.php?/cases/view/C20041) --------------------------

  Scenario: Verify, As a User i should be able to move to contact Layout page upon clicking on Manage fields
    When verifying 'User2' when rights are enabled for right name of '406' through 'User1'
    Then manage fields link is visible and log in through 'User1'

#------------------------ Case:8 (http://testrails.rapidops.com/index.php?/cases/view/C20043) --------------------------

  Scenario: Verify, As a User I should not be able to update contact without adding value in mandatory fields
    When user is not able to update contact without adding value in mandatory fields
      | First Name  |     |
      | Last Name   |     |
    Then check validation as 'First Name or Last Name is required'

#------------------------ Case:9 (http://testrails.rapidops.com/index.php?/cases/view/C20044) --------------------------

  Scenario: Verify, As a User i should be able to see 255 character Validation message for first name and last name upon focus out while updating a contact
    When checking first and last name with more than 255 characters
      | First Name  | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit.|
      | Last Name   | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit.|
    Then check validation messages as 'Should be maximum 255 characters'

#------------------------ Case:10 (http://testrails.rapidops.com/index.php?/cases/view/C20046) -------------------------

  Scenario: Verify, As a User i should be able to see invalid email Validation while updating a contact
    When the user is able to see invalid email Validation while updating a contact
      | Email   | abc   |
    Then check email validation as 'Email should be valid' message