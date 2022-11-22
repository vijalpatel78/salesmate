@regression_test_contact @regression_test
Feature: Contact Module > Preview Page > Related Tab > Activities

  Description: In this feature user is able to add, update and manage activities

  Background:
    Given 'User1' is on the contact listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C22711) --------------------------

  Scenario: As a User, Verify that When No Activity is attached to Particular Contact it should display No Activity found message
    When user is on Related Tab
    When verify that When No Activity is attached it should display "No Activity yet! let's create one" message

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C22712) --------------------------

  Scenario: As a User, Verify that it should open Add Activity dialog upon clicking on + button of Activity Panel
    When user is on Related Tab
    Then verify that it should open Add Activity dialog upon clicking on + button of Activity Panel

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C22713) --------------------------

  Scenario: As a User, Verify that Upon clicking on save button it should add Activity to Activity Panel on the spot
    When user is on Related Tab
    Then verify that Upon clicking on save button it should add Activity to Activity Panel on the spot
      | Title       | Activity 01      |
    Then check notification message as 'Activity added successfully'
    And check added activity details

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C22714) --------------------------

  Scenario: As a User, Verify that when adding a new Activity it should increase a Activity count in Activity Panel
    When user is on Related Tab
    Then verify that when adding a new Activity it should increase a Activity count in Activity Panel

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C22715) --------------------------

  Scenario: As a User, Verify that I can expand - collapse Activity Panel
    When user is on Related Tab
    Then verify that I can expand - collapse Activity Panel

#------------------------ Case:7 (http://testrails.rapidops.com/index.php?/cases/view/C22717) --------------------------

  Scenario: As a User, Verify that upon clicking on the Activity name link it should open Activity quick view
    When user is on Related Tab
    Then verify that upon clicking on the Activity name link it should open Activity quick view

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C22716) --------------------------

  Scenario: As a user, Verify that Activity can be removed/ disassociate from contact by the remove option on Activity card
    When user is on Related Tab
    Then verify that Activity can be removed disassociate from "icon-ic_contacts" by the remove option on Activity card
    Then check notification message as 'Activity deleted successfully'
    And check deleted activity details