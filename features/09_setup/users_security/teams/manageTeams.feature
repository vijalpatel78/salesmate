@regression_test_setup @regression_test @users_security 
Feature: Manage Teams 

    The team is a group of users that work together to achieve some common goals. Salesmate allows you to organize 
    your users into teams for reporting and maintaining organization structure for some quick actions.

    Background: 
        Given the 'User1' is on teams page and he is Admin user
        
    #---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/13546) ----------------------
    
    Scenario: The user is able to create a new team with all details
        When the user click on the Add Team button
            And the Create Team popup gets opened
            And the user fills the following details:
                | Name          | Cus_Team_01                   |
                | Description   | Cus_Team_Description          |
                | Team Manager  | Select from the excel file    |
                | Teammates     | Select from the excel file    |
                # Instead of 'Select from the excel file', you can provide active user full name. Ex: Vijal Patel
                # For Teammates, you can provide multiple active user full name separated by comma(,). Ex: Vijal Patel, Test Patel
            And clicks on the Save button
        Then the new team should get added with 'Created successfully.' message
            And the team details should be same as provided details on the list page
            And the team details should be same as provided details on the team details view popup
            And the team details should be same as provided details on the edit team details popup
    
    #---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/13547) ----------------------
    
    Scenario: The user is able to create a new team with required details only
        When the user click on the Add Team button
            And the Create Team popup gets opened
            And the user fills the following details:
                | Name          | Cus_Team_02                   |
                | Description   | Cus_Team_Description_02       |
                | Team Manager  | Select from the excel file    |
                | Teammates     | Select from the excel file    |
                # Instead of 'Select from the excel file' for the Teammates, you can provide multiple active user full name separated by comma(,). Ex: Vijal Patel, Test Patel
            And clicks on the Save button
        Then the new team should get added with 'Created successfully.' message  
            And the team details should be same as provided details on the list page
            And the team details should be same as provided details on the team details view popup
            And the team details should be same as provided details on the edit team details popup
    
    #---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/13548) ----------------------
    
    Scenario: The user is not able to leave required fields as blank while creating a new team
        When the user click on the Add Team button
            And the Create Team popup gets opened
            And leave Name field as blank
            And clicks on the Save button
        Then the system should give 'Team name is required' validation for the Name field 
        When the user click on the Add Team button
            And leave Teammates field as blank 
            And clicks on the Save button
        Then the system should give 'Please add at least one teammate.' validation for the Teammates field 
    
    #---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/13549) ----------------------
    
    Scenario: The user is not able to create a team with duplicate name
        When the user click on the Add Team button
            And the Create Team popup gets opened
            And enter Name: 'Cus_Team_02'
            And enter Teammates: 'Select from the excel file'
            # Instead of 'Select from the excel file', you can provide active user full name. Ex: Vijal Patel
            And clicks on the Save button
        Then the system should give 'Team already exists with the given name' duplication validation message

    #---------------------- Case:5 (http://testrails.rapidops.com/index.php?/cases/view/13550) ----------------------
    
    Scenario: The user is not able to create a team with invalid data
        When the user click on the Add Team button
            And the Create Team popup gets opened
            And enter Name: 'more than 100 chars'
            And enter Teammates: 'Select from the excel file'
            # Instead of 'Select from the excel file', you can provide active user full name. Ex: Vijal Patel
            And clicks on the Save button
        Then the system should give '\"name\" length must be less than or equal to 100 characters long' length validation message for the Name field 
        When the user enter Description: 'more than 255 chars'
            And enter Name: 'Test'
            And clicks on the Save button
        Then the system should give '\"description\" length must be less than or equal to 255 characters long' length validation message for the Description field 

    #---------------------- Case:6 (http://testrails.rapidops.com/index.php?/cases/view/13551) ----------------------
    
    Scenario: The system should not display inactive users for the Manager and Teammates fields
        When the user click on the Add Team button
            And the Create Team popup gets opened
            And open Manager dropdown
        Then the system should not display inactive users for the Manager field
            And when the user search inactive users from the Teammates field then the system should not display inactive users 
    
    #---------------------- Case:7 (http://testrails.rapidops.com/index.php?/cases/view/13553) ----------------------
    
    Scenario: The user is able to update all details of the team
        When the user click on the Edit button from the 'Cus_Team_02' team
            And the user fills the following details:
                | Name          | Cus_Team_Updated_02                   |
                | Description   | Cus_Team_Description_Updated          |
                | Team Manager  | Select from the excel file (Updated)  |
                | Teammates     | Select from the excel file (Updated)  |
                # Instead of 'Select from the excel file (Updated)', you can provide active user full name. Ex: Vijal Patel
                # For Teammates, you can provide multiple active user full name separated by comma(,). Ex: Vijal Patel, Test Patel
            And clicks on the Save button
        Then the team details should get updated with 'Updated successfully.' message  
            And the team details should be same as provided details on the list page
            And the team details should be same as provided details on the team details view popup
            And the team details should be same as provided details on the edit team details popup
    
    #---------------------- Case:8 (http://testrails.rapidops.com/index.php?/cases/view/13554) ----------------------
    
    Scenario: The user is able to update team details with required fields 
        When the user click on the Edit button from the 'Cus_Team_01' team
            And the user fills the following details:
                | Name          | Cus_Team_Updated_01                   |
                | Description   | Cus_Team_Description                  |
                | Team Manager  | Select from the excel file (Updated)  |
                | Teammates     | Select from the excel file (Updated)  |
                # Instead of 'Select from the excel file (Updated)', you can provide active user full name. Ex: Vijal Patel
                # For Teammates, you can provide multiple active user full name separated by comma(,). Ex: Vijal Patel, Test Patel
            And clicks on the Save button
        Then the team details should get updated with 'Updated successfully.' message  
            And the team details should be same as provided details on the list page
            And the team details should be same as provided details on the team details view popup
            And the team details should be same as provided details on the edit team details popup
    
    #---------------------- Case:9 (http://testrails.rapidops.com/index.php?/cases/view/13555) ----------------------
    
    Scenario: The user is not able to leave required fields as blank while updating team details
        When the user click on the Edit button from the 'Cus_Team_Updated_01' team
            And leave Teammates field as blank 
            And clicks on the Save button
        Then the system should give 'Please add at least one teammate.' validation for the Teammates field 
        When the user click on the Edit button from the 'Cus_Team_Updated_01' team
            And leave Name field as blank
            And clicks on the Save button
        Then the system should give 'Team name is required' validation for the Name field 
    
    #---------------------- Case:10 (http://testrails.rapidops.com/index.php?/cases/view/13556) ----------------------
    
    Scenario: The user is not able to update team details with duplicate name
        When the user click on the Edit button from the 'Cus_Team_Updated_01' team
            And enter Name: 'Cus_Team_Updated_02'
            And clicks on the Save button
        Then the system should give 'Team already exists with the given name' duplication validation message

    #---------------------- Case:11 (http://testrails.rapidops.com/index.php?/cases/view/13557) ----------------------
    
    Scenario: The user is not able to update team details with invalid data
        When the user click on the Edit button from the 'Cus_Team_Updated_01' team
            And enter Name: 'more than 100 chars'
            And clicks on the Save button
        Then the system should give '\"name\" length must be less than or equal to 100 characters long' length validation message for the Name field 
        When the user enter Description: 'more than 255 chars'
            And enter Name: 'Test'
            And clicks on the Save button
        Then the system should give '\"description\" length must be less than or equal to 255 characters long' length validation message for the Description field 

    #---------------------- Case:12 (http://testrails.rapidops.com/index.php?/cases/view/13558) ----------------------
    
    Scenario: The user is able to deactivate an active team
        When the user click on the Deactivate button from the 'Cus_Team_Updated_01' team
            And click on the 'Yes' button
        Then the 'Cus_Team_Updated_01' team should get deactivated with	'Team deactivated successfully.' message
    
    #---------------------- Case:13 (http://testrails.rapidops.com/index.php?/cases/view/13561) ----------------------
    
    Scenario: The user with other than admin profile is not able to manage teams settings
        When the user with 'Standard' profile do Salesmate login
            And goes on the Setup>Teams page
        Then the system should not display Add, Edit, Deactivate, Reactivate and Delete buttons to the 'Standard' profile 

    #---------------------- Case:14 (http://testrails.rapidops.com/index.php?/cases/view/13559) ----------------------

    Scenario: The user is able to reactivate an inactive team
        When the user click on the Inactive tab button
            And click on the Reactivate button from the 'Cus_Team_Updated_01' team
        Then the 'Cus_Team_Updated_01' team should get reactivated with	'Team reactivated successfully.' message
    
    #---------------------- Case:15 (http://testrails.rapidops.com/index.php?/cases/view/13560) ----------------------
    
    Scenario Outline: The user is able to delete an inactive team
        When the user click on the Active tab button
            And the user click on the Deactivate button from the '<existingName>' team
            And click on the 'Yes' button
            And the user click on the Inactive tab button
            And click on the Delete button from the '<existingName>' team
            And click on the 'Yes' button
        Then the '<existingName>' team should get deleted with	'Deleted successfully.' message
    
    Examples:
        | existingName              |     
        | Cus_Team_Updated_01       |
        | Cus_Team_Updated_02       |