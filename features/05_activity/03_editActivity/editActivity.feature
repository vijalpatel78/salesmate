@regression_test_deal @regression_test
Feature: Deal Module > Edit Deal

  Description: In this feature user is able to enable/disable edit deal toggle rights and manage updated
  deals and verify validations for updated deals

  Background:
    Given 'User1' is on the deal listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C25314) --------------------------

  Scenario: Verify, As a User i should not be able to see Edit contact option if i don't have Edit contact rights
    When verifying 'User2' when rights are disabled for right name of 'switch_Task_edit' through 'User1'
    Then edit activity module is not visible and log in through 'User1'

  Scenario: Verify, As a User i should be able to see Edit contact option only if i have Edit contact rights
    When verifying 'User2' when rights are enabled for right name of 'switch_Task_edit' through 'User1'
    Then edit activity module is visible and log in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C25315) --------------------------

  Scenario: Verify, As a User I should be able Access edit deal dialog from icon beside deal name in the listing screen
    When user is able to Access 'Edit Deal' dialog from icon beside name in the listing screen

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C25316) --------------------------

  Scenario: As a User, Verify that I should be able to Access Edit deal dialog from detail screen and from quick view
    When user is on deal details > actions > edit deal dialog
    When it should be able to Access Edit deal dialog from detail screen
      | Title     | Deal 03      |
      | Owner     | Vijal Patel  |
      | Stage     | Qualified    |
      | Priority  | Medium       |
    Then check notification message as 'Record updated successfully'
    When user is on deal preview page
    When it should be able to Access Edit deal dialog from quick view
      | Title     | Deal 04      |
      | Owner     | Vijal Patel  |
      | Stage     | Contacted    |
    Then check notification message as 'Record updated successfully'
    Then close quick view page

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C25318) --------------------------

  Scenario: As a User, Verify that I should be able to see edit deal dialog with the filled value of page elements for a particular deal
    Then it should be able to see edit deal dialog with filled value of page elements for a particular deal

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C25319) --------------------------

  Scenario: As a user, Verify I should be able to see updated deal upon clicking on the update button
    When user is on "Edit Deal" page
    When verify I should be able to see updated deal upon clicking on the update button
      | Owner  |  Priyanka Vlr |
      | Stage  |  Qualified    |
    Then check notification message as 'Record updated successfully'
    Then verify add deal details screen updated owner and stage values

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C25320) --------------------------

  Scenario: As a user, Verify If I click on the cancel button it should terminate the edit deal dialog
    When user is on "Edit Deal" page
    When user is able to close Deal dialog upon clicking on close button

#------------------------ Case:7 (http://testrails.rapidops.com/index.php?/cases/view/C25321) --------------------------

  Scenario: As a user, Verify that the timeline should be updated for that deal after editing deal
    When verify that the timeline should be updated for that deal after editing deal

#------------------------ Case:8 (http://testrails.rapidops.com/index.php?/cases/view/C25322) --------------------------

  Scenario: As a User, Verify I should be able to move to the deal Layout page upon clicking on manage fields
    When verifying 'User2' when rights are enabled for right name of '406' through 'User1'
    Then it moves to 'icon-ic_deal' module Layout page upon clicking on "Manage fields" when 'User1' have rights to manage layout

#------------------------ Case:9 (http://testrails.rapidops.com/index.php?/cases/view/C25323) --------------------------

  Scenario: As a user, Verify that the user can see the updated deal module name on the edit deal dialog
    When dynamic module name 'Deal' of 'pluralName' should be displayed as 'Deal07'
    Then verification of updated dynamic deal module name 'Deal07'
    Then dynamic module name 'Deal' of 'pluralName' should be displayed as 'Deals'

#------------------------ Case:10 (http://testrails.rapidops.com/index.php?/cases/view/C25324) -------------------------

  Scenario: As a User, Verify the validation message should be display for required field if user remove the value from required field
    When user is on "Edit Deal" page
    When user does not enter data in title field
      | Title  |       |
    When verify validation of 'Title is required'

#------------------------ Case:11 (http://testrails.rapidops.com/index.php?/cases/view/C25325) -------------------------

  Scenario: As a user, I should be able to edit a deal with the required details only
    When user should be able to edit a deal with the required details only
      | Title     | Deal 05      |
      | Owner     | Vijal Patel  |
    Then check notification message as 'Record updated successfully'

#------------------------ Case:12 (http://testrails.rapidops.com/index.php?/cases/view/C23013) --------------------------

  Scenario: As a user, Verify that the Manage fields link should not be displayed on the 'Edit Deal' pop-up while the user does not have 'Manage Fields' rights
    When verifying 'User2' when rights are disabled for right name of '406' through 'User1'
    Then "Manage fields" is not visible for 'icon-ic_deal' module when 'User1' do not have rights to manage layout