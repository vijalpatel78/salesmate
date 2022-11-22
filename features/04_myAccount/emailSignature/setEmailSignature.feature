@regression_test_myAccount @regression_test

Feature: Set Email Signature

    The email signature is a block of text appended to the end of an email sent from the Salesmate. The user
    also can select the position of the email signature while replying to an email.

    Background:
        Given the 'User1' is on email signature page

    #---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/12502) ----------------------

    Scenario Outline: The user is able to set/remove his email signature
        When the user '<set/remove>' his email signature
        And click on the Update button
        Then the email signature should get '<set/removed>' on the 'email signature' page

        Examples:
            | set/remove | set/removed |
            | Remove     | Removed     |
    
    #---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/12503) ----------------------
    
    Scenario Outline: The user is able to format his email signature
        When the user click on '<format>' option with '<formatValue>' value and then enter '<emailSignatureText>' email signature
        And click on the Update button
        Then the email signature should get displayed in the '<format>' format on the 'email signature' page

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
            | Code View                 |                           |                            |
    
    #---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/12504) ----------------------

    Scenario Outline: The user is able to enable/disable 'Place this signature before quoted text in replies' option
        When the user '<enable/disable>' place this signature before quoted text in replies option
        And click on the Update button
        Then the place this signature before quoted text in replies option should get '<enabled/disabled>' on the 'email signature' page

        Examples:
            | enable/disable | enabled/disabled |
            | Enable         | Enabled          |
            | Disable        | Disabled         |

    #---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/12505) ----------------------

    Scenario: The email signature settings should be the same on the general settings and email signature page
        When the user 'set' email signature from the 'email signature' page
        And 'Enable' place this signature before quoted text in replies option from the 'email signature' page
        And click on the Update button
        Then the system should display updated email signature and place this signature before quoted text in replies option on the 'general settings' page
        When the user 'remove' email signature from the 'general settings' page
        And 'Disable' place this signature before quoted text in replies option from the 'general settings' page
        And click on the Update button
        Then the system should display updated email signature and place this signature before quoted text in replies option on the 'email signature' page