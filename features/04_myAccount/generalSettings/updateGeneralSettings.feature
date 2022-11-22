@regression_test_myAccount @regression_test

Feature: Update General Settings

    Whenever the user wants, he can update his details

    Background:
        Given the 'User1' is on general settings page

    #--------------------------------------- Case:1 (C8362) ---------------------------------------

    Scenario: The user is able to update general settings
        When the user update general settings with the following valid data:
            | First Name                            | priyanka |
            | Last Name                             | vlr      |
            | Mobile                                | +91-8342123456 |
            | Time Format                           | 12 hour |
            | Date Format                           | MMM DD, YYYY |
            | Timezone                              | Africa/Bamako |
            | Nick Name                             | Priya |
            | Email Signature                       | Regards,\npriyanka vlr |
            | Email Signature Placement             | Enable |
        And click on the Update button
        Then the details of general settings should get updated
        Then reset first name and last name

    #--------------------------------------- Case:2 (C12082) ---------------------------------------

    Scenario: The user is able to leave optional fields of general settings as blank
        When the user doesn't enter any value to the 'optional' field
        And click on the Update button
        Then the general settings should get updated and the optional fields should be displayed as blank

    #--------------------------------------- Case:3 (C12115) ---------------------------------------

    Scenario: After leaving nick name field blank, the first name should get displayed on the nick name field
        When the user doesn't enter any value to the 'Nick Name' field
        And click on the Update button
        Then the first name should get displayed on the nick name field

    #--------------------------------------- Case:4 (C11112) ---------------------------------------

    Scenario Outline: The user is not able to update general settings details with invalid data
        When the user update 'First Name' field with '<firstNameFieldData>' data for '<case>' case
        Then the system should give '<firstNameFieldValidation>' message for 'First Name' field in case of '<case>'
        When the user update 'Last Name' field with '<lastNameFieldData>' data for '<case>' case
        Then the system should give '<lastNameFieldValidation>' message for 'Last Name' field in case of '<case>'
        When the user update 'Email' field with '<emailFieldData>' data for '<case>' case
        Then the system should give '<emailFieldValidation>' message for 'Email' field in case of '<case>'
        When the user update 'Mobile' field with '<mobileFieldData>' data for '<case>' case
        Then the system should give '<mobileFieldValidation>' message for 'Mobile' field in case of '<case>'
        When the user update 'Nick Name' field with '<nickNameFieldData>' data for '<case>' case
        Then the system should give '<nickNameFieldValidation>' message for 'Nick Name' field in case of '<case>'
        When click on the Update button
        Then the details of general settings should not get updated in case of '<case>'

        Examples:
            | case                     | firstNameFieldData | firstNameFieldValidation   | lastNameFieldData | lastNameFieldValidation   | emailFieldData | emailFieldValidation | mobileFieldData | mobileFieldValidation   | nickNameFieldData    | nickNameFieldValidation   |
            | Required Validation      |                    | This field is required.    |                   | This field is required    |                | Please enter email   |                 |                         |                      |                           |
            | Length Validation        | Person who carried out calculations or computations. The word continued with the same meaning until the middle | First name should be maximum 100 characters | Person who carried out calculations or computations. The word continued with the same meaning until the middle | Last name should be maximum 100 characters | vijal.patelgdsfgsdf345345hsfgshfhsf345345sfghsfhdsgfhfsdfk234gvdsjfh345345hwhjejrghfhwgerfgvdghfhsfdg@gmail.com | Email should be maximum 100 characters | + 1234 - 123123 -234234 234324324-567567567567 123123n234234234 -234756768678123123 -234234234234456546-2324234234 43423424234-Test-&$%$% 3453434345345345 72324657532434 yetbasdhasd gasdg 234234123. 234353534534 123 12323435 345345 6768234 234234234 567567 | Mobile should be maximum 255 characters | Person who carried out calculations or computations. The word continued with the same meaning until the middle | Nick name should be maximum 100 characters |
            | Invalid Email Format     |                    |                            |                   |                           | test#$12yuc   | Please provide a valid email address |     |                     |                      |                           |

    #--------------------------------------- Case:5 (C11335) ---------------------------------------

    Scenario: The user is not able to update general settings details with a duplicate email address
        When the user update 'Email' field with 'duplicate email address' data for 'duplication' case
        And click on the Update button
        Then the system should give 'Someone from your organisation is already using this email.' message for 'Email' field in case of 'duplication'
        And the details of general settings should not get updated in case of 'duplication'

    #--------------------------------------- Case:6 (C11401) ---------------------------------------

    Scenario Outline: The user is able to enable/disable 'Place this signature before quoted text in replies' option
        When the user '<enable/disable>' place this signature before quoted text in replies option
        And click on the Update button
        Then the place this signature before quoted text in replies option should get '<enabled/disabled>' on the 'general settings' page

        Examples:
            | enable/disable | enabled/disabled |
            | Enable         | Enabled          |
            | Disable        | Disabled         |

    #--------------------------------------- Case:7 (C12073) ---------------------------------------

    Scenario Outline: The user is able to set/remove his email signature
        When the user '<set/remove>' his email signature
        And click on the Update button
        Then the email signature should get '<set/removed>' on the 'general settings' page

        Examples:
            | set/remove | set/removed |
            | Remove     | Removed     |

    #--------------------------------------- Case:8 (C12114) ---------------------------------------

    Scenario Outline: The user is able to format his email signature
        When the user click on '<format>' option with '<formatValue>' value and then enter '<emailSignatureText>' email signature
        And click on the Update button
        Then the email signature should get displayed in the '<format>' format on the 'general settings' page

        Examples:
            | format                    | formatValue               | emailSignatureText         |
            | Bold                      |                           | Text in the bold format    |
            | Italic                    |                           | Text in the italic format  |
            | Underline                 |                           | Text with underline        |
            | Strikethrough             |                           | Text with strikethrough    |
            | Order List                | Lower Greek               | Ordered list               |
            | Unorder List              | Circle                    | Unordered list             |
            | Insert Link               | https://www.rapidops.com  | Rapidops Inc.              |
            | Undo                      |                           | Undo the last thing        |
            | Redo                      |                           | Redo the last thing        |
            | Font Size                 | 18                        | Text in a different size   |
            | Align                     | Align Center              | Aligned text               |
            | Code View                 |                           |                            |