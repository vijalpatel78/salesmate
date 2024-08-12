@regression_test_setup @regression_test @account_management
Feature: Set Fiscal Year

    The user can set a start month of the financial year. The fiscal start month affects the goals management.

    Background: 
        Given the 'User1' is on fiscal year page

    #---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/13301) ----------------------

    Scenario Outline: The user is able to set the fiscal year
        When the user select '<month>' month from the 'Fiscal year starts from' dropdown
            And click on the Update button
        Then the fiscal year should get set with a 'Updated successfully.' message
    
    Examples:
        | month | 
        | July  | 
        | May   |

    #---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/13302) ----------------------

    Scenario Outline: The user is able to search month from the 'Fiscal year starts from' dropdown
        When the user search '<validValue>' from the Fiscal year starts from dropdown
            Then the system should give 'matching records of' '<validValue>' for the Fiscal year starts from dropdown
        When the user search '<inValidValue>' from the Fiscal year starts from dropdown
            Then the system should give '' 'No results found' for the Fiscal year starts from dropdown

    Examples:
        | validValue | inValidValue |
        | ber        | test         |