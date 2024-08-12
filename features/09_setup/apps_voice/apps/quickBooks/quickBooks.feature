@skip_in_ci
# We don't have any paid account of QuickBooks
Feature: QuickBooks Integration 

    With the QuickBooks integration, the user can view information from QuickBooks in Salesmate, copy and link data 
    between the two systems, create new QuickBooks customers from Salesmate, create new QuickBooks estimates, 
    invoices and payments from Salesmate.

    Background: 
        Given the 'User1' is on apps page

    #---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/16738) ----------------------
    
    Scenario: The user is able to install the QuickBooks app
        Given the QuickBooks app is uninstalled
        When the user clicks on the Install button of QuickBooks app 
            And authorize the QuickBooks app with 'rapidops.company789@gmail.com' and 'Company78912rapid!' credentials
        Then the QuickBooks app should get installed 
    
    #---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/16739) ----------------------
    
    Scenario Outline: The user is able to update the QuickBooks Integration settings
        Given the QuickBooks app is installed
        When the user clicks on the Configure button of QuickBooks app
            And click on the '<option>' QuickBooks option
            And click on the Update button
        Then the QuickBooks settings should get updated with '<option>' option
    
    Examples:
        | option         | 
        | Everyone       | 
        | Selected Users |

    #---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/16740) ----------------------
    
    Scenario: It should redirect to the support page on click of the ‘Learn more’ link
        Given the QuickBooks app is installed
        When the user clicks on the Configure button of QuickBooks app
            And click on the Learn more link
        Then the system should redirect to the support page of QuickBooks app
    
    #---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/16741) ----------------------
    
    Scenario: The user is able to uninstall the QuickBooks app
        Given the QuickBooks app is installed
        When the user clicks on the Configure button of QuickBooks app
            And click on the Remove button
        Then the QuickBooks app should get uninstalled