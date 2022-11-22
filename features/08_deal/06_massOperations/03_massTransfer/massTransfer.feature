@regression_test_deal @regression_test
Feature: Deal Module > Mass Operations > Mass Transfer

  Description: In this feature user is able to enable/disable mass transfer deal rights and manage mass transfer
               operations

  Background:
    Given 'User1' is on the deal listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C21109) --------------------------

  Scenario: As a User, Verify that User can't able to see the Transfer options on the bulk operation when the user doesn't have a right to Mass Transfer Deal
    When verifying 'User2' when rights are disabled for right name of '309' through 'User1'
    Then user is on deals listing page
    Then 'Mass Transfer Deals' option is not visible and logged in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C21110) --------------------------

  Scenario: As a user, I should able to see the 'Mass Transfer Deal' option when user has 'Mass Transfer Deal' right
    When verifying 'User2' when rights are enabled for right name of '309' through 'User1'
    Then user is on deals listing page
    Then 'Mass Transfer Deals' option is visible and logged in through 'User1'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C21111) --------------------------

  Scenario: As a user, I should be able to Transfer Companies in bulk from the mass Transfer Deals page
    When user is able to Transfer 'Mass Transfer Deals' in bulk from 'Vijal Patel' to 'Priyanka Vlr' and verify 'Deal transfer successfully'

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C21112) --------------------------

  Scenario: As a User, Verify I should be able to display transfer button disable if I haven't checked any checkbox
    When user is be able to display 'Transfer' button disable if I have not checked any checkbox under 'Mass Transfer Deals' of 'icon-ic_deal' module

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C21113) --------------------------

  Scenario: As a User, Verify upon clicking on cancel button it should terminate transfer process
    When user upon clicking on cancel button it should terminate transfer deal process under 'Mass Transfer Deals'

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C21114) --------------------------

  Scenario: As a User, the system should give me a validation message when transfer from and to users are same
    When system should give validation 'you have selected same users, please select different users' when transfer from 'Vijal Patel' and to users are same under 'Mass Transfer Deals'