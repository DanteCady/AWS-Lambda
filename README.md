 ____      _  ____           ____  _______     _______ _     ___  ____  __  __ _____ _   _ _____ 
|  _ \    | |/ ___|         |  _ \| ____\ \   / / ____| |   / _ \|  _ \|  \/  | ____| \ | |_   _|
| | | |_  | | |      _____  | | | |  _|  \ \ / /|  _| | |  | | | | |_) | |\/| |  _| |  \| | | |  
| |_| | |_| | |___  |_____| | |_| | |___  \ V / | |___| |__| |_| |  __/| |  | | |___| |\  | | |  
|____/ \___/ \____|         |____/|_____|  \_/  |_____|_____\___/|_|   |_|  |_|_____|_| \_| |_|  

##### Project Name
AWS Log Processor

Description
This code is designed to process log data from CloudWatch Logs and upload the processed logs to an Amazon S3 bucket. The code is written in JavaScript and utilizes the AWS SDK to interact with AWS services.

##### Author
Dante Cady
Publish Date
June 21, 2023
##### Instructions
To use this code, follow the instructions below:
1.	Set up an AWS account if you don't have one already.
2.	Create an AWS Lambda function in the AWS Management Console.
3.	In the Lambda function's code editor, replace the existing code with the provided code.
4.	Replace "YOUR REGION HERE" in the code with the appropriate AWS region.
5.	Replace "YOUR S3 BUCKET NAME" in the code with the name of your S3 bucket.
6.	Configure the function's permissions to allow access to CloudWatch Logs and S3.
7.	Create a CloudWatch Logs trigger for the Lambda function.
8.	Configure the trigger to associate the function with the desired log group and log streams that you want to process.
9.	Save the Lambda function.
Once you have set up the code and made the necessary modifications, the Lambda function is ready to process log data. The function will be triggered automatically whenever new log events are added to the specified log group.
When the function is triggered, it performs the following steps:
1.	Retrieves the log data from the CloudWatch Logs event.
2.	Decompresses the log data using the zlib library.
3.	Parses the log data and extracts relevant information such as bot name, input transcript, bot response, and session ID.
4.	Processes the extracted data as needed.
5.	Generates formatted text content containing the extracted information.
6.	Creates a new S3 folder based on the session ID.
7.	Uploads the formatted text to the newly created folder in the specified S3 bucket.
8.	Returns a response indicating the completion status of the log processing.
Please ensure that your AWS credentials and permissions are correctly set up to allow the Lambda function to access the necessary AWS services (e.g., CloudWatch Logs, S3).
For any issues or errors encountered during the log processing, the Lambda function will log the error message and return an appropriate response with the corresponding status code.
For more information on setting up and managing AWS Lambda functions, refer to the AWS Lambda documentation.
For more information on configuring CloudWatch Logs triggers, refer to the AWS CloudWatch documentation.
License
This project is licensed under the MIT License.

