@regression_test_deal @regression_test
Feature: Deal Module > Deal Details Screen > Deal Participants Widget

  Description: In this feature user is able to update deal participants widget

  Background:
    Given 'User1' is on the deal listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C26455) --------------------------

  Scenario: As a User, Verify the UI of 'Participants' widget
    When user is on deal details page
    Then verify the UI of "Participants" widget

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C26457) --------------------------

  Scenario: As a user, Verify that the user able to add the participants from the deal details
    When user is on deal details page
    Then verify that the user able to add the participant as 'Sample' from the deal details

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C26458) --------------------------

  Scenario: As a user, Verify that user is able to navigate to details view of contact
    When user is on deal details page
    Then verify that user is able to navigate to details view of contact

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C26454) --------------------------

  Scenario: As a user, Verify that timeline entry should get updated after adding participant of the deal
    When user is on deal details page
    Then verify that timeline entry should get updated after adding participant of the deal

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C26458) --------------------------

  Scenario: As a User, Verify user able to remove the contact by clicking on 'X' button
    When user is on deal details page
    Then verify user able to remove the contact by clicking on "X" button

#------------------------- Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C26459) -------------------------

  Scenario: As a User, Verify that If user doesn't have contact rights then it should not able to add the participants in the widget
    When verifying 'User2' when rights are disabled for right name of 'switch_Deal_edit' through 'User1'
    When user is on deal module
    When user is on deal details page
    Then participants search box is not displayed and log in through 'User1'