@regression_test_deal @regression_test
Feature: Deal Module > Preview Page > Users Tab

  Description: In this feature user is able to check the users tab by participants and users list

  Background:
    Given 'User1' is on the deal listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C27011) --------------------------

  Scenario: As a User, Verify the UI of 'Users Tab'
    When user is on deal preview page
    When user is on 'Users' Tab
    Then verify the UI of "Users Tab"
    Then user closes quick view page

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C27013) --------------------------

  Scenario: As a user, Verify that the user able to add the teammates of the deal in the 'Users' section from the deal preview page
    When user is on deal preview page
    When user is on 'Users' Tab
    When verify that the user able to add the teammate as 'Priyanka' from the deal details
    When user closes quick view page

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C27014) --------------------------

  Scenario: As a User, Verify user able to remove the user by clicking on 'X' button
    When user is on deal preview page
    When user is on 'Users' Tab
    Then verify user able to remove the user by clicking on "X" button
    When user closes quick view page

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C27015) --------------------------

  Scenario: As a user, Verify that Quick view should be open with user details while user clicking to the user name
    When user is on deal preview page
    When user is on 'Users' Tab
    Then verify that Quick view should be open with user details while user clicking to the user name
    Then user closes quick view page

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C27016) --------------------------

  Scenario: As a user, Verify that the user able to add the Participants of the deal in the 'Users' section from the deal preview page
    When user is on deal preview page
    When user is on 'Users' Tab
    Then verify that the user able to add the participant as 'Sample' from the deal details
    Then user closes quick view page

#------------------------ Case:7 (http://testrails.rapidops.com/index.php?/cases/view/C27018) --------------------------

  Scenario: As a User, Verify that user able to navigate the details view of contact while clicking on the contact name
    When user is on deal preview page
    When user is on 'Users' Tab
    Then verify that user is able to navigate to details view of contact

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C27017) --------------------------

  Scenario: As a User, Verify user able to remove the contact by clicking on 'X' button
    When user is on deal preview page
    When user is on 'Users' Tab
    Then verify user able to remove the contact by clicking on "X" button
    Then user closes quick view page