@regression_test_setup @regression_test @apps_voice
Feature: Sales Revenue - Goal Management

    This app allow user to set a goal by amount for a sales team. Creating and motivating seles team towards clear 
    tangible, quantifiable performance goals sets the environment for a winning sales team. Track goals for any 
    period monthly / quarterly / yearly based on the set goal amount.

    Background: 
        Given the 'User1' is on apps page

    #---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/16819) ----------------------
    
    Scenario: The user is able to install the Sales Revenue app
        Given the Sales Revenue app is uninstalled
        When the user clicks on the Install button of Sales Revenue app 
        Then the Sales Revenue app should get installed 
    
    #---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/16820) ----------------------
    
    Scenario: The organization currency should be displayed on Sales Revenue - Goal Management page
        Given the Sales Revenue app is installed
        When the user goes on the Setup>Organization Details page and verify currency
            And the user goes on the Setup>Apps page
            And the user clicks on the Configure button of Sales Revenue app
        Then the organization currency should be displayed on Sales Revenue - Goal Management page
    
    #---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/16821) ----------------------
    
    Scenario: The active users should be displayed on Sales Revenue - Goal Management page
        Given the Sales Revenue app is installed
        When the user goes on the Setup>Users page and verified the active user list
            And the user goes on the Setup>Apps page
            And the user clicks on the Configure button of Sales Revenue app
        Then the active users should be displayed on Sales Revenue - Goal Management page
    
    #---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/16822) ----------------------
    
    Scenario Outline: The user is able to set a goal period
        Given the Sales Revenue app is installed
        When the user clicks on the Configure button of Sales Revenue app
            And click on the Change Period link
            And select Period: '<period>'
            And click on the Save button of period
        Then the goal period should set '<period>'
    
    Examples:
        | period    | 
        | Quarterly | 
        | Yearly    |
    
    #---------------------- Case:5 (http://testrails.rapidops.com/index.php?/cases/view/16823) ----------------------
    
    Scenario: The fiscal year should be considered while setting a yearly goal
        Given the Sales Revenue app is installed
        When the user goes on the Setup>Fiscal Year page and verify the year
            And the user goes on the Setup>Apps page
            And the user clicks on the Configure button of Sales Revenue app
            And select yearly period
        Then the yearly goal period should start with set fiscal year

    #---------------------- Case:6 (http://testrails.rapidops.com/index.php?/cases/view/16824) ----------------------

    Scenario Outline: The user is not able to enter an invalid won amount
        Given the Sales Revenue app is installed
        When the user clicks on the Configure button of Sales Revenue app
            And Amount: '<invalidAmount>'
        Then the system should give '<validation>' message

    Examples:
        | invalidAmount     | validation            | 
        | xxxx              | Number out of range   |
        | 1234567890123456  | Number out of range   |

    #---------------------- Case:7 (http://testrails.rapidops.com/index.php?/cases/view/16825) ----------------------

    Scenario: The user is able to set a goal by the amount for the multiple users 
        Given the Sales Revenue app is installed
        When the user clicks on the Configure button of Sales Revenue app
            And Amount : '100'
            And Amount : '200'
        Then the goal should set by the '100' and '200' amount for the multiple users 
    
    #---------------------- Case:8 (http://testrails.rapidops.com/index.php?/cases/view/16826) ----------------------
    @skip_in_ci
    Scenario: The 'Sales Goals' widget should get added on the default dashboard by setting a goal for the user
        Given the Sales Revenue app is installed
        When the user goes on the MyAccount>GeneralSettings page and get the logged-in user name
            And the user goes on the Setup>Apps page
            And the user clicks on the Configure button of Sales Revenue app
            And set goal with '150' amount for the logged-in user
        Then the Sales Goals widget should get added on the default dashboard

    #---------------------- Case:9 (http://testrails.rapidops.com/index.php?/cases/view/16827) ----------------------

    Scenario: The user is able to update a goal amount
        Given the Sales Revenue app is installed
        When the user clicks on the Configure button of Sales Revenue app
            And Amount: '57'
        Then the goal should get updated by the '57' amount
    
    #---------------------- Case:10 (http://testrails.rapidops.com/index.php?/cases/view/16828) ----------------------

    Scenario: The user is able to remove a goal amount
        Given the Sales Revenue app is installed
        When the user clicks on the Configure button of Sales Revenue app
            And remove the goal 
        Then the goal should get removed 

    #---------------------- Case:11 (http://testrails.rapidops.com/index.php?/cases/view/16829) ----------------------
    
    Scenario: The user is able to go to the report
        Given the Sales Revenue app is installed
        When the user clicks on the Configure button of Sales Revenue app
            And click on the Go to Goal Report link
        Then the system should redirect to the Sales Goal report

    #---------------------- Case:12 (http://testrails.rapidops.com/index.php?/cases/view/16830) ----------------------
    
    Scenario: The user is able to uninstall the Sales Revenue app
        Given the Sales Revenue app is installed
        When the user clicks on the Configure button of Sales Revenue app
            And click on the Remove button
        Then the Sales Revenue app should get uninstalled