@skip_in_ci
# We skipped this feature as notifications page is not getting loaded
Feature: Notification Preference Feature

Description: In this feature user will be able to enable/disable notification preference options
             and sets daily digest email delivery time and re-enabling daily digest email remainder.

  Background:
    Given the 'User1' is on notification preference page

#---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/12173) ----------------------

  Scenario: Verify,the user is able to disable notification preferences
    When User disable all notification preferences
    Then After navigation disabled values should not change

#---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/12174) ----------------------

  Scenario: Verify,the user is able to enable notification preferences
    When User enable all notification preferences
    Then After navigation enabled values should not change

#---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/12175) ----------------------

  Scenario: Verify,an email alert is not available for Email Received,Email Opened/Link Clicked and Text Received notifications
    When Verifying email alert for email received,email opened and text received notifications

#---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/12176) ----------------------

  Scenario: Verify,the user is able to enable daily digest email reminder
    When Enabling daily digest email reminder

#---------------------- Case:5 (http://testrails.rapidops.com/index.php?/cases/view/12177) ----------------------

  Scenario Outline: Verify,the user is able to change the daily digest email delivery time
    When Setting daily digest email delivery time '<emailDeliveryTime>'
  Examples:
  | emailDeliveryTime |
  |   16:00 PM        |

#---------------------- Case:6 (http://testrails.rapidops.com/index.php?/cases/view/12178) ----------------------

  Scenario: Verify,the user is able to disable daily digest email reminder
    When Disabling daily digest email remainder

#---------------------- Case:7 (http://testrails.rapidops.com/index.php?/cases/view/12179) ----------------------

  Scenario Outline: Verify,on re-enabling digest email reminder, daily digest email delivery time is get maintained
    When Re-enabling digest email reminder and daily digest email delivery time is get maintained and check '<emailDeliveryTime>'
  Examples:
  | emailDeliveryTime |
  |   16:00 PM        |

#---------------------- Case:8 (http://testrails.rapidops.com/index.php?/cases/view/12180) ----------------------

  Scenario: Verifying notification preferences with another user
    When Verifying notification preferences through 'User1', 'User2'