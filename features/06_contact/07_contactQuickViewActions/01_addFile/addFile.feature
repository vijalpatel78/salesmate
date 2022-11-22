@regression_test_contact @regression_test
Feature: Contact Module > Quick View Page Actions > Add File

  Description: In this feature user adds single file and multiple files and also verifies validation of added files
               and user can be able to delete added files

  Background:
    Given 'User1' is on the contact listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C19282) --------------------------

  Scenario: Verify, the user is able to add a file
    When user is on contact details page > file tab
    When user is able to add a file 'datetime.csv' and verify 'File(s) uploaded successfully'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C19283) --------------------------

  Scenario: Verify, the user is able to add multiple files
    When user is on contact details page > file tab
    When user is able to add multiple files i.e; 'product.jpeg','users.pdf'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C19284) --------------------------

  Scenario Outline: Verify, the user is able to delete files
    When user is able to delete files '<fileName>' and verify '<notificationMessage>'
    Examples:
      | fileName        | notificationMessage        |
      | datetime.csv    | File deleted successfully  |
      | product.jpeg    | File deleted successfully  |
      | users.pdf       | File deleted successfully  |

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C19285) --------------------------

  Scenario: Verify, the warning message should be displayed when any file is not uploaded
    When user is on contact details page > file tab
    When warning message 'Please select at least one file for upload' should be displayed when no file is not uploaded