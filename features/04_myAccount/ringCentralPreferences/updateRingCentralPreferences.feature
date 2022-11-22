@skip_in_ci 
# We skipped this feature because RingCentral is asking for a code
Feature: Ring Central App

Description: In this feature user will be able to install ring central preference and authorize ring central
             preference and also user will be able to remove ring central app.

  Background:
    Given the 'User1' is on ring central preference page

#---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/12245) ----------------------

  Scenario: Verify, the RingCentral preferences tab is displayed only when the RingCentral app is enabled
    When Verify ringCentral tab is displayed only when ringCentral app is installed

#---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/12246) ----------------------

  Scenario: Verify, the user is able to authorize ring central app
    When the user checks authorization of ring central app

#---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/12247) ----------------------

  Scenario: Verify, the RingCentral integration is user wise
    When 'User1' verifying ring central tab through 'User2' there should be no impact

#---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/12248) ----------------------

  Scenario: Verify, the user is able to remove RingCentral integration
    When Removing ring central app