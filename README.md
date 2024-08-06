# To-Do App
## Name: Weekly To-do-app
### Overview
This is a To-Do application built with React, Vite, and JavaScript. It features user authentication and task management, with data stored in a JSON database for persistence. Users can manage their tasks and have their data saved and retrieved using a JSON server.
#### Features
* User Authentication: Register and log in to manage tasks.
* Task Management: Add, update, and delete tasks.
* Persistent Data: Tasks and user data are stored in a JSON database.
##### Getting Started
Follow these steps to get the application up and running on your local machine.
##### Prerequisites
* Node.js
* npm
## Installation
Clone the repository:

bash
Copy code
git clone: [repository-url]
Navigate to the project folder:

bash
Copy code
cd [project-folder]
Install dependencies:

bash
Copy code
npm install

### Running the Application
Start the JSON server:

Ensure you have json-server installed globally. If not, install it with:

bash
Copy code
- npm install -g json-server
- Then, start the JSON server:

bash
Copy code
json-server --watch db.json --port 5000
Start the React application:

In a new terminal window, navigate to the project folder and run:

bash
Copy code
npm run dev
This will start the development server and open the application in your default browser.

## Project UI (User Interphase)
![Screenshot (305)](https://github.com/user-attachments/assets/07ef73d5-2c42-4732-9028-12e8cfb825d9)
![Screenshot (304)](https://github.com/user-attachments/assets/a62935ed-2879-4e28-a5a9-7233b1093c04)


### Configuration
- JSON Database: The db.json file is located in the src directory and is used by the JSON server to store user credentials and tasks.
- Database Port: The JSON server runs on port 5000 by default. Ensure there are no conflicts with other services using this port or alternatively use port 5001.

# License
This project is licensed under the MIT License. See the LICENSE file for details.
