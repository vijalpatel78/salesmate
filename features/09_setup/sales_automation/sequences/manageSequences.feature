@regression_test_setup @regression_test @sales_automation
Feature: Sequences Feature

Description: In this feature,user will update sequence settings and verify settings with invalid data of sequence
             and also and verify redirection of specified links

  Background:
    Given the 'User1' is on sequences page

#---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/16645) -----------------------------

  Scenario: Verify, the user is able to update the sequence settings
    When the user is able to update the sequence settings
     | Execute on weekdays        | Disable      |
     | Enable Threading           | Disable      |
     | Delivery TimeZone          | Asia/Kolkata |
     | Contact TimeZone           | Disable      |
     | Unsubscribe                | Disable      |
     | Contact Completes Sequence | Enable       |
     | Access                     | Private      |
     | Throttling                 | Disable      |
     | Contact Adding             | Only Once    |
     | Multiple Sequences         | No           |
     | Office Email               | Disable      |
     | Email Reply                | Disable      |
     | Email Communication        | Disable      |
     | Stops On Text              | Disable      |
     | Stops On Deal Close        | Disable      |
     | Status                     |              |
     | Contact Sequence           |              |
     | Email Bounces              |              |
     | Contact Unsubscribes       |              |
     | Activity Completed         |              |
     | Sequence Email             |              |
     | Contact Mark               |              |
     | Amount Of Time             |              |
    Then click on update button and verify 'Updated successfully.' message
    When the user is able to update the sequence settings with following data:
      | Execute On Weekdays         | Enable                                |
      | Enable Threading            | Enable                                |
      | Delivery TimeZone           | Asia/Kolkata                          |
      | Contact TimeZone            | Enable                                |
      | UnSubscribe                 | Enable                                |
      | Contact Completes Sequence  | Enable                                |
      | Access                      | Public Read Only                      |
      | Throttling                  | Enable                                |
      | Contact Adding              | More than once, if not already active |
      | Multiple Sequences          | Yes                                   |
      | Office Email                | Enable                                |
      | Email Reply                 | Enable                                |
      | Email Communication         | Enable                                |
      | Stops On Text               | Enable                                |
      | Stops On Deal Close         | Enable                                |
      | Status                      | No answer                             |
      | Contact Sequence            | Contact Added                         |
      | Email Bounces               | Email Bounced                         |
      | Contact Unsubscribes        | Contact Unsubscribed                  |
      | Email                       | Email Delivered                       |
      | Activity                    | Activity Completed                    |
      | Sequence Email              | Email Replied                         |
      | Contact Mark                | Finished with no reply                |
      | Amount Of Time              | Finished with no reply after waiting  |
    And click on update button and verify 'Updated successfully.' message
    Then remove added tags of sequence settings

#---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/16646) -----------------------------

  Scenario: Verify, the user is able to enable the 'Contact completes sequence, with no reply after in x days' option
    When the user is able to enable the "Contact completes sequence, with no reply after in x days" option
     | Contact Completes Sequence | Enable        |
     | Duration                   | 7             |
     | Time Unit                  | Schedule Days |
    And click on update button and verify 'Updated successfully.'
   When the user is able to enable the "Contact completes sequence, with no reply after in x days" option
     | Contact Completes Sequence | Enable        |
     | Duration                   | 5             |
     | Time Unit                  | Days          |
   And click on update button and verify 'Updated successfully.'

#---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/16647) -----------------------------

  Scenario: Verify, the user is able to enable the 'Throttling' option
    When the user is able to enable the "Throttling" option
     | Throttling  | Enable  |
     | Time Limit  | 200     |
    And click on update and verify 'Updated successfully.'

#---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/16650) -----------------------------

  Scenario: Verify, the user is not able to enter invalid data in the '24 hour limit per user' text box
    When the user is not able to enter invalid data in the "24 hour limit per user" text box
     | Throttling  | Enable  |
     | Time Limit  | Text    |
    And verify validation message 'Should be maximum upto 1000'

#---------------------- Case:5 (http://testrails.rapidops.com/index.php?/cases/view/16651) -----------------------------

  Scenario: Verify, the user is not able to leave the '24 hour limit per user' field as blank
    When the user is not able to leave the "24 hour limit per user" field as blank
      | Throttling  | Enable  |
      | Time Limit  |         |
    And verify validation message 'This field is required'

#---------------------- Case:6 (http://testrails.rapidops.com/index.php?/cases/view/16648) -----------------------------

  Scenario: Verify, the user is able to enable the 'Out-Of-Office Settings' option
    When the user is able to enable the "Out-Of-Office Settings" option
     | Office Email  | Enable   |
     | Auto Resume   | Enable   |
     | Duration      | 7        |
     | Time Limit    | Days     |
    And click on update button and verify 'Updated successfully.' notification
    When the user is able to enable the "Out-Of-Office Settings" option
      | Office Email  | Enable        |
      | Auto Resume   | Enable        |
      | Duration      | 5             |
      | Time Limit    | Schedule Days |
    And click on update button and verify 'Updated successfully.' notification

#---------------------- Case:7 (http://testrails.rapidops.com/index.php?/cases/view/16649) -----------------------------

  Scenario: Verify, on click of the links, it should be redirected to the respective support page
    When user clicks on links,redirect to specified urls 'https://support.salesmate.io/hc/en-us/articles/360033396112-Email-Threading-with-Sequence','https://support.salesmate.io/hc/en-us/articles/360033759311-Sequence-Access-Visibility-and-Sharing-Policy','https://support.salesmate.io/hc/en-us/articles/360034223512-Sequence-Throttle'