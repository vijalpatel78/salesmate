@regression_test_signup
Feature: Sign Up Feature

  Description: In this feature new link created with user details and verify that logged-in user and new user are able to
               verify default listing page,default views,default fields,default columns,default widgets of main modules
               after signUp process.

    Background:
      Given the user with 'automation03@yopmail.com' and '1' is on 'https://automation02.salesmate.io' link

#---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C20569) ----------------------------

  Scenario Outline: Verify, the default list page of main modules should be displayed after the signup
    When the default list page '<expectedUrl>' of main '<moduleName>' should be displayed after the signup
    Examples:
     | moduleName  | expectedUrl         |
     | contacts    | app/contacts/list   |
     | company     | app/companies/list  |
     | activity    | app/tasks/list      |
     | deal        | app/deals/board     |
     | product     | app/products/list   |

#---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C20568) ----------------------------

  Scenario Outline: Verify, the default view of main modules should be selected after the signup
    When the default '<expectedDefaultView>' of main '<moduleName>' should be selected after the signup
    Examples:
     | moduleName  | expectedDefaultView  |
     | contacts    | All Contacts         |
     | company     | All Companies        |
     | activity    | My Open Activities   |
     | deal        | My Open Deals        |
     | product     | All Products         |

#---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C20570) ----------------------------

  Scenario: Verify, the default fields of main modules should be displayed after the signup
    When Verifying the default fields of main modules should be displayed after the signup

#---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C20587) ----------------------------

  Scenario: Verify, the default columns of main modules should be displayed after the signup
    When the default columns of main modules should be displayed after the signup

#---------------------- Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C20567) ----------------------------

  Scenario: Verify, the default widgets of main modules should be displayed after the signup
    When the default widgets of main modules should be displayed after the signup