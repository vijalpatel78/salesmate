@regression_test_myAccount @regression_test

Feature: Access Key Feature

  Description: In this feature user will be able to copy access key,private key and session key and also navigate
             to api docs page and can regenerate new session key and verify access keys values through other
             user also.

  Background:
    Given the 'User1' is on access key page

#---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/11993) ----------------------

  Scenario: User able to copy access key,secret key and session key
    When User able to copy access key,secret key and session key

#---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/11994) ----------------------

  Scenario: User able to regenerate session key
    When User able to regenerate session key

#---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/11995) ----------------------

  Scenario: User able to open api docs link in other tab
    When User able to open api docs link in other tab

#---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/11996) ----------------------

  Scenario: Verify access key,private key,session key fields are readonly or not
    When Verify access key,private key,session key fields are readonly or not

#---------------------- Case:5 (http://testrails.rapidops.com/index.php?/cases/view/11997) ----------------------

  Scenario: Verifying access key feature through another user
    When Verifying access key feature through 'User1', 'User2'