@regression_test_setup @regression_test @apps_voice
Feature: Won Deals - Goal Management

    This app allow user to set a goal by number of deal for a sales team. Creating and motivating seles team towards 
    clear tangible, quantifiable performance goals sets the environment for a winning sales team. Track goals for any 
    period monthly / quarterly / yearly based on the set goal by number of deal.

    Background: 
        Given the 'User1' is on apps page

    #---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/16845) ----------------------
    
    Scenario: The system should display dynamic module name on the Won Deals - Goal Management app
        When the user goes on the Setup>System Modules page and verifies the deal module name
            And the user goes on the Setup>Apps page
        Given the Won Deals app is uninstalled
        Then the system should display dynamic module name on the Won Deals - Goal Management app 
    
    #---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/16846) ----------------------
    
    Scenario: The user is able to install the Won Deals - Goal Management app
        Given the Won Deals app is uninstalled
        When the user clicks on the Install button of Won Deals app 
        Then the Won Deals app should get installed 

    #---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/16847) ----------------------
    
    Scenario: The active users should be displayed on the Won Deals - Goal Management app
        Given the Won Deals app is installed
        When the user goes on the Setup>Users page and verified the active users
            And the user goes on the Setup>Apps page
            And the user clicks on the Configure button of Won Deals app
        Then the active users should be displayed on the Won Deals - Goal Management app
    
    #---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/16848) ----------------------
    
    Scenario Outline: The user is able to set a goal period
        Given the Won Deals app is installed
        When the user clicks on the Configure button of Won Deals app
            And click on the Change Period link
            And select Period: '<period>'
            And click on the Save button of period
        Then the goal period should set '<period>' for the Won Deals app
    
    Examples:
        | period    | 
        | Quarterly | 
        | Yearly    |
    
    #---------------------- Case:5 (http://testrails.rapidops.com/index.php?/cases/view/16849) ----------------------
    
    Scenario: The fiscal year should be considered while setting a yearly goal
        Given the Won Deals app is installed
        When the user goes on the Setup>Fiscal Year page and verify the month of fiscal year 
            And the user goes on the Setup>Apps page
            And the user clicks on the Configure button of Won Deals app
            And select yearly period
        Then the yearly goal period should get started with set fiscal year

    #---------------------- Case:6 (http://testrails.rapidops.com/index.php?/cases/view/16850) ----------------------
    
    Scenario Outline: The user is not able to enter an invalid number of deal
        Given the Won Deals app is installed
        When the user clicks on the Configure button of Won Deals app
            And Deals: '<invalidNumberOfDeal>'
        Then the system should give '<validation>' message for deals field

    Examples:
        | invalidNumberOfDeal   | validation            | 
        | xxxx                  | Number out of range   |
        | 1234567890123456      | Number out of range   |

    #---------------------- Case:7 (http://testrails.rapidops.com/index.php?/cases/view/16851) ----------------------

    Scenario: The user is able to set a goal for the multiple users 
        Given the Won Deals app is installed
        When the user clicks on the Configure button of Won Deals app
            And Deals : '5'
            And Deals : '10'
        Then the won deals goal should set by the '5' and '10' deals for the multiple users 
    
    #---------------------- Case:8 (http://testrails.rapidops.com/index.php?/cases/view/16852) ----------------------
    @skip_in_ci
    Scenario: The 'Won Deals' widget should get added on the default dashboard by setting a goal for the user
        Given the Won Deals app is installed
        When the user goes on the MyAccount>GeneralSettings page and get the logged-in user full name
            And the user goes on the Setup>Apps page
            And the user clicks on the Configure button of Won Deals app
            And set goal with '7' deals for the logged-in user
        Then the Won Deals widget should get added on the default dashboard

    #---------------------- Case:9 (http://testrails.rapidops.com/index.php?/cases/view/16853) ----------------------
    
    Scenario: The user is able to update a goal
        Given the Won Deals app is installed
        When the user clicks on the Configure button of Won Deals app
            And Deals: '4'
        Then the won deals goal should get updated by the '4' deals
    
    #---------------------- Case:10 (http://testrails.rapidops.com/index.php?/cases/view/16854) ----------------------

    Scenario: The user is able to remove a goal 
        Given the Won Deals app is installed
        When the user clicks on the Configure button of Won Deals app
            And remove the deal goal 
        Then the deal goal should get removed 

    #---------------------- Case:11 (http://testrails.rapidops.com/index.php?/cases/view/16855) ----------------------
    
    Scenario: The user is able to go to the report
        Given the Won Deals app is installed
        When the user clicks on the Configure button of Won Deals app
            And click on the Go to Goal Report link
        Then the system should redirect to the Won Deals report

    #---------------------- Case:12 (http://testrails.rapidops.com/index.php?/cases/view/16856) ----------------------
    
    Scenario: The user is able to uninstall the Won Deals app
        Given the Won Deals app is installed
        When the user clicks on the Configure button of Won Deals app
            And click on the Remove button
        Then the Won Deals app should get uninstalled