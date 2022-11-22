@regression_test_contact @regression_test
Feature: Contact Module > Preview Page > Related Tab > Deals

  Description: In this feature user is able to add, update and manage deals

  Background:
    Given 'User1' is on the contact listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C22704) --------------------------

  Scenario: As a User, Verify that When No deal is attached then it should display No Deal found message in the Panel
    When user is on Related Tab
    Then verify that When No deal is attached then it should display 'No deal found.' message in the Panel

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C22705) --------------------------

  Scenario: As a User, Verify that it should open Add deal dialog upon clicking on + button of Deal Panel
    When user is on Related Tab
    Then verify that it should open Add deal dialog upon clicking on + button of Deal Panel

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C22706) --------------------------

  Scenario: As a User, Verify that Upon clicking on save button it should add deal to deal Panel on the spot
    When user is on Related Tab
    Then verify that Upon clicking on save button it should add deal to deal Panel on the spot
      | Value        | 100           |
      | Date         | Sep 30, 2021  |
    Then check notification message as 'Deal Created'
    Then verify added deal details on related tab

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C22707) --------------------------

  Scenario: As a User, Verify that when adding a new deal it should increase a deal count in deal Panel
    When user is on Related Tab
    Then verify that when adding a new deal it should increase a deal count in deal Panel

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C22708) --------------------------

  Scenario: As a User, Verify that User can expand - collapse deal Panel
    When user is on Related Tab
    Then verify that User can expand - collapse deal panel

#------------------------ Case:7 (http://testrails.rapidops.com/index.php?/cases/view/C22710) --------------------------

  Scenario: As a User, Verify that upon clicking on the detail icon it should open deal detail page
    When user is on Related Tab
    Then verify that upon clicking on detail icon it should open deal detail page

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C22709) --------------------------
@skip_in_ci
  Scenario: As a user, Verify that deal can be removed/ disassociate from contact by the remove option on deal card in deal Panel
    When user is on Related Tab
    Then verify that deal can be removed disassociate from 'icon-ic_contacts' module by the remove option on deal card in deal panel
    Then check notification message as 'Deal deleted successfully'
    And check deleted deal details