import { S3Client } from "@aws-sdk/client-s3";
import { unzipSync } from "zlib";
import { Upload } from "@aws-sdk/lib-storage";

// Configure AWS SDK
const s3Client = new S3Client({ region: "YOUR REGION HERE" });

export const handler = async (event, context) => {
  // Retrieve the log data from the CloudWatch Logs event
  const logData = event.awslogs.data;
  const compressedPayload = Buffer.from(logData, "base64");

  try {
    // Decompress the log data
    const payload = unzipSync(compressedPayload);
    const parsedData = JSON.parse(payload.toString());

    console.log("Parsed JSON data:", parsedData);

    // Extract the relevant information from the log event
    const logEvent = parsedData.logEvents[0];
    const message = JSON.parse(logEvent.message);

    console.log("Extracted message:", message);

    // Extract the desired data from the message object
    const botName = message.botName || "";
    const userMessage = message.inputTranscript || "";
    const botResponse = message.botResponse || "";
    const sessionId = message.sessionId || "";

    console.log("Extracted data:", {
      botName,
      userMessage,
      botResponse,
      sessionId,
    });

    // Process the extracted data as needed

    // Generate the formatted text content
    const formattedText = `Bot Name: ${botName}\n` +
      `Input Transcript: ${userMessage}\n` +
      `Bot Response: ${botResponse}\n` +
      `Session ID: ${sessionId}\n`; 

    // Create a new S3 folder structure
    const currentDate = new Date();
    // Get the current year as a string
    const yearString = currentDate.getFullYear().toString(); 
    // Get the current month as a spelled-out string
    const monthString = currentDate.toLocaleString("default", { month: "long" }); 
     // Get the current day as a string
    const dayString = currentDate.getDate().toString();
    // Get the current hour in 24-hour format
    const hour = currentDate.getHours(); 
    // To use 12 hour format, update the "${hour}" and replace it with "${hourString}"
    // Place the "${ampm}" variable after the "${hourString }"
    // const hourString = hour > 12 ? (hour - 12).toString() : hour.toString(); // Convert the hour to 12-hour format
    // const ampm = hour >= 12 ? "PM" : "AM"; // Determine the AM/PM value
    const folderName = `YOUR BUCKET NAME HERE/${yearString}/${monthString}/${dayString}/${hour}/${sessionId}/`;

    // Upload the formatted text to the newly created folder
    const logFileName = `${sessionId}.txt`;
    const paramsUpload = {
      client: s3Client,
      params: {
        Bucket: "YOUR BUCKET NAME HERE",
        Key: `${folderName}${logFileName}`,
        Body: formattedText,
      },
    };
    const upload = new Upload(paramsUpload);
    await upload.done();

    return {
      statusCode: 200,
      body: "Log processing completed and uploaded to S3.",
    };
  } catch (error) {
    console.error("Error processing log data:", error);
    return {
      statusCode: 500,
      body: "Error processing log data.",
    };
  }
};
