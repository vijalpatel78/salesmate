@regression_test_setup @regression_test @account_management
Feature: Manage Organization Details

    Manage general company/organization information like communication details, address along with organization timezone,
    default currency, currency format, and email disclaimer. The Default Currency in the set format will be used to display
    Sales figures throughout the system. All conversations in the system will be listed according to the company timezone
    unless a user timezone is exclusively set in the user profile. The Company Disclaimer will be added to the footer of
    each and every mail firing from Salesmate E-Mailing system.

    Background:
        Given the 'User1' is on organization details page

    #--------------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/13090) ---------------------------

    Scenario: The user is able to update organization details
        When the user update organization details with the following valid data:
            | Name                          | Rapidops Inc.             |
            | Organization Code             | RIIT                      |
            | Corporate Identity No.        | 123-333-112-1234          |
            | Phone                         | +91 765-521-9345          |
            | Email                         | automated@rapidops.com    |
            | Fax                           | +91 41 444-5555           |
            | Website                       | www.rapidops.com          |
            | Address Line 1                | 303-9 City Center         |
            | Address Line 2                | Science City Road         |
            | Area                          | Sola                      |
            | City                          | Ahmedabad                 |
            | State                         | Gujarat                   |
            | Zip Code                      | 380060                    |
            | Country                       | India                     |
            | Time Zone                     | Africa/Bamako             |
            | Default Currency              | INR                       |
            | Currency Format               | {{amount}} {{symbol}}     |
            | Disclaimer                    | © 2020 Rapidops Inc.      |
        And click on the Update button
        Then the details of organization details should get updated

    #--------------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/13091) ---------------------------

    Scenario: The user is able to leave optional fields of organization details as blank
        When the user doesn't enter any value to the optional field
        And click on the Update button
        Then the organization details should get updated and the optional fields should be displayed as blank

    #--------------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/13092) ---------------------------

    Scenario Outline: The user is not able to leave required fields of organization details as blank
        When the user doesn't enter any value to the required 'Name' field
        And click on the Update button
        Then the system should give '<nameFieldValidation>' validation for the 'Name' field
        When the user doesn't enter any value to the required 'Organization Code' field
        And click on the Update button
        Then the system should give '<organizationCodeFieldValidation>' validation for the 'Organization Code' field
        When the user doesn't enter any value to the required 'Email' field
        And click on the Update button
        Then the system should give '<emailFieldValidation>' validation for the 'Email' field
        And the test field details of the organization should not get updated in case of '<case>'

        Examples:
            | case     | nameFieldValidation     | organizationCodeFieldValidation | emailFieldValidation |
            | Required | This field is required. | Organization Code is required   | Email is required    |

    #--------------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/13093) ---------------------------

    Scenario Outline: The user is not able to update organization details with invalid data
        When the user enter '<invalidData>' data in the 'Email' field
        And click on the Update button
        Then the system should give '<fieldValidation>' validation for the 'Email' field
        And the test field details of the organization should not get updated in case of '<case>'

        Examples:
            | case                 | invalidData | fieldValidation              |
            | Invalid Email Format | test@abc    | Email must be a valid email  |

    #--------------------------- Case:5 (http://testrails.rapidops.com/index.php?/cases/view/13094) ---------------------------

    Scenario: The user is not able to update organization details with invalid data length
        When the user enter more than '100' chars data in the 'Name' field
        And the user enter more than '255' chars data in the 'Phone' field
        And the user enter more than '255' chars data in the 'Fax' field
        And the user enter more than '255' chars data in the 'Address Line 1' field
        And the user enter more than '255' chars data in the 'Address Line 2' field
        And the user enter more than '255' chars data in the 'Area' field
        And the user enter more than '255' chars data in the 'City' field
        And the user enter more than '255' chars data in the 'State' field
        And the user enter more than '15' chars data in the 'Zip Code' field
        And click on the Update button
        Then the system should give 'Should be maximum 100 characters' validation for the 'Name' field
        And the system should give 'Should be maximum 255 characters' validation for the 'Phone' field
        And the system should give 'Should be maximum 255 characters' validation for the 'Fax' field
        And the system should give 'Should be maximum 255 characters' validation for the 'Address Line 1' field
        And the system should give 'Should be maximum 255 characters' validation for the 'Address Line 2' field
        And the system should give 'Should be maximum 255 characters' validation for the 'Area' field
        And the system should give 'Should be maximum 255 characters' validation for the 'City' field
        And the system should give 'Should be maximum 255 characters' validation for the 'State' field
        And the system should give 'Should be maximum 15 characters' validation for the 'Zip Code' field
        And the test field details of the organization should not get updated in case of 'invalid data length'

    #--------------------------- Case:6 (http://testrails.rapidops.com/index.php?/cases/view/13095) ---------------------------

    Scenario: The active currencies are listed on the default currency dropdown list
        When the user goes on the Setup>Currencies page and get the active currencies list
        And the user goes on the Setup>Organization Details page and open default currency dropdown list
        Then the system should display active currencies on the default currency dropdown list

    #--------------------------- Case:7 (http://testrails.rapidops.com/index.php?/cases/view/13096) ---------------------------

    Scenario Outline: The user is able to set currency format
        When the user enter Currency Format: '<formatPattern>'
        And click on the Update button
        Then the currency format should get set in the provided format

        Examples:
            | formatPattern                  |
            | {{symbol}},{{code}},{{amount}} |

    #--------------------------- Case:8 (http://testrails.rapidops.com/index.php?/cases/view/13097) ---------------------------

    Scenario Outline: The user is able to format organization disclaimer
        When the user click on '<format>' option with '<formatValue>' value and then enter '<disclaimerText>' disclaimer
        And click on the Update button
        Then the disclaimer should get displayed in the '<format>' format

        Examples:
            | format                    | formatValue               | disclaimerText             |
            | Bold                      |                           | Text in the bold format    |
            | Italic                    |                           | Text in the italic format  |
            | Underline                 |                           | Text with underline        |
            | Strikethrough             |                           | Text with strikethrough    |
            | Order List                | Lower Greek               | Ordered list               |
            | Unorder List              | Disc                      | Unordered list             |
            | Insert Link               | https://www.rapidops.com  | Rapidops Inc.              |
            | Undo                      |                           | Undo the last thing        |
            | Redo                      |                           | Redo the last thing        |
            | Font Size                 | 18                        | Text in a different size   |
            | Code View                 |                           |                            |

    #--------------------------- Case:9 (http://testrails.rapidops.com/index.php?/cases/view/13098) ---------------------------

    Scenario Outline: The user is able to set/remove organization disclaimer
        When the user '<set/remove>' organization disclaimer
        And click on the Update button
        Then the organization disclaimer should get '<set/removed>'

        Examples:
            | set/remove | set/removed |
            | Remove     | Removed     |
            | Set        | Set         |