@regression_test_login @regression_test
Feature: Remember Salesmate Login Credentials

    Instead of entering Salesmate login credentials again and again, the user can keep last
    entered Salesmate login credentials as saved when he will visit the Salesmate again

    Background:
        Given the user is on Salesmate login page

    #--------------------------------------- Case:1 (C7040) ---------------------------------------

    Scenario Outline: It should remember last login credentials when 'Remember Me' checkbox is checked
        When the user enter Email:'<email>'
        And enter Password:'<password>'
        And 'check' Remember Me checkbox
        And click on the Login button
        Then the system 'should' remember last login '<email>' and '<password>'

        Examples:
            | email                         | password |
            | new.user@yopmail.com          | 1        |

    #--------------------------------------- Case:2 (C7041) ---------------------------------------

    Scenario Outline: It should not remember last login credentials when 'Remember Me' checkbox is unchecked
        When the user enter Email:'<email>'
        And enter Password:'<password>'
        And 'uncheck' Remember Me checkbox
        And click on the Login button
        Then the system 'should not' remember last login '<email>' and '<password>'

        Examples:
            | email                     | password    |
            | gautam.patel@yopmail.com  | Gautam@123  |