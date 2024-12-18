import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.REGION_AWS,
  credentials: {
    secretAccessKey: process.env.SECRET_KEY_AWS as string,
    accessKeyId: process.env.ACCESS_KEY_AWS as string,
  },
});

export const dynamoDbClient = DynamoDBDocumentClient.from(client);
