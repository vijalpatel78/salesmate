@regression_test_activity @regression_test
Feature: Activity Module > Preview Page > Edit Deal

  Description: In this feature user is able to enable/disable edit deal toggle rights and manage updated
               activity and verify validations for updated activity

  Background:
    Given 'User1' is on the activity listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C26976) --------------------------

  Scenario: As a User, Verify that User should be able to open quick view by clicking on the preview button from the listing page
    When user is on activity preview page
    Then verify that user should be able to open quick view by clicking on the preview button from the listing page

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C26982) --------------------------

  Scenario: As a User, Verify that by default It should display a detail view of Deal in Edit mode upon opening a quick view of the deal
    When user is on activity preview page
    Then verify that by default It should display a detail view of Deal in Edit mode

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C26983) --------------------------

  Scenario: As a User, Verify that by default It should display a detail view of Deal in Edit mode upon opening a quick view of the deal
    When user is on activity preview page
    When it should be able to Access Edit deal dialog from quick view
      | Title     | Deal 04      |
      | Owner     | Vijal Patel  |
      | Stage     | Contacted    |
    Then check notification message as 'Record updated successfully'
    Then close quick view page

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C26985) --------------------------

  Scenario: As a User, Verify that if I update from preview without adding Mandatory field it should display validation message
    When user is on activity preview page
    When user does not enter data in title field
      | Title  |       |
    And check validation as 'Title is required' message

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C26977) --------------------------

  Scenario: As a User, Verify that User should be able to close quick view by clicking on the Close or Cancel button
    When user is on activity preview page
    Then redirects to deals listing page after clicking on cancel button

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C26984) --------------------------

  Scenario: As a User, Verify that when User don't have rights to Update deal it should not enable update button
    When verifying 'User2' when rights are disabled for right name of 'switch_Deal_edit' through 'User1'
    Then edit deal module is not visible and log in through 'User1'

#------------------------ Case:7 (http://testrails.rapidops.com/index.php?/cases/view/C26994) --------------------------

  Scenario: As a User, Verify that User can redirect to the Deal details screen upon clicking on the 'Go to Details View' icon
    When user is on activity preview page
    Then verify that user can redirect to Deal details screen upon clicking on "Go to Details View" icon

#------------------------ Case:9 (http://testrails.rapidops.com/index.php?/cases/view/C26999) --------------------------

  Scenario: As a User, Verify that I should be able to Won the deal from the deal quick view
    When user is on activity preview page
    When user is able to won a deal
      | Won Description | Account research done prior to first call Proposal |
    When user click on save button
    Then check notification message as 'Record updated successfully'
    Then check updated timeline entry of deal
    Then user clicks on reopen deal
    When user closes quick view page

#------------------------ Case:8 (http://testrails.rapidops.com/index.php?/cases/view/C27000) --------------------------

  Scenario: As a User, Verify that I should be able to Lost the deal from the deal quick view
    When user is on activity preview page
    When user is able to lost a deal
      | Lost Reason      | Price                  |
      | Lost Description | Deal should be failed  |
    When user click on save button
    Then check notification message as 'Record updated successfully'
    Then check updated timeline entry of deal
    When user closes quick view page

#------------------------ Case:10 (http://testrails.rapidops.com/index.php?/cases/view/C27001 ) -------------------------

  Scenario: As a User, Verify that I should be able to reopen the deal from the deal quick view
    When user is on activity preview page
    When user clicks on reopen deal
    When user closes quick view page

#------------------------ Case:11 (http://testrails.rapidops.com/index.php?/cases/view/C26991) -------------------------

  Scenario: As a User, Verify that If the user clicks on the associated contact name then the quick view of contact details should opens
    When user is on activity preview page
    Then verify on click of associated contact name the quick view of contact details should opens

#------------------------ Case:12 (http://testrails.rapidops.com/index.php?/cases/view/C26992) -------------------------

  Scenario: As a User, Verify that If the user clicks on the associated company name then the quick view of company details should opens
    When user is on activity preview page
    Then verify on click of associated company name the quick view of company details should opens