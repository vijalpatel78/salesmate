@skip_in_ci
Feature: Company Module > Preview Page > Related Tab > Files

  Description: In this feature user is able to add, update and manage activities

  Background:
    Given 'User1' is on the company listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C22718) --------------------------

  Scenario: As a User, Verify that When No File is attached it should display No File Attached yet message in the panel
    When user is on preview page > related tab
    Then verify that When No File is attached it should display "No file attached yet! let's attach one" message

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C22719) --------------------------

  Scenario: As a User, Verify 'Attach from Google Drive' button shows after installing google drive app in set up
    Then verify "Attach from Google Drive" button shows after installing google drive app under 'icon-ic_company' module

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C22720) --------------------------

  Scenario: As a User, Verify that user can upload any system file by clicking on drag and drop section
    When user is on preview page > related tab
    Then user can upload 'users.pdf' file by clicking on drag and drop section and verify 'File(s) uploaded successfully'

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C22723) --------------------------

  Scenario: As a User, Verify It should add File in to panel on the spot after we attach
    When user is on preview page > related tab
    Then verify It should add File in to panel on the spot after we attach

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C22722) --------------------------

  Scenario: As a User, Verify that If we click on the Attach button without adding a file it should display validation message
    When user is on preview page > related tab
    Then we click on the Attach button without adding a file it should display validation 'Please select at least one file for upload'

#------------------------ Case:7 (http://testrails.rapidops.com/index.php?/cases/view/C22724) --------------------------

  Scenario: As a User, Verify that After uploading a file if we click on the Cancel button it should terminate file upload process
    When user is on preview page > related tab
    Then uploading a 'users.pdf' file if we click on the Cancel button it should terminate file upload process

#------------------------ Case:8 (http://testrails.rapidops.com/index.php?/cases/view/C22725) --------------------------

  Scenario: As a User, Verify that I can expand - collapse File Panel
    When user is on preview page > related tab
    Then verify that I can expand - collapse File Panel