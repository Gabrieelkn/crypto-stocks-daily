import { dynamoDbClient } from "@/lib/dynamoDbClient";
import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch articles from DynamoDB
  const scanParams = {
    TableName: process.env.DYNAMODB_TABLE_NAME || "blog-articles",
  };

  const command = new ScanCommand(scanParams);
  const response = await dynamoDbClient.send(command);
  const articles = response.Items?.map((item) => unmarshall(item)) || [];

  // Create base sitemap entries
  const baseEntries: MetadataRoute.Sitemap = [
    {
      url: process.env.BASE_URL || "",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];

  // Add article entries
  const articleEntries = articles.map((article) => ({
    url: `${process.env.BASE_URL}/articles/${article.id}`,
    lastModified: new Date(article.date) || new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...baseEntries, ...articleEntries];
}
