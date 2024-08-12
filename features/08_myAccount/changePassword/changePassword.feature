@regression_test_myAccount @regression_test

Feature: Security Feature

Description: In this feature user will be able to change password of salesmate and can check the login with valid and invalid
             credentials and also verify the validation messages of each password field and checks
             the strength of new password field.

Background:
  Given the 'User1' is on security page

#---------------------- Case:1 (http://testrails.rapidops.com/index.php?/cases/view/8844) ----------------------

Scenario Outline: Verify, the user is able to change his Salesmate login password
  When Enter valid '<oldPassword>','<newPassword>','<confirmPassword>' and click on update button
  Then Salesmate password changed and successful message as 'Updated successfully.' displayed
  Then User is not able to do login with old password and verify 'Email or password seems to be wrong, please try again with valid credentials.'
  Examples:
  | oldPassword | newPassword | confirmPassword |
  | 1           | 12          | 12              |

Scenario Outline: Verify, thr required field validation for old,new and re-type password fields
  When Verifying '<oldPasswordRequiredValidation>' '<newPasswordRequiredValidation>' '<retypePasswordRequiredValidation>' for each blank password fields
  Examples:
  | oldPasswordRequiredValidation | newPasswordRequiredValidation | retypePasswordRequiredValidation |
  | Please enter old password     | Please enter new password     | Please re-type password          |

#---------------------- Case:2 (http://testrails.rapidops.com/index.php?/cases/view/9003) ----------------------

Scenario Outline: Verify, the user is not able to change his Salesmate login password when old, new or re-type password is invalid
  When User check '<oldPassword>','<newPassword>','<confirmPassword>'
  Then Password should not be updated and checking '<errorMessage>'
  Examples:
  | oldPassword | newPassword | confirmPassword | errorMessage                                    |
  | 1           | 12          | 12              | Invalid old password                            |
  | 12          | 12          | 12              | Your old and new password can not be the same.  |
  | 12          | 123         | 1234            | New password and re-type password do not match. |

#---------------------- Case:3 (http://testrails.rapidops.com/index.php?/cases/view/9157) ----------------------

Scenario Outline: The system should display the strength of a new password
  When Enter '<newPasswordFieldValue>' in new password field
  Then '<passwordStrengthMessage>' message should be displayed under new password field
  Examples:
  | newPasswordFieldValue  | passwordStrengthMessage  |
  | 1                      | Weak                     |
  | 1sd@AS1dx1aq           | Fair                     |
  | 1sd@AS1dx1aqwrt        | Good                     |
  | TestForPaa1@@34ok*&    | Strong                   |

#---------------------- Case:4 (http://testrails.rapidops.com/index.php?/cases/view/9160) ----------------------

Scenario: The system should not display any strength of a new password when the new password field is blank
  When New password field is leaved as blank no strength indicator should be displayed