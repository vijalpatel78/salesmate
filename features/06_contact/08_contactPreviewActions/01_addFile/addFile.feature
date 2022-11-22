@regression_test_contact @regression_test
Feature: Contact Module > Preview Page Actions > Add File

  Description: In this feature user adds single file and multiple files and also verifies validation of added files and
               user can be able to delete added files

  Background:
    Given 'User1' is on the contact listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C19282) --------------------------

  Scenario: Verify, the user is able to add a file
    When user is on preview > add file page
    And user is able to add a file 'datetime.csv' and verify 'File(s) uploaded successfully' notification message

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C19283) --------------------------

  Scenario: Verify, the user is able to add multiple files
    When user is on preview > add file page
    And user is able to add multiple files 'product.jpeg','users.pdf' and verify 'File(s) uploaded successfully'

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C19284) --------------------------

  Scenario Outline: Verify, the user is able to delete files
    When user is able to delete files '<fileName>' and verify '<notificationMessage>' message
    Examples:
      | fileName        | notificationMessage        |
      | datetime.csv    | File deleted successfully  |
      | product.jpeg    | File deleted successfully  |
      | users.pdf       | File deleted successfully  |

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C19285) --------------------------

  Scenario: Verify, the warning message should be displayed when any file is not uploaded
    When user is on preview > add file page
    And warning message as 'Please select at least one file for upload' should be displayed when no file is not uploaded