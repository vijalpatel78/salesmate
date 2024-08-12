@regression_test_login @regression_test
Feature: Login

    The user can access Salesmate by doing login with a valid credentials

    Background:
        Given the user is on Salesmate login page

    #--------------------------------------- Case:1 (C6889) ---------------------------------------

    Scenario Outline: It should not allow login when credentials are invalid
        When the user enter Email:'<invalidEmail>'
        And enter Password:'<invalidPassword>'
        And click on the Login button
        Then the system should give '<validation>' message on the 'Salesmate_Login' page for '<case>' case

        Examples:
            | case                | invalidEmail                   | invalidPassword    | validation        |
            | No Email            |                                | 1                  | Email is required |
            | No Password         | vijal.patel123456@gmail.com    |                    | Password is required |
            | Invalid Credentials | ruhi.shah@yopmail.com          | ruhi123$           | Email or password seems to be wrong, please try again with valid credentials.|
            | Invalid Email Format| xxxx@xx                        | 1                  | Email is invalid |

    #--------------------------------------- Case:2 (C6888) ---------------------------------------

    Scenario: It should allow login when credentials are valid
        When the user enter Email:'validEmail'
        And enter Password:'validPassword'
        And click on the Login button
        Then the user should get login into the Salesmate