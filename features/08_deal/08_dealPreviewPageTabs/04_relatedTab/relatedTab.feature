@regression_test_deal @regression_test
Feature: Deal Module > Preview Page > Related Tab

  Description: In this feature user is able to check the related tab

  Background:
    Given 'User1' is on the deal listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C27690) --------------------------

  Scenario: As a User, Verify the UI of 'Related Tab'
    When user is on deal preview page
    When user is on 'Related' Tab
    Then verify the UI of "Related Tab"
    Then user closes quick view page

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C27691) --------------------------

  Scenario: As a User, Verify that When No Activity is attached to Particular Deal it should display 'No Activity' Found message
    When user is on deal preview page
    When user is on 'Related' Tab
    When verify that When No Activity is attached it should display "No Activity yet! let's create one" message
    Then user closes quick view page

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C27693) --------------------------

  Scenario: As a User, Verify that Upon clicking on save button it should add Activity to Activity panel on the spot
    When user is on deal preview page
    When user is on 'Related' Tab
    Then verify that Upon clicking on save button it should add Activity to Activity Panel on the spot
      | Title       | Activity 01      |
    Then check notification message as 'Activity added successfully'
    Then user closes quick view page

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C27694) --------------------------

  Scenario: As a User, Verify that when adding a new Activity it should increase an Activity count in the activity panel
    When user is on deal preview page
    When user is on 'Related' Tab
    When verify that when adding a new Activity it should increase a Activity count in Activity Panel
    Then user closes quick view page

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C27695) --------------------------

  Scenario: As a User, Verify that I can expand - collapse Activity Panel
    When user is on deal preview page
    When user is on 'Related' Tab
    When verify that I can expand - collapse Activity Panel
    Then user closes quick view page

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C27696) --------------------------

  Scenario: As a user, Verify that Activity can be removed/ disassociate from deal by the remove option on Activity card in Activity widget
    When user is on deal preview page
    When user is on 'Related' Tab
    When verify that Activity can be removed disassociate from 'icon-ic_company' by the remove option on Activity card
    Then check notification message as 'Activity deleted successfully'
    Then user closes quick view page

#------------------------ Case:7 (http://testrails.rapidops.com/index.php?/cases/view/C27697) --------------------------

  Scenario: As a User, Verify that upon clicking on the Activity name link it should open Activity quick view
    When user is on deal preview page
    When user is on 'Related' Tab
    When verify that upon clicking on the Activity name link it should open Activity quick view
    Then user closes quick view page

#------------------------ Case:8 (http://testrails.rapidops.com/index.php?/cases/view/C27698) --------------------------

  Scenario: As a User, Verify that When No File is attached to a particular deal then It should display 'No File Attached yet! let's attach one'
    When user is on deal preview page
    When user is on 'Related' Tab
    When verify that When No File is attached it should display "No file attached yet! let's attach one" message
    Then user closes quick view page

#------------------------ Case:9 (http://testrails.rapidops.com/index.php?/cases/view/C27001) --------------------------

  Scenario: As a User, Verify that I can upload a system file
    When user is on deal preview page
    When user is on 'Related' Tab
    When user can upload 'users.pdf' file by clicking on drag and drop section and verify 'File(s) uploaded successfully'
    Then user closes quick view page

#------------------------ Case:12 (http://testrails.rapidops.com/index.php?/cases/view/C27004) --------------------------

  Scenario: As a User, Verify that After uploading a file if we click on the Cancel button it should terminate the file upload process
    When user is on deal preview page
    When user is on 'Related' Tab
    When verify It should add File in to panel on the spot after we attach
    Then user closes quick view page

#------------------------ Case:10 (http://testrails.rapidops.com/index.php?/cases/view/C27002) --------------------------

  Scenario: As a User, Verify that If we click on the Attach button without adding a file it should display a validation message
    When user is on deal preview page
    When user is on 'Related' Tab
    When we click on the Attach button without adding a file it should display validation 'Please select at least one file for upload'
    Then user closes quick view page

#------------------------ Case:11 (http://testrails.rapidops.com/index.php?/cases/view/C27003) --------------------------

  Scenario: As a User, Verify It should add File into the panel on the spot after we attach
    When user is on deal preview page
    When user is on 'Related' Tab
    When verify It should add File in to panel on the spot after we attach
    Then user closes quick view page

#------------------------ Case:13 (http://testrails.rapidops.com/index.php?/cases/view/C27005) --------------------------

  Scenario: As a User, Verify that I can expand - collapse File Panel
    When user is on deal preview page
    When user is on 'Related' Tab
    When verify that I can expand - collapse File Panel
    Then user closes quick view page

#------------------------ Case:14 (http://testrails.rapidops.com/index.php?/cases/view/C27009) --------------------------

  Scenario: As a User, Verify that When No Product is associated with a particular deal It should display a 'No Product found' message
    When user is on deal preview page
    When user is on 'Related' Tab
    When No Product is associated with a particular deal It should display a "No Product found" message
    Then user closes quick view page

#------------------------ Case:15 (http://testrails.rapidops.com/index.php?/cases/view/C27011) --------------------------

  Scenario: As a User, Verify that Upon clicking on the save button it should add the product to the Associated Product panel on the spot
    When user is on deal preview page
    When user is on 'Related' Tab
    When clicking on save button it should add the product to the Associated Product panel on the spot
    Then user closes quick view page