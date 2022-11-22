@regression_test_deal @regression_test
Feature: Deal Module > Mass Operations > Mass Update

  Description: In this feature user is able to enable/disable mass update deal rights and manage mass update
               operations

  Background:
    Given 'User1' is on the deal listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C21096) --------------------------

  Scenario: As a User, Verify that User can't able to see the Update options on the bulk operation when the user doesn't have a right to Mass Update Deal
    When verifying 'User2' when rights are disabled for right name of '307' through 'User1'
    Then user is on deals listing page
    Then 'Mass Update Deals' link is not visible and log in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C21097) --------------------------

  Scenario: As a user, I should able to see the 'Mass Update' option when user has 'Mass Update Deal' right
    When verifying 'User2' when rights are enabled for right name of '307' through 'User1'
    Then user is on deals listing page
    Then 'Mass Update Deals' link is visible and log in through 'User1'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C21098) --------------------------

  Scenario: As a user, I should be able to update Contacts in bulk from the mass update Deal page
    When user is able to update Deals in bulk from the mass update Deal page
      | Select Field01  | Big Integer Field        | 546774                   |
      | Select Field02  | Boolean Field            | Yes                      |
      | Select Field03  | Owner                    | Vijal Patel              |
      | Select Field04  | Date Field               | Jan 13, 2021             |
      | Select Field05  | Date Time Field          | Apr 24, 2021 07:33 PM    |

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C21099) --------------------------

  Scenario: As a User, Verify I should be able to display update button disable if I haven't checked any checkbox
    When user is able to display 'Update' button disable if I have not checked any checkbox under 'Mass Update Deals' of 'icon-ic_deal' module

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C21100) -------------------------

  Scenario: As a User, Verify upon clicking on cancel button it should terminate update process
    When user upon clicking on cancel button it should terminate update process under 'Mass Update Deals'

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C21101) --------------------------

  Scenario: As a User, the system should give me a validation message when any criteria are not selected
    When system should give validation 'Select Search Criteria' when any criteria not selected under 'Mass Update Deals'