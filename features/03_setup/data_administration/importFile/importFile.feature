@skip_in_ci
Feature: Import File

    The Salesmate allows user to import external data via file(CSV/Excel file). The Import wizard helps user to 
    import data from CSV/Excel file (XLS/XLSX) to Salesmate CRM. The user can import Contacts, Companies, Deals, 
    Activities records, and Notes in Salesmate through a CSV/Excel file (XLS/XLSX).

    Background: 
        Given the 'User1' is on Import File page
    
    #---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/17437) ----------------------

    Scenario: The dynamic module name should be displayed on the Import or Migrate Data screen
        When the user goes on the Setup>System Modules page and verify the all plural module name
            And the user goes on the Import File page
        Then the system should display a plural module name on the Import File page
    
    #---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/17436) ----------------------

    Scenario: If the user does not select any file then the ‘Next’ button should remain disabled
        When the user click on the Import using file
            And upload 'MissingRequiredData.csv' file
            And remove the uploaded file
        Then the Next button should remain as disabled
    
    #---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/17438) ----------------------

    Scenario Outline: The system should redirect to the support doc on click of the support link
        When the user click on the '<linkName>' link
        Then the system should redirect to the support doc of '<linkName>' link
    
    Examples:
        | linkName                                      | 
        | Learn more about import using a file          | 
        | Learn more about importing from another app   |
        | Learn more about how to import using an individual or grouped file. |
        | View import FAQs |
    
    #---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/17439) ----------------------
    
    Scenario: the user is able to download the sample file
        When the user click on the Import using file
            And click on the Download sample spreadsheet link
        Then the sample file of import should get downloaded
    
    #---------------------- Case:5 (http://testrails.rapidops.com/index.php?/cases/view/17441) ----------------------
    
    Scenario: The system should display validation message if a user uploads the wrong format of the file
        When the user click on the Import using file
            And upload 'WrongFileFormat.pdf' file
        Then the system should give 'Invalid file type' validation message and Next button should remain as disabled
    
    #---------------------- Case:6 (http://testrails.rapidops.com/index.php?/cases/view/17442) ----------------------
    
    Scenario: The system should display validation message if a user uploads file size more than 25mb
        When the user click on the Import using file
            And upload 'WrongFileSize.csv' file
        Then the system should give 'File is too big (74.84MiB). Max filesize: 25MiB.' validation message and Next button should remain as disabled
    
    #---------------------- Case:7 (http://testrails.rapidops.com/index.php?/cases/view/17443) ----------------------
    
    Scenario: The user is able to remove the uploaded file by clicking on ‘X’ button
        When the user click on the Import using file
            And upload 'MissingRequiredData.csv' file
            And remove the uploaded file
        Then the file should get removed and the Next button should remain as disabled
    
    #---------------------- Case:8 (http://testrails.rapidops.com/index.php?/cases/view/17482) ----------------------

    Scenario Outline: The user is able to import data via file
        When the user click on the Import using file
            And upload '<fileName>' file
            And click on the Next button of import
            And click on the Next button of import
            And add 'Auto Imported via File' tag
            And select 'Only when values present' option of How to handle blank columns during merge?   
            And click on the Start Import button
    Examples:
        | fileName              | 
        | ImportDataFile1.csv   |

    #---------------------- Case:9 (http://testrails.rapidops.com/index.php?/cases/view/17445) ----------------------

    Scenario: If 'Id' column is mapped then appropriate warning message should be shown
        When the user click on the Import using file
            And upload 'RecordID.csv' file
            And click on the Next button of import
        Then the system should display the warning message

    #---------------------- Case:10 (http://testrails.rapidops.com/index.php?/cases/view/17446) ----------------------
    
    Scenario: The system should display the validation message if user does not select the required field
        When the user click on the Import using file
            And upload 'MissingRequiredData.csv' file
            And click on the Next button of import
        Then the system should display the required validation message
    
    #---------------------- Case:11 (http://testrails.rapidops.com/index.php?/cases/view/17448) ----------------------

    Scenario: All module name should be listed on the ‘Select Field’ popup
        When the user goes on the Setup>System Modules page and verify the all plural module name
            And the user goes on the Import File page
            And the user click on the Import using file
            And upload 'samplefile.csv' file
            And click on the Next button of import
            And open the Select Field popup
        Then the system should display all module name
    
    #---------------------- Case:12 (http://testrails.rapidops.com/index.php?/cases/view/17449) ----------------------
    
    Scenario: The user is able to search & select field from the ‘Select Field’ pop up
        When the user click on the Import using file
            And upload 'samplefile.csv' file
            And click on the Next button of import
            And open the Select Field popup
            And click on the 'Contact' tab and select 'Name' field
        Then the system should display the selected 'Name' field
        When open the Select Field popup
            And click on the 'Company' tab and select 'Name' field
        Then the system should display the selected 'Name' field
        When open the Select Field popup
            And click on the 'Deal' tab and select 'Title' field
        Then the system should display the selected 'Title' field
        When open the Select Field popup
            And click on the 'Activity' tab and select 'Title' field
        Then the system should display the selected 'Title' field
        When open the Select Field popup
            And click on the 'Note' tab and select 'Note Content' field
        Then the system should display the selected 'Note Content' field
    
    #---------------------- Case:13 (http://testrails.rapidops.com/index.php?/cases/view/17450) ----------------------
    
    Scenario: The user is able to set the setting for 'Date and Time' fields
        When the user click on the Import using file
            And upload 'DateTime.csv' file
            And click on the Next button of import
            And click on the Select Date and Time option
            And select 'mm dd yyyy' date option
            And select '24 hours' time option
            And click on the Save button of popup
        Then the Date and Time field setting should get saved with 'mm dd yyyy' and '24 hours' options

    #---------------------- Case:14 (http://testrails.rapidops.com/index.php?/cases/view/17451) ----------------------
    
    Scenario: The user is able to create a new custom field
        When the user click on the Import using file
            And upload 'samplefile.csv' file
            And click on the Next button of import
            And open the Select Field popup
            And click on the Create New Field link
        Then the create new field popup should get opened
    
    #---------------------- Case:15 (http://testrails.rapidops.com/index.php?/cases/view/17452) ----------------------
    
    Scenario: The user is able to remove the selected field using ‘X’ icon
        When the user click on the Import using file
            And upload 'samplefile.csv' file
            And click on the Next button of import
            And remove the selected field
        Then the system should remove the selected field
    
    #---------------------- Case:16 (http://testrails.rapidops.com/index.php?/cases/view/17454) ----------------------
    
    Scenario: The active user list should be displayed on the Owner dropdown list
        When the user goes on the Setup>Users page and verified the active users list
            And the user goes on the Import File page
            And the user click on the Import using file
            And upload 'samplefile.csv' file
            And click on the Next button of import
            And click on the Next button of import
        Then the system should display the active user list on the Owner dropdown list
    
    #---------------------- Case:17 (http://testrails.rapidops.com/index.php?/cases/view/17455) ----------------------
    
    Scenario: The user is able to navigate on the previous screen via Back button
        When the user click on the Import using file
            And upload 'samplefile.csv' file
            And click on the Next button of import
            And click on the Back button of import
        Then the system should redirect to the upload file screen
            And click on the Back button of import
        Then the system should redirect to the import home screen 
    
    #---------------------- Case:18 (http://testrails.rapidops.com/index.php?/cases/view/17456) ----------------------
    
    Scenario: The previously imported files should be displayed on the Previous Imports grid
        When the user goes on the Previous Imports grid
        Then the system should display the imported file details
    
    #---------------------- Case:19 (http://testrails.rapidops.com/index.php?/cases/view/17457) ----------------------

    Scenario: The user is able to download the imported files
        When the user goes on the Previous Imports grid
            And download the imported file
        Then the imported files should get downloaded

    #---------------------- Case:20 (http://testrails.rapidops.com/index.php?/cases/view/17458) ----------------------

    Scenario: After clicking on the ‘details’ link from the Action column, the ‘Import Summary’ popup should get opened
        When the user goes on the Previous Imports grid
            And click on the Details link from the grid
        Then the Import Summary popup should get opened
    
    #---------------------- Case:21 (http://testrails.rapidops.com/index.php?/cases/view/17459) ----------------------

    Scenario: On click of the Created or Updated link, the popup should get opened 
        When the user goes on the Previous Imports grid
            And click on the Details link from the grid
            And click on the Created link
        Then the Records Created popup should get opened
        When click on the Details link from the grid
            And click on the Updated link
        Then the Records Updated popup should get opened
    
    #---------------------- Case:22 (http://testrails.rapidops.com/index.php?/cases/view/17461) ----------------------

    Scenario: The user is able to download the rejected records
        When the user goes on the Previous Imports grid
            And click on the Details link from the grid
            And click on the Download Rejected Records link
        Then the file of rejected records should get downloaded
    
    #---------------------- Case:23 (http://testrails.rapidops.com/index.php?/cases/view/17460) ----------------------

    Scenario: The user is able to revert the imported data
        When the user goes on the Previous Imports grid
            And click on the Revert link from the grid
            And click on the Yes button from the confirmation popup
        Then the imported data should get reverted
        Then revert other imported files through automation testing