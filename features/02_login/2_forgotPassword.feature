@regression_test_login @regression_test
Feature: Forgot Password
  
    If the user gets forgot his Salesmate password, then he can set a new Salesmate password
    by entering a valid email address

    Background:
      Given the user is on forgot password page

    #--------------------------------------- Case:1 (C6947) ---------------------------------------

    Scenario Outline: It should not allow to do forgot password when an email address is invalid
      When the user enter Email:'<invalidEmail>'
      And click on the Reset My Password button
      Then the system should give '<validation>' message on the 'Salesmate_Forgot_Password' page for '<case>' case

      Examples:
      | case                  | invalidEmail                    | validation     |
      | Invalid Email Format  | xyz@yop                         | Please enter valid email address |
      | Invalid User          | vijal.patel@gmail.com           | No such user found |
    
    #--------------------------------------- Case:2 (C6946) ---------------------------------------

    Scenario: It should allow to do forgot password when an email address is valid
      When the user enter Email:'validEmail'
      And click on the Reset My Password button
      Then an email to reset password should be sent on an entered email address