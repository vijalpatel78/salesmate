@regression_test_deal @regression_test
Feature: Deal Module > Add Deal

  Description: In this feature user is able to enable/disable create deal toggle rights and manage added
               deals and verify validations for created deal

  Background:
    Given 'User1' is on the deal listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C25289) --------------------------
@skip_in_ci
  Scenario: As a User, Verify '+ Deal' button should not be shown if disabled deal rights and '+ Deal' shown after enabling rights
    When verifying 'User2' when rights are disabled for right name of 'switch_Deal_add' through 'User1'
    Then add deal module is not visible and log in through 'User1'
    When verifying 'User2' when rights are enabled for right name of 'switch_Deal_add' through 'User1'
    Then add deal module is visible and log in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C25290) --------------------------

  Scenario: As a user, I can see the Add New deal dialog while clicking on the '+ button'
    When user is on "Add Deal" page
    When user see the Add New deal dialog while clicking on the "+ button"

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C25291) --------------------------

  Scenario: As a User, i should be able to see some default Page elements into the create new deal dialog
    When user is on "Add Deal" page
    When user able to see some default Page elements into the create new deal dialog

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C25292) --------------------------

  Scenario: As a User, Verify that validation message should display if user do not add value to the required fields
    When user is on "Add Deal" page
    Then verify validation of 'Title is required'

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C25293) --------------------------

  Scenario: As a User, I should be able to see 255 character Validation message for Deal Title
    When user is on "Add Deal" page
    Then user should be able to enter invalid deal title
     | Deal Title  | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit. |
    Then it should display 'Should be maximum 255 characters' validation

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C25294) --------------------------

  Scenario: As a User, I should be able to create a new contact and company using a quick view
    When user is on "Add Deal" page
    When user able to create a new contact and company using a quick view

#------------------------ Case:7 (http://testrails.rapidops.com/index.php?/cases/view/C25295) --------------------------

  Scenario: As a User, I should be able to verify Save and cancel button functionality of contact quick view
    When user is on "Add Deal" page
    Then user able to verify Save button functionality of contact quick view
      | First Name | Harsha          |
      | Mobile     | 9706439120      |
      | Email      | ghjkl@gmail.com |
      | Text Field | Contact         |
    Then user able to verify Cancel button functionality of contact quick view

#------------------------ Case:8 (http://testrails.rapidops.com/index.php?/cases/view/C25296) --------------------------

  Scenario: As a User, I should be able to verify Save and cancel button functionality of company quick view
    When user is on "Add Deal" page
    Then user able to verify Save button functionality of company quick view
      | Website      | song.com    |
      | Phone        | 7706439127  |
      | Custom Field | Company     |
    Then user able to verify Cancel button functionality of company quick view

#------------------------ Case:14 (http://testrails.rapidops.com/index.php?/cases/view/C25302) --------------------------

  Scenario: Verify, As a User i should able to see validation message upon clicking on "Manage Fields"
    When verifying 'User2' when rights are disabled for right name of '406' through 'User1'
    Then system shows validation message upon clicking on "Manage Fields" of 'Deal' under 'icon-ic_deal' module and log in through 'User1'

#------------------------ Case:9 (http://testrails.rapidops.com/index.php?/cases/view/C25297) --------------------------

  Scenario: Verify, As a User i should be able to move to contact Layout page upon clicking on Manage fields
    When verifying 'User2' when rights are enabled for right name of '406' through 'User1'
    Then user is able to move to 'icon-ic_deal' Layout page and click 'Deal' and log in through 'User1'

#------------------------ Case:10 (http://testrails.rapidops.com/index.php?/cases/view/C25298) -------------------------

  Scenario: As a user, verify that the 'Add New Deal' dialog disappear while clicking on the 'close' button
    When user is able to close 'Deal' dialog upon clicking on close button

#------------------------ Case:11 (http://testrails.rapidops.com/index.php?/cases/view/C25299) -------------------------
@skip_in_ci
  Scenario: As a user, I able to 'search/add' the multiple teammates from the 'add new deal' dialog
    When user is on "Add Deal" page
    Then user able to search or add the multiple teammates from the add new deal dialog

#------------------------ Case:12 (http://testrails.rapidops.com/index.php?/cases/view/C25300) -------------------------
@skip_in_ci
  Scenario: As a user, I able to 'add/search' the multiple participants from the 'add new deal' dialog
    When user is on "Add Deal" page
    Then user able to add or search the multiple participants from the add new deal dialog

#------------------------ Case:15 (http://testrails.rapidops.com/index.php?/cases/view/C25303) -------------------------

  Scenario: As a user, I should be able to add a deal with the required details only
    When user is on "Add Deal" page
    Then user should be able to add a deal with the required details only
      | Title     | Deal 01      |
      | Owner     | priyanka vlr |
      | Stage     | Qualified    |
      | Priority  | Medium       |
    Then check notification message as 'Created Successfully.'
    And check count of deals added

#------------------------ Case:16 (http://testrails.rapidops.com/index.php?/cases/view/C25304) -------------------------

  Scenario: As a user, I should be able to add multiple deals at a time by 'Save and add other' button
    When user is on "Add Deal" page
    Then user should be able to add multiple deals at a time
      | Title     | Deal 02      |
      | Owner     | test user    |
      | Stage     | Contacted    |
      | Priority  | Low          |
    Then check message as 'Created Successfully.' and click on "Save and add other" button


#------------------------ Case:17 (http://testrails.rapidops.com/index.php?/cases/view/C25305) -------------------------

  Scenario: Verify, As a User I should be able to see Active currencies only in currency dropdown
    When user is able to see Active currencies only in currency dropdown
    Then verify active currencies of 'Deal' under 'icon-ic_deal' module

#------------------------ Case:18 (http://testrails.rapidops.com/index.php?/cases/view/C25306) -------------------------

  Scenario: As a user, verify that the 'win probability' textbox will appear as enabled or disabled according to the selected deal pipeline
    When verify that "win probability" textbox will appear as enabled or disabled according to selected deal pipeline

#------------------------ Case:19 (http://testrails.rapidops.com/index.php?/cases/view/C25307) -------------------------

  Scenario: As a user, Verify that if user don't have rights of contact and company module then the user can't able to create a new contact and company
    When verifying 'User2' when rights are disabled for right name of 'switch_Contact_add' through 'User1'
    Then user get 'You do not have permission to create contact','You do not have permission to create company' validations and log in through 'User1'