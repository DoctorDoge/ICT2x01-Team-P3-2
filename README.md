# Robo-Sensei
Robo-Sensei is a project that aims to educate user critical problem solving and computational thinking skills using robotic car with the customizable controls from the web portal.


# Development Team Members
```
DoctorDoge -  Lee Zhi Yang Aloysius
suhail97s - Muhammad Suhail Bin Salimudeen
huiToT - Jessica Tan Guang Hui
zhenxuan98 - Tan Zhen Xuan
```
# How to run

## Prerequisite
- Node Js Installed
- Express Js Installed

## Step by Step Instructions
- Clone the repo to your desired directory
1) cd into RoboSensei
2) Type 'npm install' in the terminal to install dependencies
3) Type 'npm install blockly' in the terminal to install blockly package
4) Finally to run the application type npm start

# Development Workflow

**Developers (ALL MEMBERS):**
- Create branch from dev and call it feature/xxx
- Create issues in Kanban board for the feature that they are working on
- Use the following conventions for creating the issues:
```Naming convention:
Ticket No. XX
Branch: Feature/XXXX
<Description of feature or what we are trying to work on>
```
- Push commits into the specified feature/XXX branch. (1 person per feature/XXX)
- Create Pull request accordingly (either to dev branch or others)

**Suhail (Scrum Master) / Jessica (Tech Lead):**
- Approve Pull request with comment on the issue. Always "Close with Comment" for approval.
- Merges the features/XXX into dev branch
- Merges the dev into master branch once development is finised 
- Create release version once all functionalities is done


# UAT Section

## Updated System State Diagram

## UAT System Test Cases Table

| ID   | Test Case Description                          | Precondition                                     | Steps                                                                                        | Excepted Results                                                                    | Actual Result | P/F |
| ---- | ---------------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------- | --- |
| ST1  | Select Instructor Role                         | In Home Screen                                   | 1\. Select “Instructor” button in Home Screen                                                | 1\. Login Popup to appear                                                           |               |     |
|      |                                                |                                                  | 2\. Observe for login popup to appear                                                        |                                                                                     |               |     |
| ST2  | Select Upper Primary Student Role              | In Home Screen                                   | 1\. Select “Student” button in Home Screen                                                   | 1\. Directed to Block-Based Game                                                    |               |     |
|      |                                                |                                                  | 2\. Observe page to be directed to Block-Based Game                                          |                                                                                     |               |     |
| ST3  | Login into Instructor Dashboard                | In Login Screen                                  | 1\. Enter the correct password at the password input                                         | 1\. Directed to Dashboard Screen                                                    |               |     |
|      |                                                |                                                  | 2\. Click Submit                                                                             |                                                                                     |               |     |
|      |                                                |                                                  | 3\. Observe page to be directed to Dashboard Screen                                          |                                                                                     |               |     |
| ST4  | Failed login attempt into Instructor Dashboard | In Login Screen                                  | 1\. Enter the wrong password at the password input                                           | 1\. Error message appears and displays “Incorrect Password! Please try again.”      |               |     |
|      |                                                |                                                  | 2\. Click Submit                                                                             |                                                                                     |               |     |
|      |                                                |                                                  | 3\. Observe error message to appear                                                          |                                                                                     |               |     |
| ST5  | View Robotic Car Status                        | Logged in as Instructor                          | 1\. Click on refresh status of the Actuator Status                                           | 1\. Actuator status updated                                                         |               |     |
|      |                                                | Robotic Car is successfully connected            | 2\. Observe “Up” or “Down” at the Actuator Status                                            | 2\. Sensor status updated                                                           |               |     |
|      |                                                |                                                  | 3\. Click on refresh status of the Sensor Status                                             | 3\. Logs updated                                                                    |               |     |
|      |                                                |                                                  | 4\. Observe “Detected” or “Undetected”  at the Sensor Status                                 |                                                                                     |               |     |
|      |                                                |                                                  | 5\. Observe that there are inputs from the logs.                                             |                                                                                     |               |     |
| ST6  | Configuration Screen redirect                  | Logged in as Instructor                          | 1\. Click on “Configuration” at the navigation bar                                           | 1\. Directed to Configuration Screen                                                |               |     |
|      |                                                |                                                  | 2\. Observe page to be directed to Configuration Screen                                      |                                                                                     |               |     |
| ST7  | Change Password successfully                   | Logged in as Instructor                          | 1\. Input current password into the “Current Password” field                                 | 1\. Password successfully changed                                                   |               |     |
|      |                                                | In Configuration Screen                          | 2\. Input new password into the “New Password” field                                         | 2\.  Receive a success message as “Password Changed!”                               |               |     |
|      |                                                |                                                  | 3\. Input the new password again into the “Confirm New Password” field                       |                                                                                     |               |     |
|      |                                                |                                                  | 4\. Click on Submit                                                                          |                                                                                     |               |     |
|      |                                                |                                                  | 5\. Observe that the password has been changed and success message to appear                 |                                                                                     |               |     |
| ST8  | Failed attempt to change password              | Logged in as Instructor                          | 1\. Input wrong password into the “Current Password” field                                   | 1\. Password not successfully changed                                               |               |     |
|      |                                                | In Configuration Screen                          | 2\. Input new password into the “New Password” field                                         | 2\.  Receive error notification as “Incorrect password! Please try again.”          |               |     |
|      |                                                |                                                  | 3\. Input the new password again into the “Confirm New Password” field                       |                                                                                     |               |     |
|      |                                                |                                                  | 4\. Click on Submit                                                                          |                                                                                     |               |     |
|      |                                                |                                                  | 5\. Observe that the password cannot be been changed and error message to appear             |                                                                                     |               |     |
| ST9  | Connect to Robotic Car successfully            | Logged in as Instructor                          | 1\. Click on the drop-down list of MAC address                                               | 1\. Robotic Car  successfully connected and receive success notification            |               |     |
|      |                                                | In Configuration Screen                          | 2\. Select the correct Robotic Car’s MAC address                                             |                                                                                     |               |     |
|      |                                                |                                                  | 3\. Click Submit                                                                             |                                                                                     |               |     |
|      |                                                |                                                  | 4\. Observe that the Robotic Car is connected and success message to appear                  |                                                                                     |               |     |
| ST10 | Failed attempt to connect to Robotic Car       | Logged in as Instructor                          | 1\. Click on the drop-down list of MAC address                                               | 1\. Robotic Car not  successfully connected and receive error notification          |               |     |
|      |                                                | In Configuration Screen                          | 2\. Select the wrong Robotic Car’s mac address                                               |                                                                                     |               |     |
|      |                                                |                                                  | 3\. Click Submit                                                                             |                                                                                     |               |     |
|      |                                                |                                                  | 4\. Observe that the Robotic Car is connected and error message to appear                    |                                                                                     |               |     |
| ST11 | Redirect to Design Screen                      | Logged in as Instructor                          | 1\. Click on “Design” at the navigation bar                                                  | 1\. Directed to Design Screen                                                       |               |     |
|      |                                                |                                                  | 2\. Observe page to be directed to Design Screen                                             |                                                                                     |               |     |
| ST12 | Create New Level Map                           | Logged in as Instructor                          | 1\. Click and drag assets to empty map template                                              | 1\. Able to interact with all assets in Design Screen                               |               |     |
|      |                                                | In Design Screen                                 | 2\. Click Save button                                                                        | 2\. New Map designed by user is successfully saved and receive success notification |               |     |
|      |                                                |                                                  | 3\. Observe that new level Map is saved and success message to appear                        |                                                                                     |               |     |
| ST13 | Play Block-Based Game                          | Logged in as Instructor or Upper Primary Student | 1\. Click and drag block commands into input panel                                           | 1\. Able to Interact with all elements in Block-Based Game                          |               |     |
|      |                                                |                                                  | 2\. Combine different block commands together                                                | 2\. Able to select and drag command blocks into the input panel                     |               |     |
|      |                                                |                                                  | 3\. Observe that level map is displayed                                                      | 3\. Able to remove command blocks from input panel                                  |               |     |
|      |                                                |                                                  |                                                                                              | 4\. Able to view Game Map                                                           |               |     |
| ST14 | Submit Command to Robotic Car                  | In Block-Based Game Screen                       | 1\. Click on submit                                                                          | 1\. Logs to show command has been submitted to the Robotic Car                      |               |     |
|      |                                                | Input Panel has Command Blocks in it             | 2\. Observe that logs show that command has been sent                                        |                                                                                     |               |     |
| ST15 | Submit Command to Robotic Car is unsuccessful  | In Block-Based Game Screen                       | 1\. Disconnect the WiFi from the machine to lose the established connection with Robotic Car | 1\. Logs to show command has not been submitted to the Robotic Car                  |               |     |
|      |                                                | Input Panel has Command Blocks in it             | 2\. Click on submit                                                                          |                                                                                     |               |     |
|      |                                                |                                                  | 3\. Observe that logs show that command has not been sent                                    |                                                                                     |               |     |

# Whitebox Testing



https://user-images.githubusercontent.com/55780919/144942455-e73c9f5e-3564-4470-9526-9e22dd35aa8e.mp4



