@regression_test_deal @regression_test
Feature: Deal Module > Deal Details Screen > Deal Associated Company Widget

  Description: In this feature user is able to update deal associated company widget

  Background:
    Given 'User1' is on the deal listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C26430) --------------------------

  Scenario: As a User, Verify the UI of 'Associated Company' widget
    When user is on deal details page
    Then verify the UI of "Associated Company" widget

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C26433) --------------------------

  Scenario: User can able to see name of the contact widget according to the given name of the company module
    When user is on deal details page
    Then user can able to see name of company widget according to given name of company module

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C26432) --------------------------

  Scenario: As a User, Verify user able to navigate to details view of Company
    When user is on deal details page
    Then user able to navigate to details view of Company

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C26436) --------------------------

  Scenario: Verify that Quick view should be open with contact all details while user clicking to the company name
    When user is on deal details page
    Then quick view should be open with company all details while user clicking to the company name

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C26435) --------------------------

  Scenario: Verify that the Company widget should not be displayed when the primary company is not found
    Then company widget should not be displayed when the primary company is not found

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C26437) --------------------------
@skip_in_ci
  Scenario: As a User, Verify that If the user clicks to the 'Mobile' number then dial options should be opened
    When user is on deal details page
    Then verify that user clicks to the "Mobile" number then dial options should be opened


