@regression_test_contact @regression_test
Feature: Company Module > Company Details View > Deal Widget

  Description: In this feature user is able to add deals under company details widgets page

  Background:
    Given 'User1' is on the company listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C22521) --------------------------

  Scenario: As a User, Verify that When No deal is attached to Particular widget it should display No Deal found message
    When user is on company details page
    Then verify that When No deal is attached to Particular widget it should display 'No deals found.' message

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C22522) --------------------------

  Scenario: As a User, Verify that it should open Add deal dialog upon clicking on + button
    When user is on company details page
    When verify that it should open Add deal dialog upon clicking on + button

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C22523) --------------------------

  Scenario: As a User, Verify that Upon clicking on save button it should add deal to deal widget on the spot
    When user is on company details page
    When verify that Upon clicking on save button it should add deal to deal widget on the spot
     | Value        | 700           |
     | Date         | Dec 28, 2021  |
     | Text         | Open Deal     |
    Then check notification message as 'Deal Created'
    Then verify add deal details on contact widgets page

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C22524) --------------------------

  Scenario: As a User, Verify that when adding a new deal it should increase a deal count in deal widget
    When user is on company details page
    Then verify that when adding a new deal it should increase a deal count in deal widget

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C22525) --------------------------

  Scenario: As a User, Verify that User can expand - collapse deal widget
    When user is on company details page
    Then verify that User can expand - collapse deal widget

#------------------------ Case:7 (http://testrails.rapidops.com/index.php?/cases/view/C22527) --------------------------

  Scenario: As a User, Verify that upon clicking on the detail icon it should open deal detail page
    When user is on company details page
    Then verify that upon clicking on the detail icon it should open deal detail page

#------------------------ Case:9 (http://testrails.rapidops.com/index.php?/cases/view/C22529) --------------------------

  Scenario: As a User, Verify that Upon clicking on the deal title in the widget it should open deal quick view
    When user is on company details page
    Then verify that Upon clicking on the deal title in the widget it should open deal quick view

#------------------------ Case:10 (http://testrails.rapidops.com/index.php?/cases/view/C22530) -------------------------

  Scenario: As a User, Verify that Upon clicking on the deal pipeline bar User can change the stages of deal
    When user is on company details page
    Then verify that Upon clicking on the deal pipeline bar User can change the stages of deal

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C22526) --------------------------

  Scenario: As a user, Verify that deal can be removed/ disassociate from contact by the remove option on deal card in deal widget
    When user is on company details page
    Then verify that deal can be removed from 'icon-ic_company' module by remove option on deal card in deal widget
    Then check notification message as 'Deal deleted successfully'

#------------------------ Case:8 (http://testrails.rapidops.com/index.php?/cases/view/C22528) --------------------------

  Scenario: As a User, Verify that when removing a deal it should decrease the deal count in deal widget
    When user is on company details page
    Then removing a deal it should decrease the deal count in deal widget

#------------------------ Case:11 (http://testrails.rapidops.com/index.php?/cases/view/C22531) -------------------------

  Scenario: As a User, Verify that when a User don't have rights to Access deal module then It should not display deal widget in the detail screen
    When verifying 'User2' when rights are disabled for right name of 'switch_Deal_access' through 'User1'
    When user is on company listing page
    When user is on company details page
    Then deal widget is not visible and log in through 'User1'

#------------------------ Case:12 (http://testrails.rapidops.com/index.php?/cases/view/C22532) -------------------------

  Scenario: As a User, Verify that when a User don't have rights to see any particular deal then it should display error message upon clicking on deal
    When verifying 'User2' when rights are enabled for right name of 'switch_Deal_add' through 'User1'
    When user is on company listing page
    When user is on company details page
    Then deal update button is disabled and log in through 'User1'