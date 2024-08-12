@regression_test_company @regression_test
Feature: Company Module > Company Detail View > Add File

  Description: In this feature user is able to add file from company details view page and update file and can able to
               delete file and can manage other actions of files and can also check validations while entering invalid files

  Background:
    Given 'User1' is on the company listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C24551) --------------------------

  Scenario: As a User, Verify the UI of 'Attach a file'
    When user is on company details page > file tab
    Then verify the UI of file tab and check 'Drag and Drop files here or Click to upload' message

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C24552) --------------------------

  Scenario: As a User, Verify user able to upload the file by selecting the file from system folder
    When user is on company details page > file tab
    Then user is able to add a file 'datetime.csv' and verify 'File(s) uploaded successfully'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C24554) --------------------------

  Scenario: As a User, Verify 'Attach from Google Drive' button shows after installing google drive app in set up
    When user is on company details page > file tab
    Then verify 'Attach from Google Drive' button shows after installing google drive app in set up

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C24556) --------------------------

  Scenario: As a User, Verify user able to delete the uploaded file
    When user is on company details page > file tab
    Then verify user able to delete the uploaded file and check 'File deleted successfully' message

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C24557) --------------------------

  Scenario: As a User, Verify user able to upload the file by clicking on 'Attach' button
    When user is on company details page > file tab
    When user is able to add multiple files i.e; 'product.jpeg','users.pdf'
    Then user is able to add a file 'datetime.csv' and verify 'File(s) uploaded successfully'

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C24558) --------------------------

  Scenario: As a User, Verify user should not be able to upload the file by clicking on 'Cancel' button
    When user is on company details page > file tab
    Then verify user should not be able to upload the file 'users.pdf' by clicking on 'Cancel' button

#------------------------ Case:7 (http://testrails.rapidops.com/index.php?/cases/view/C24559) --------------------------

  Scenario: As a User, Verify timeline entry should get updated after file is attached
    When user is on company details page
    Then verify timeline entry should get updated after file is attached

#------------------------ Case:8 (http://testrails.rapidops.com/index.php?/cases/view/C24558) --------------------------

  Scenario: As a User, Verify the validation message when user click on 'Attach' file when no file is attached
    When user is on company details page > file tab
    Then warning message 'Please select at least one file for upload' should be displayed when no file is not uploaded

#------------------------ Case:9 (http://testrails.rapidops.com/index.php?/cases/view/C24558) --------------------------

  Scenario: As a User, Verify user able to download the image type file from the company timeline entry
    When user is on company details page
    Then verify user able to download the image type file from the company timeline entry

#------------------------ Case:10 (http://testrails.rapidops.com/index.php?/cases/view/C24558) --------------------------

  Scenario: As a User, Verify user able to see the csv/pdf type file from the company timeline entry
    When user is on company details page
    Then verify user able to see the pdf type file from the company timeline entry
    Then verify user able to see the csv type file from the company timeline entry

#------------------------ Case:11 (http://testrails.rapidops.com/index.php?/cases/view/C24558) --------------------------

  Scenario: As a User, Verify user able to delete the file from timeline entry
    When user is on company details page > file tab
    Then verify user able to delete the uploaded file and check 'File deleted successfully' message

#------------------------ Case:12 (http://testrails.rapidops.com/index.php?/cases/view/C24558) --------------------------

  Scenario: As a User, Verify I should be able to attach Filename with % sign (any special character)
    When user is on company details page > file tab
    Then user is able to add a file 'sample%.pdf' and verify 'File(s) uploaded successfully'

#------------------------ Case:13 (http://testrails.rapidops.com/index.php?/cases/view/C24558) --------------------------

  Scenario: As a User, Verify that I should be able to download Attached File having file name with % sign
    When user is on company details page
    Then verify user able to see the pdf type file from the company timeline entry