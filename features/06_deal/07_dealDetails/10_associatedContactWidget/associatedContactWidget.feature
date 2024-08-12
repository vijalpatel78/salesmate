@regression_test_deal @regression_test
Feature: Deal Module > Deal Details Screen > Deal Associated Contact Widget

  Description: In this feature user is able to update deal associated contact widget

  Background:
    Given 'User1' is on the deal listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C26422) --------------------------

  Scenario: As a User, Verify the UI of 'Associated Contacts' widget
    When user is on deal details page
    Then verify the UI of "Associated Contacts" widget

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C26425) --------------------------

  Scenario: User can able to see name of the contact widget according to the given name of the contact module
    When user is on deal details page
    Then user can able to see name of contact widget according to given name of contact module

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C26438) --------------------------

  Scenario: As a User, Verify user able to navigate to details view of Contact
    When user is on deal details page
    Then user able to navigate to details view of Contact

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C26424) --------------------------

  Scenario: Verify that Quick view should be open with contact all details while user clicking to the contact name
    When user is on deal details page
    Then quick view should be open with contact all details while user clicking to the contact name

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C26427) --------------------------

  Scenario: Verify that the Contact widget should not be displayed when the primary contact is not found
    Then contact widget should not be displayed when the primary contact is not found

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C26428) --------------------------

  Scenario: Verify that user clicks on email of the contact widget then email compose screen should be displayed with filled contact name
    When user is on deal details page
    Then user clicks on email of contact widget then email compose screen should be displayed with filled contact name

#------------------------ Case:7 (http://testrails.rapidops.com/index.php?/cases/view/C26422) --------------------------
@skip_in_ci
  Scenario: As a User, Verify that If the user clicks to the 'Mobile' number then dial options should be opened
    When user is on deal details page
    Then verify that user clicks to the "Mobile" number then dial options should be opened


