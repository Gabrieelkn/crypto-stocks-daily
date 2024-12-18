import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_KEY as string,
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
  },
});

export const dynamoDbClient = DynamoDBDocumentClient.from(client);
