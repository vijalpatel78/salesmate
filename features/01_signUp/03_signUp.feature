@regression_test_signup
Feature: Sign Up Feature

  Description: In this feature new link created with user details and verify that logged-in user and new user are able to
  verify default listing page,default views,default fields,default columns,default widgets of main modules
  after signUp process.

  Background:
    Given user with details 'new.user01@yopmail.com' and '1' is on 'https://automation.salesmate.io' link

#---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C20568) ----------------------------

  Scenario: Verify, the default widgets of main modules should be displayed after the signup
    When the default widgets of main modules should be displayed after the signup