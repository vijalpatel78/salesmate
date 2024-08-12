@regression_test_setup @regression_test @users_security
Feature: Users Feature

  Description: In this feature the user is able to add another new user and validates all fields with valid,
  invalid, duplicate, blank data while adding a new user and also user is able to deactivate the
  user with and without license

  Background:
    Given the 'User1' is on users page

#---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/13701) ----------------------

  Scenario: Verify, the user is able to add a new another user with all details
    When the user adds new another user with the following data:
      | First Name             | Eshwari                    |
      | Last Name              | NL                         |
      | Email                  | eshwarinl@gmail.com        |
      | Mobile                 | 6304799970                 |
      | Profile                | Standard                   |
      | IP Restriction         | 198.51.100.0               |
      | Role                   | CEO                        |
      | Nick Name              | Eeshu                      |
      | Date Of Birth          | Aug 10,1998                |
      | Date Of Anniversary    | Feb 24,2019                |
      | Phone                  | 9870321790                 |
      | Extension              | 1111                       |
      | Address Line1          | DR No.5-7/A                |
      | Address Line2          | Shanthi Street             |
      | Area                   | Jubilee Hills              |
      | City                   | Hyderabad                  |
      | State                  | Telangana                  |
      | Country                | India                      |
      | Zip Code               | 500033                     |
      | Email Signature        | Eshwari                    |
    And Click on save button and verify 'Created successfully.' message and navigate to other page and verify user details

#---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/13702) ----------------------

  Scenario: Verify, the user is able to add new another user with required details
    When the user adds new another user with required fields data only:
      | First Name             | Bhanu                      |
      | Last Name              | VG                         |
      | Email                  | bhanuluckyvg@gmail.com     |
      | Profile                | Standard                   |
      | Role                   | CEO                        |
    And Click on save button and verify 'Created successfully.' notification and navigate to other page and verify user details

#---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/13703) ----------------------

  Scenario: Verify, the user is not able to leave required fields as blank while adding a new another user
    When the user leave required fields as blank:
      | First Name |        |
      | Last Name  |        |
      | Email      |        |
    And verify 'This field is required.', 'This field is required.', 'This field is required.' validation message

#---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/13704) ----------------------

  Scenario: Verify, the user is not able to create a new another user with invalid data
    When the user add a new user with invalid data:
      | First Name | Saranya     |
      | Last Name  | R           |
      | Email      | test@$%123  |
    And verify validation 'Please provide a valid email address' message
    When the user enters exceed length of data
      | First Name             | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore. |
      | Last Name              | Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.    |
      | Mobile                 | 70986543201938678386578993949576574432289657501234356578797078854632838292827261819018274656120938475665784939010293847465556757507834252165579800998172535637848490876543210907651423245161718192019887276645567890987123456789009876543216578493021021987098777 |
      | Nick Name              | Enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.       |
      | Phone                  | 70986543201938678386578993949576574432289657501234356578797078854632838292827261819018274656120938475665784939010293847465556757507834252165579800998172535637848490876543210907651423245161718192019887276645567890987123456789009876543216578493021021987098777 |
      | Extension              | Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non predent. |
      | Address Line1          | Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Sint occaecat cupidatat     |
      | Address Line2          | Aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore |
      | Area                   | Lorem ipsum dolor sit amet, consectetur adipiscing elit |
      | City                   | Duis aute irure dolor in reprehenderit in voluptate     |
      | State                  | Excepteur sint occaecat cupidatat non proident          |
      | Zip Code               | 500033444776622888                                      |
    And verify 'First Name should be maximum 100 characters', 'Last Name should be maximum 100 characters', 'Mobile should be maximum 255 characters', 'Nick Name should be maximum 100 characters', 'Phone should be maximum 255 characters', 'Extension should be maximum 15 characters', 'Address Line 1 should be maximum 100 characters', 'Address Line 2 should be maximum 100 characters', 'Area should be maximum 25 characters', 'City should be maximum 25 characters', 'State should be maximum 20 characters', 'Pincode should be maximum 15 characters'

#---------------------- Case:5 (http://testrails.rapidops.com/index.php?/cases/view/13705) ----------------------

  Scenario: Verify, the user is not able to add another user with duplicate email address
    When the user enters duplicate email address
      | First Name  | Karishma                      |
      | Last Name   | Jk                            |
      | Email       | meghapatel1234.456@gmail.com  |
    And verify 'Someone from your organisation is already using this email.' validation message

#---------------------- Case:6,7 (http://testrails.rapidops.com/index.php?/cases/view/13706,13707) ----------------------

  Scenario: Verify, the system shows all profiles on the profile dropdown list and system shows all roles on the roles dropdown list
    When the system shows all profiles on the profile dropdown list
    When the system shows all roles on the roles dropdown list

#---------------------- Case:8 (http://testrails.rapidops.com/index.php?/cases/view/13708) ----------------------

  Scenario: Verify, the user is able to search users
    When the user is able to search users from active users tab,deactivated users tab and unconfirmed users tab and verify message on each tab
      | Active User                    |  Vijal          |
      | Non-Existing Active User       |  Shourya        |
      | Deactive User                  |  Inactive       |
      | Non-Existing Deactive User     |  Ashok          |
      | Unconfirmed User               |  Bhanu          |
      | Non-Existing Unconfirmed User  |  Vishal         |

#---------------------- Case:9 (http://testrails.rapidops.com/index.php?/cases/view/13709) ----------------------

  Scenario: Verify, the user is able to update user with all details
    When the user updates new another user with the following data:
      | First Name             | Bhanu                      |
      | Last Name              | VG                         |
      | Email                  | bhanuluckyvg@gmail.com     |
      | Mobile                 | 8341799970                 |
      | Profile                | Standard                   |
      | IP Restriction         | 198.51.100.0               |
      | Role                   | CEO                        |
      | Nick Name              | Bhanu                      |
      | Date Of Birth          | Apr 10,1998                |
      | Date Of Anniversary    | Oct 24,2019                |
      | Phone                  | 9440021347                 |
      | Extension              | 3333                       |
      | Address Line1          | DR No.8-7G/A               |
      | Address Line2          | Mayur Street               |
      | Area                   | Surya Nagar                |
      | City                   | Warangal                   |
      | State                  | Telangana                  |
      | Country                | India                      |
      | Zip Code               | 506001                     |
      | Email Signature        | bhanu                      |
    And click on save button and verify 'Updated successfully.' message and navigate to other page and verify user details

#---------------------- Case:10 (http://testrails.rapidops.com/index.php?/cases/view/13710) ----------------------

  Scenario: Verify, the user is able to update user with required details
    When the user update user with required details:
      | First Name             | Eshwari Sai                |
      | Last Name              | GK                         |
      | Email                  | eshwarisaigk@gmail.com     |
      | Profile                | Standard                   |
      | Role                   | CEO                        |
    And click on save button and verify 'Updated successfully.' notification and navigate to other page and verify user details

#---------------------- Case:11 (http://testrails.rapidops.com/index.php?/cases/view/13711) ----------------------

  Scenario: Verify, the user is not able to leave required fields as blank while updating a user details
    When the user is not able to leave required fields as blank while updating a user
      | First Name |        |
      | Last Name  |        |
      | Email      |        |
    And verify 'This field is required.', 'This field is required.', 'This field is required.' validation

#---------------------- Case:12 (http://testrails.rapidops.com/index.php?/cases/view/13712) ----------------------

  Scenario: Verify, the user is not able to update user details with invalid data
    When the user update a user with invalid data:
      | First Name | Saranya     |
      | Last Name  | R           |
      | Email      | test@$%123  |
    And verify email validation 'Please provide a valid email address' message
    When the user enters exceed length of data while updating
      | First Name             | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore. |
      | Last Name              | Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.    |
      | Mobile                 | 70986543201938678386578993949576574432289657501234356578797078854632838292827261819018274656120938475665784939010293847465556757507834252165579800998172535637848490876543210907651423245161718192019887276645567890987123456789009876543216578493021021987098777 |
      | Nick Name              | Enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.       |
      | Phone                  | 70986543201938678386578993949576574432289657501234356578797078854632838292827261819018274656120938475665784939010293847465556757507834252165579800998172535637848490876543210907651423245161718192019887276645567890987123456789009876543216578493021021987098777 |
      | Extension              | Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non predent. |
      | Address Line1          | Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Sint occaecat cupidatat     |
      | Address Line2          | Aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore |
      | Area                   | Lorem ipsum dolor sit amet, consectetur adipiscing elit |
      | City                   | Duis aute irure dolor in reprehenderit in voluptate     |
      | State                  | Excepteur sint occaecat cupidatat non proident          |
      | Zip Code               | 500033444776622888                                      |
    And verify messages 'First Name should be maximum 100 characters', 'Last Name should be maximum 100 characters', 'Mobile should be maximum 255 characters', 'Nick Name should be maximum 100 characters', 'Phone should be maximum 255 characters', 'Extension should be maximum 15 characters', 'Address Line 1 should be maximum 100 characters', 'Address Line 2 should be maximum 100 characters', 'Area should be maximum 25 characters', 'City should be maximum 25 characters', 'State should be maximum 20 characters', 'Pincode should be maximum 15 characters'

#---------------------- Case:13 (http://testrails.rapidops.com/index.php?/cases/view/13713) ----------------------

  Scenario: Verify, the user is not able to update another user with duplicate email address
    When the user enters duplicate email address while updating
      | First Name  | Nanditha                      |
      | Last Name   | PK                            |
      | Email       | meghapatel1234.456@gmail.com  |
    And verify email 'Someone from your organisation is already using this email.' validation message

#---------------------- Case:14 (http://testrails.rapidops.com/index.php?/cases/view/13714) ----------------------

  Scenario: Verify, the system shows first name as nick name on leaving nick name blank
    When the user leaves nick name field as blank
      | First Name  | Amulya Pidge              |
      | Last Name   | HL                        |
      | Email       | amulyapidgehl@gmail.com   |
      | Nick Name   |                           |
    Then system should display 'Created successfully.' and first name as nick name

#---------------------- Case:15 (http://testrails.rapidops.com/index.php?/cases/view/13715) ----------------------

  Scenario Outline: Verify, the user is able to set formatted email signature
    When the user click on '<format>' option with '<formatValue>' value and then enter '<emailSignatureText>'
    Then click on update button and verify 'Updated successfully.' message and navigate to other page and verify email signature
    Examples:
      | format       | formatValue   | emailSignatureText    |
      | Italic       |               | Bhanu VG              |

#---------------------- Case:16 (http://testrails.rapidops.com/index.php?/cases/view/13716) ----------------------

  Scenario: Verify, the user is able to re-invite unconfirmed user
    When the user is able to re-invite unconfirmed user and verify 'Re-verification email sent successfully' message

#---------------------- Case:17 (http://testrails.rapidops.com/index.php?/cases/view/13717) ----------------------
@skip_in_ci
  Scenario: Verify, the user is able to deactivate another user without releasing the licence
    When the user is able to deactivate another user without releasing the licence and verify 'User deactivated successfully' message

#---------------------- Case:18 (http://testrails.rapidops.com/index.php?/cases/view/13718) ----------------------
@skip_in_ci
  Scenario: Verify, the user is able to deactivate another user with releasing the licence
    When the user is able to deactivate another user with releasing the licence and verify 'User deactivated successfully' message

#---------------------- Case:19 (http://testrails.rapidops.com/index.php?/cases/view/13719) ----------------------

  Scenario: Verify, the user is able to deactivate another user and invite new user at the same time
    When the user is able to deactivate another user and invite new user at the same time
      | First Name  | Sowjanya              |
      | Last Name   | RVD                   |
      | Email       | sowjanyarvd@gmail.com |
    And verify 'User deactivated successfully' message

#---------------------- Case:20 (http://testrails.rapidops.com/index.php?/cases/view/13720) ----------------------

  Scenario Outline: Verify, the user is not able to deactivate another user with invite new user when new user details are not valid
    When the user enter invalid '<firstName>' '<lastName>' '<email>' of invite user and verify '<validationMessage>'
    Examples:
      | firstName | lastName | email                        | validationMessage       |
      |           | Test     | test@yopmail.com             | First Name is required  |
      | Test      |          | test@yopmail.com             | Last Name is required   |
      | Test      | Test     |                              | Email is required       |
      | Test      | Test     | ABC                          | Please provide a valid email address |
      | Test      | Test     | meghapatel1234.456@gmail.com | Someone from your organisation is already using this email. |

#---------------------- Case:21 (http://testrails.rapidops.com/index.php?/cases/view/13723) ----------------------

  Scenario: Verify, the user is able to transfer record ownership of deactivate user to another active user
    When the user is able to transfer record ownership of deactivate user to another active user
      | First Name  | Custom                   |
      | Last Name   | User                     |
      | Email       | customuser@yopmail.com   |
      | Contact     | Priyanka Vlr             |
      | Company     | Priyanka Vlr             |
      | Activity    | Custom User              |
      | Deal        | Custom User              |
    And verify 'User deactivated successfully' message after deactivation

#---------------------- Case:22 (http://testrails.rapidops.com/index.php?/cases/view/13724) ----------------------

  Scenario: Verify, the user is able to activate inactive user
    When the user is able to activate inactive user and verify 'User activated successfully' message

#---------------------- Case:23 (http://testrails.rapidops.com/index.php?/cases/view/13725) ----------------------

  Scenario: Verify, the user is able to delete unconfirmed user
    When the user is able to delete unconfirmed user and verify 'Deleted successfully.' message

#---------------------- Case:24 (http://testrails.rapidops.com/index.php?/cases/view/13726) ----------------------

  Scenario: Verify, the user is not able to delete active user
    When the user is not able to delete active user and verify 'User can not be deleted, as it is associated with some activities in the system' message