@regression_test_contact @regression_test
Feature: Contact Module > Add Contact

  Description: In this feature user is able to enable/disable create contact toggle rights and manage added
               contact and verify validations for created contact

  Background:
    Given 'User1' is on the contact listing page

#------------------------ Case:1 (http://testrails.rapidops.com/index.php?/cases/view/C19871) --------------------------

  Scenario: Verify, As a User i can see '+ contact' button only if i have create new contact rights
    When verifying 'User2' when rights are disabled for right name of 'switch_Contact_add' through 'User1'
    Then add contact module is not visible and log in through 'User1'
    When verifying 'User2' when rights are enabled for right name of 'switch_Contact_add' through 'User1'
    Then add contact module is visible and log in through 'User1'

#------------------------ Case:2 (http://testrails.rapidops.com/index.php?/cases/view/C19872) --------------------------

  Scenario: Verify, As a User upon clicking on the button i should be able to see Add contact dialog
    When user on clicking Add Contact button should be able to see 'Add New Contact' dialog

#------------------------ Case:3 (http://testrails.rapidops.com/index.php?/cases/view/C19874) --------------------------

  Scenario: Verify, As a User I should be able to see Validation message for Mandatory fields upon focus out
    When user does not enter data on mandatory fields
     | First Name   |          |
     | Last Name    |          |
    Then check the validation 'First Name or Last Name is required' message

#------------------------ Case:4 (http://testrails.rapidops.com/index.php?/cases/view/C19874) --------------------------

  Scenario: Verify, As a User i should be able to see 255 character Validation message for first name and last name upon focus out
    When user enter exceed length data on all fields
     | First Name            | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit.|
     | Last Name             | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit.|
     | Mobile                | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit.|
     | Email                 | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit.|
     | Job Title             | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit.|
     | Phone                 | 6792239870005462343243232454554566778774832478567098765421234455667793567507657687657665421112321234554445455544445756757568979987868676656564345253434e54565687686757890987654321122345455676788900987654321235678890889786556436343534686778978675477565658965869           |
     | Other Phone           | 6792239870005462343243232454554566778774832478567098765421234455667793567507657687657665421112321234554445455544445756757568979987868676656564345253434e54565687686757890987654321122345455676788900987654321235678890889786556436343534686778978675477565658965869           |
     | Skype                 | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit.|
     | Website               | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore                                                                                                                                                                 |
     | Facebook              | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore                                                                                                                                                                 |
     | LinkedIn              | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore                                                                                                                                                                 |
     | Twitter               | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore                                                                                                                                                                 |
     | Instagram             | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit.|
     | Description           | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.|
     | Address Line1         | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit.|
     | Address Line2         | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit.|
     | City                  | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit.|
     | ZipCode               | 533467890467890001277                                                                                                                                                                                                                                                         |
     | State                 | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit.|
     | Country               | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit.|
     | Text Field            | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit.|
     | Integer               | 4567893210                                                                                                                                                                                                                                                                    |
     | Decimal               | 34567098712345656                                                                                                                                                                                                                                                             |
     | Email Field           | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit.|
     | Phone Field           | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit.|
     | URL                   | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit.|
     | Big Integer           | 546789321774771200                                                                                                                                                                                                                                                            |
     | Percentage            | 111                                                                                                                                                                                                                                                                           |
     | Currency              | 7890123456577789                                                                                                                                                                                                                                                              |
    Then check validation messages 'Should be maximum 255 characters','Should be maximum 100 characters','Should be maximum 2000 characters','Should be maximum 20 characters','Number should be between -2147483648 to 2147483647','Number should be between -999999999999999 to 999999999999999','Should be in between 0-100'

#------------------------ Case:5 (http://testrails.rapidops.com/index.php?/cases/view/C19877) --------------------------

  Scenario: Verify, As a User i should be able to see invalid email Validation
    When user is able to enter invalid email
     | Email   | xyz   |
    Then check email validation 'Email should be valid'

#------------------------ Case:6 (http://testrails.rapidops.com/index.php?/cases/view/C19878) --------------------------

  Scenario: Verify, As a User i should be able to create a new company using quick view
    When user is able to create a new company using quick view
     | Company Name  |  Radix  |
    Then verify quick view default fields

#------------------------ Case:7 (http://testrails.rapidops.com/index.php?/cases/view/C19879) --------------------------

  Scenario: Verify, As a User I should be able to search a company from company field to associate it in contact
    When user is able to search a company from company field to associate it in contact
     | Search Company Name  |  syn  |

#------------------------ Case:8 (http://testrails.rapidops.com/index.php?/cases/view/C19882) --------------------------

  Scenario: Verify, As a User It should display No result found if user searches a non-existing company name
    When user searches for non-existing company name
     | Non-Existing Company Name |  Abc  |
    Then system displays record message as 'No results found'

#------------------------ Case:9 (http://testrails.rapidops.com/index.php?/cases/view/C19883) --------------------------

  Scenario: Verify, As a User i should be able to perform Save and cancel button functionality of company quick view
    When user is able to perform Save button functionality of company quick view
     | Company Name  | Klm  |
    When user is able to perform Cancel button functionality of company quick view
     | Company Name  | Asfd  |

 #------------------------ Case:10 (http://testrails.rapidops.com/index.php?/cases/view/C19884) ------------------------

  Scenario: Verify, As a User i should be able Verify Save and cancel button functionality of create new contacts
    When user is able to verify Save and cancel button functionality of create new contacts
      | First Name            | Contact                                     |
      | Last Name             | 2                                           |
      | Mobile                | 954321097                                   |
      | Email                 | lucky.priya369@gmail.com                    |
      | Job Title             | Quality Analyst                             |
      | Phone                 | 7809652598                                  |
      | Other Phone           | 8341038772                                  |
      | Owner                 | Vijal Patel                                 |
      | Type                  | Vendor                                      |
      | Email Opt Out Checkbox| Enable                                      |
      | Email Opt Out Reason  | Due to lots of email receiving              |
      | SMS Opt Out           | Enable                                      |
      | Time Zone             | Asia/Singapore                              |
      | Skype                 | Marissa P                                   |
      | Website               | https:://contacts.com                       |
      | Facebook              | lucky vienna                                |
      | LinkedIn              | vienna thomas                               |
      | Twitter               | vienna tomei                                |
      | Instagram             | thomas vienna                               |
      | Description           | This contact contains emails and open deals |
      | Tags                  | Contact                                     |
      | Address Line1         | Door Number:5-401                           |
      | Address Line2         | Main Road                                   |
      | City                  | Banglore                                    |
      | ZipCode               | 533217                                      |
      | State                 | Karnataka                                   |
      | Country               | India                                       |
      | Text Field            | Contact Details                             |
      | Text Area             | Contact details are mandatory               |
      | Integer               | 45678932                                    |
      | Decimal               | 345670987                                   |
      | Date                  | Feb 03, 2021                                |
      | Date And Time         | Jan 07, 2021 07:17 AM                       |
      | Email Field           | xyz123@gmail.com                            |
      | Phone Field           | 7890321678                                  |
      | Select Field          | S2                                          |
      | Multi Select Field    | M1                                          |
      | URL                   | https:://details.com                        |
      | Big Integer           | 546789321                                   |
      | Percentage            | 99                                          |
      | Boolean               | Enable                                      |
      | Currency field        | 789012345                                   |
    Then check 'Contact Created' message and verify view details
    When user is able to create a contact
     | First Name  | Contact        |
     | Last Name   | 3              |
     | Text Field  | Sample Contact |
    Then check 'Contact Created' message and verify close details

#------------------------ Case:11 (http://testrails.rapidops.com/index.php?/cases/view/C19885) -------------------------

  Scenario: Verify, As a User i should be able to verify Save and Add other button functionality of create new contacts
    When user is able to verify Save and Add other button functionality of create new contacts
     | First Name            | Contact                                     |
     | Last Name             | 4                                           |
     | Mobile                | 954321697                                   |
     | Email                 | vijal.patel@rapidops.com                    |
     | Job Title             | Quality Analyst                             |
     | Phone                 | 7809682598                                  |
     | Other Phone           | 8349038772                                  |
     | Owner                 | Vijal Patel                                 |
     | Type                  | Vendor                                      |
     | Email Opt Out Checkbox| Enable                                      |
     | Email Opt Out Reason  | Due to lots of email receiving              |
     | SMS Opt Out           | Enable                                      |
     | Time Zone             | Asia/Singapore                              |
     | Skype                 | Marissa P                                   |
     | Website               | https:://contacts.com                       |
     | Facebook              | lucky vienna                                |
     | LinkedIn              | vienna thomas                               |
     | Twitter               | vienna tomei                                |
     | Instagram             | thomas vienna                               |
     | Description           | This contact contains emails and open deals |
     | Tags                  | Contact                                     |
     | Address Line1         | Door Number:5-401                           |
     | Address Line2         | Main Road                                   |
     | City                  | Banglore                                    |
     | ZipCode               | 533217                                      |
     | State                 | Karnataka                                   |
     | Country               | India                                       |
     | Text Field            | Contact Details                             |
     | Text Area             | Contact details are mandatory               |
     | Integer               | 45678932                                    |
     | Decimal               | 345670987                                   |
     | Date                  | Feb 03, 2021                                |
     | Date And Time         | Jan 07, 2021 07:17 AM                       |
     | Email Field           | xyz123@gmail.com                            |
     | Phone Field           | 7890321678                                  |
     | Select Field          | S2                                          |
     | Multi Select Field    | M1                                          |
     | URL                   | https:://details.com                        |
     | Big Integer           | 546789321                                   |
     | Percentage            | 99                                          |
     | Boolean               | Enable                                      |
     | Currency field        | 789012345                                   |
    And check 'Contact Created' message

#------------------------ Case:12 (http://testrails.rapidops.com/index.php?/cases/view/C19886) -------------------------

  Scenario: Verify, As a User It should redirect to contact detail page if interface preference toggle is on
    When user it should redirect to contact detail page if interface preference toggle is on
     | First Name  | Contact         |
     | Last Name   | 5               |
     | Text Field  | Contact Details |
     | Owner       | Vijal Patel     |

#------------------------ Case:14 (http://testrails.rapidops.com/index.php?/cases/view/C19888) -------------------------

  Scenario: Verify, As a User It should show me validation message upon clicking on Manage fields when i don't have rights to manage layout
    When verifying 'User2' when rights are disabled for right name of '406' through 'User1'
    Then system shows validation message upon clicking on "Manage Fields" of 'Contact' under 'icon-ic_contacts' module and log in through 'User1'

#------------------------ Case:13 (http://testrails.rapidops.com/index.php?/cases/view/C19887) -------------------------

  Scenario: Verify, As a User i should be able to move to contact Layout page upon clicking on Manage fields
    When verifying 'User2' when rights are enabled for right name of '409' through 'User1'
    Then user is able to move to 'icon-ic_contacts' Layout page and click 'Contact' and log in through 'User1'

#------------------------ Case:15 (http://testrails.rapidops.com/index.php?/cases/view/C19889) -------------------------

  Scenario: Verify, As a User i should be able to close dialog upon clicking on close button
    When user is able to close 'Contact' dialog upon clicking on close button

#------------------------ Case:16 (http://testrails.rapidops.com/index.php?/cases/view/C19890) -------------------------

  Scenario: Verify, As a User I should be able to see Active currencies only in currency dropdown
    When user is able to see Active currencies only in currency dropdown
    Then verify active currencies of 'Contact' under 'icon-ic_contacts' module

#------------------------ Case:17 (http://testrails.rapidops.com/index.php?/cases/view/C19891) -------------------------

  Scenario: Verify, As a User I should be able to see timeline entry for contact creation
    When user is able to see timeline entry for contact creation