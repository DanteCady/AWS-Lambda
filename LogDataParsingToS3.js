import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { unzipSync } from "zlib";


// Configure AWS SDK
const s3Client = new S3Client({ region: "YOU REGION HERE" });

export const handler = async (event, context) => {
  // Retrieve the log data from the CloudWatch Logs event
  const logData = event.awslogs.data;
  const compressedPayload = Buffer.from(logData, "base64");

  try {
    // Decompress the log data
    const payload = unzipSync(compressedPayload);
    const parsedData = JSON.parse(payload);

    // Extract the relevant information from the parsed log data
    const botName = parsedData.botName;
    const inputTranscript = parsedData.inputTranscript;
    const botResponse = parsedData.botResponse;
    const sessionId = parsedData.sessionId; // Add this line to extract the session ID

    // Process the extracted data as needed

    // Generate the formatted text content
    const formattedText = `Bot Name: ${botName}\n` +
      `Input Transcript: ${inputTranscript}\n` +
      `Bot Response: ${botResponse}\n` +
      `Session ID: ${sessionId}\n`; // Include the session ID in the formatted text

    // Create a new S3 folder based on the session ID
    const folderName = `logs/${sessionId}/`;
    const paramsCreateFolder = {
      Bucket: "YOUR S3 BUCKET NAME",
      Key: folderName,
    };
    await s3Client.send(new PutObjectCommand(paramsCreateFolder));

    // Upload the formatted text to the newly created folder
    const paramsUpload = {
      Bucket: "YOUR S3 BUCKET NAME",
      Key: `${folderName}logs.txt`,
      Body: formattedText,
    };
    await s3Client.send(new PutObjectCommand(paramsUpload));

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
