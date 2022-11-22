@regression_test_myAccount @regression_test
Feature: Manage Voicemail Files

    With the Salesmate voicemail drop feature, the user can store multiple pre-recorded messages in form of
    voicemail files and choose one to be auto-dropped when the call ends to a voicemail.

    Background:
        Given the 'User1' is on voicemail drop page

    #--------------------------------------- Case:1 (C12302) ---------------------------------------

    Scenario Outline: The user is able to add voicemail file
        When the user click on the 'Upload Audio' button
        And 'enter' Subject:'<subject>'
        And 'upload' Voicemail File:'<file>'
        And click on the 'Save' button
        Then the voicemail file with '<subject>' and '<file>' should get 'added'

        Examples:
            | subject        | file                        |
            | Test #1        | SampleAudio_4.6mb.mp3       |

    #--------------------------------------- Case:2 (C12303) ---------------------------------------

    Scenario Outline: The user is able to edit voicemail file
        When the user click on the 'Edit' button of '<existingVoicemail>' record
        And 'update' Subject:'<subject>'
        And 'update' Voicemail File:'<file>'
        And click on the 'Save' button
        Then the voicemail file with '<subject>' and '<file>' should get 'updated'

        Examples:
            | existingVoicemail     | subject                | file                        |
            | Test #1               | Test Updated #1        | SampleAudio_0.5mb.mp3       |

    #--------------------------------------- Case:3 (C12304) ---------------------------------------

    Scenario Outline: The user is able to play or pause voicemail
        When the user click on the 'Play' button of '<existingVoicemail>' record
        Then the '<existingVoicemail>' voicemail should get 'played'
        When the user click on the 'Pause' button of '<existingVoicemail>' record
        Then the '<existingVoicemail>' voicemail should get 'paused'
        When the user click on the 'Play' button of '<existingVoicemail>' record
        Then the '<existingVoicemail>' voicemail should get 'resumed'

        Examples:
            | existingVoicemail     |
            | Test Updated #1       |

    #--------------------------------------- Case:4 (C12306) ---------------------------------------

    Scenario: The user is not able to add voicemail file without subject
        When the user click on the 'Upload Audio' button
        And 'leave blank' Subject:' '
        And click on the 'Save' button
        Then the system should give 'This field is required.' validation message for 'SubjectRequired' case

    #--------------------------------------- Case:5 (C12307) ---------------------------------------

    Scenario: The user is not able to add voicemail file without file
        When the user click on the 'Upload Audio' button
        And 'enter' Subject:'Test'
        And 'does not upload' Voicemail File:''
        And click on the 'Save' button
        Then the system should give 'Please upload a MP3 file.' validation message for 'FileRequired' case

    #--------------------------------------- Case:6 (C12308) ---------------------------------------

    Scenario Outline: The user is not able to add voicemail file with more than 100 chars subject
        When the user click on the 'Upload Audio' button
        And 'enter' Subject:'<subject>'
        And click on the 'Save' button
        Then the system should give 'Max length should be 100' validation message for 'SubjectLenght' case

        Examples:
            | subject        |
            | Kekahi kamepiula kahi mīkini e hiki ke aʻo i ka hoʻokō i nā hana o ka hana arithmetic a i ʻole loilhello1 |

    #--------------------------------------- Case:7 (C12309) ---------------------------------------

    Scenario Outline: The user is not able to add voicemail file with other than mp3 file type
        When the user click on the 'Upload Audio' button
        And 'upload' Voicemail File:'<invalidFileType>'
        Then the system should give 'You can\'t upload files of this type.' validation message for 'InvalidFileType' case

        Examples:
            | invalidFileType               |
            | SampleVideo_1280x720_1mb.mp4  |

    #--------------------------------------- Case:8 (C12310) ---------------------------------------

    Scenario Outline: The user is not able to add voicemail file with more than 5MB file size
        When the user click on the 'Upload Audio' button
        And 'upload' Voicemail File:'<invalidFileSize>'
        Then the system should give 'Max filesize: 5MiB.' validation message for 'InvalidFileSize' case

        Examples:
            | invalidFileSize               |
            | LargeFileSize.mp3             |

    #--------------------------------------- Case:9 (C12311) ---------------------------------------

    Scenario Outline: The user is not able to edit voicemail file without subject
        When the user click on the 'Edit' button of '<existingVoicemail>' record
        And 'leave blank' Subject:''
        And click on the 'Save' button
        Then the system should give 'This field is required.' validation message for 'SubjectRequired' case

        Examples:
            | existingVoicemail     |
            | Test Updated #1       |

    #--------------------------------------- Case:10 (C12312) ---------------------------------------

    Scenario Outline: The user is not able to edit voicemail file without file
        When the user click on the 'Edit' button of '<existingVoicemail>' record
        And 'remove' Voicemail File:''
        And click on the 'Save' button
        Then the system should give 'Please upload a MP3 file.' validation message for 'FileRequired' case

        Examples:
            | existingVoicemail     |
            | Test Updated #1       |

    #--------------------------------------- Case:11 (C12313) ---------------------------------------

    Scenario Outline: The user is not able to edit voicemail file with more than 100 chars subject
        When the user click on the 'Edit' button of '<existingVoicemail>' record
        And 'enter' Subject:'<subject>'
        And click on the 'Save' button
        Then the system should give 'Max length should be 100' validation message for 'SubjectLenght' case

        Examples:
            | existingVoicemail     | subject        |
            | Test Updated #1       | Kekahi kamepiula kahi mīkini e hiki ke aʻo i ka hoʻokō i nā hana o ka hana arithmetic a i ʻole loilo1 |

    #--------------------------------------- Case:12 (C12314) ---------------------------------------

    Scenario Outline: The user is not able to edit voicemail file with other than mp3 file type
        When the user click on the 'Edit' button of '<existingVoicemail>' record
        And 'update' Voicemail File:'<invalidFileType>'
        Then the system should give 'You can\'t upload files of this type.' validation message for 'InvalidFileType' case

        Examples:
            | existingVoicemail     | invalidFileType               |
            | Test Updated #1       | SampleVideo_1280x720_1mb.mp4  |

    #--------------------------------------- Case:13 (C12315) ---------------------------------------

    Scenario Outline: The user is not able to edit voicemail file with more than 5MB file size
        When the user click on the 'Edit' button of '<existingVoicemail>' record
        And 'update' Voicemail File:'<invalidFileSize>'
        Then the system should give 'Max filesize: 5MiB.' validation message for 'InvalidFileSize' case

        Examples:
            | existingVoicemail     | invalidFileSize               |
            | Test Updated #1       | LargeFileSize.mp3             |

    #--------------------------------------- Case:14 (C12316) ---------------------------------------

    Scenario Outline: The user is able to delete voicemail file
        When the user click on the 'Remove' button of '<existingVoicemail>' record
        And click on the 'Yes' button
        Then the voicemail file with '<existingVoicemail>' and 'file' should get 'deleted'

        Examples:
            | existingVoicemail     |
            | Test Updated #1       |

    #--------------------------------------- Case:15 (C12317) ---------------------------------------
    
    Scenario: The voicemail file management is user wise
        When the 'User2' add, update or delete voicemail file from his account
        Then it should not create an impact on the voicemail file settings of the 'User1' account