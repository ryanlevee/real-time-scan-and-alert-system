Real-Time Scan and Alert System
===============================

Overview
--------

This Real-Time Scan and Alert System is a comprehensive program designed to automate the processing and management of live scan and alert data. This project showcases advanced techniques in middleware extension, error handling, and data processing, making it a robust and effective tool for various industries that require real-time data monitoring and management.

### Key Functions:

1.  **Data Ingestion**: Continuously monitors incoming data for live scans and alerts.
2.  **Data Processing**: Validates and processes incoming data, including geocoding and payload validation.
3.  **Database Interaction**: Updates the SQL database with processed data.
4.  **Error Handling**: Implements advanced error handling and logging mechanisms.
5.  **Middleware Extension**: Enhances Express middleware for improved request validation and error handling.

This system ensures that real-time scan and alert data is accurately captured, processed, and stored, facilitating efficient data management and operational efficiency.

Technologies Used
-----------------

*   **Node.js**: The primary programming language used for this project.
*   **Express.js**: For building the web server and handling HTTP requests.
*   **Asynchronous Programming**: Utilized for handling I/O-bound operations efficiently.
*   **Environment Variables**: Managed using `dotenv` for configuration settings.
*   **SQL**: For database interactions and queries.
*   **Fetch API**: For making HTTP requests to third-party services.
*   **Error Handling**: Implemented to manage errors and ensure the robustness of the application.
*   **Logging**: For tracking and debugging the process.
*   **Middleware Extension**: Custom middleware for request validation and error handling.
*   **Dependency Management**: Managed using `npm`.

Features
--------

*   **Automated Data Ingestion**: Continuously monitors and ingests live scan and alert data.
*   **Integration with Third-Party Services**: Utilizes API integration for geocoding services.
*   **Advanced Error Handling**: Custom error classes and middleware for robust error management.
*   **Asynchronous Operations**: Efficient handling of I/O-bound operations.
*   **Modular Architecture**: Organized code structure for maintainability and scalability.
*   **Comprehensive Logging**: Detailed logging for tracking and debugging.
*   **Email Notifications**: Sends notifications for critical errors.

Project Structure
-----------------

The project is organized into the following files and directories:

*   `src/app.js`: Main application file.
*   `src/bookends/`: Contains middleware for the beginning and end of request processing.
    *   `begin.js`
    *   `end.js`
    *   `index.js`
*   `src/common/`: Common utility functions and constants.
    *   `payloadFields.js`
    *   `utility.js`
*   `src/controllers/`: Controllers for handling business logic.
    *   `control.js`
    *   `controllers.js`
    *   `index.js`
*   `src/email/`: Email notification functionality.
    *   `emailer.js`
*   `src/errors/`: Error handling classes and functions.
    *   `classes/`
        *   `classes.js`
        *   `controllers.js`
        *   `database.js`
        *   `index.js`
        *   `middleware.js`
        *   `normalizer.js`
        *   `payload.js`
    *   `email.js`
    *   `index.js`
    *   `log.js`
    *   `responses.js`
    *   `setter.js`
    *   `write.js`
*   `src/extenders/`: Middleware extenders for additional functionality.
    *   `errors.js`
    *   `index.js`
    *   `middleware.js`
*   `src/handlers/`: Handlers for specific operations.
    *   `index.js`
    *   `sql.js`
*   `src/middleware/`: Middleware for request validation and processing.
    *   `extension.js`
    *   `validate.js`
*   `src/models/`: Database models and schemas.
    *   `database.js`
    *   `index.js`
    *   `schemas.js`
*   `src/routes/`: API routes.
    *   `index.js`
    *   `liveAlert.js`
    *   `liveScan.js`
*   `src/services/`: Services for processing data.
    *   `geocode.js`
    *   `index.js`
    *   `payload.js`
    *   `sql.js`
*   `src/storage/`: Data storage and management.
    *   `holders.js`
    *   `stores.js`

Prerequisites
-------------

*   Node.js 14 or higher
*   Access to a SQL database
*   SendGrid API key for email notifications

Getting Started
---------------

1.  Clone the repository:
    
        git clone https://github.com/ryanlevee/real-time-scan-and-alert-system.git
        
    
2.  Navigate to the project directory:
    
        cd real-time-scan-and-alert-system
        
    
3.  Install the dependencies:
    
        npm install
        
    
4.  Set up environment variables in a `.env` file based on the provided `config/.env.example`.
    

Usage
-----

To run the main application, use:

    node src/app.js
    

Usage Example
-------------

Here's a brief example of how the software works:

1.  The program monitors incoming data for live scans and alerts.
2.  When new data is detected, it processes the data, including geocoding and payload validation.
3.  The processed data is then updated in the SQL database.
4.  Any errors encountered during processing are sent through a comprehensive flow.

Technical Details
-----------------

### Middleware Extension

The project extends Express middleware to enhance request validation and error handling. Custom middleware functions are used to validate HTTP methods, paths, and request bodies, ensuring that only valid data is processed.

### Error Handling

Advanced error handling is implemented using custom error classes and middleware. Errors are categorized and handled based on their type, with specific responses and logging mechanisms in place. Critical errors trigger email notifications for immediate awareness.

### Data Processing

Data processing involves several steps:

1.  **Payload Validation**: Incoming data is validated against predefined schemas to ensure it meets the required format.
2.  **Geocoding**: The Fetch API is used to make HTTP requests to the OpenStreetMap Nominatim service for reverse geocoding.
3.  **Database Interaction**: Processed data is updated in the SQL database using parameterized queries to prevent SQL injection.

### Logging

Comprehensive logging is implemented to track the flow of data and capture any errors or anomalies. Logs are stored in a structured format for easy analysis and debugging.

### Email Notifications

Email notifications are sent for critical errors using the SendGrid API. This ensures that any significant issues are promptly reported and can be addressed in a timely manner.

Modules
-------

#### `src/app.js`

Main application file that sets up the Express server and routes.

#### `src/bookends/`

Contains middleware for the beginning and end of request processing.

#### `src/common/`

Common utility functions and constants used throughout the project.

#### `src/controllers/`

Controllers for handling business logic and orchestrating operations.

#### `src/email/`

Email notification functionality using SendGrid.

#### `src/errors/`

Error handling classes and functions to manage and log errors.

#### `src/extenders/`

Middleware extenders for additional functionality.

#### `src/handlers/`

Handlers for specific operations such as SQL queries.

#### `src/middleware/`

Middleware for request validation and processing.

#### `src/models/`

Database models and schemas for interacting with the SQL database.

#### `src/routes/`

API routes for handling HTTP requests.

#### `src/services/`

Services for processing data, including geocoding and payload validation.

#### `src/storage/`

Data storage and management classes.

Contributing
------------

Contributions are welcome! Please open an issue or submit a pull request.

Credits
-------

This project includes code for geocoding from OpenStreetMap.

Author
------

Your Name

License
-------

This project is licensed under the GNU General Public License. See the `LICENSE` file for details.
