import { dynamoDbClient } from "@/lib/dynamoDbClient";
import { ScanCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export async function fetchAllNews() {
  const params = {
    TableName: process.env.DYNAMODB_TABLE_NAME || "blog-articles",
    ProjectionExpression: "id, #date, author, category, image, title",
    ExpressionAttributeNames: {
      "#date": "date",
    },
  };

  try {
    const result = await dynamoDbClient.send(new ScanCommand(params));

    if (!result.Items || result.Items.length === 0) {
      return { status: 404, message: "No articles found", articles: [] };
    }

    const unmarshalled = result.Items.map((item) => unmarshall(item));
    const sortedArticles = unmarshalled.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      return dateB - dateA;
    });

    return { status: 200, articles: sortedArticles };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching news:", error);

      return {
        status: 500,
        message: "Failed to fetch articles",
        error: error.message,
      };
    }
  }
}

export async function fetchUniqueNews(key: string) {
  const params = {
    TableName: process.env.DYNAMODB_TABLE_NAME || "blog-articles",
    ExpressionAttributeValues: {
      ":id": {
        S: key,
      },
    },
    KeyConditionExpression: "id = :id",
    Key: {
      id: {
        S: key,
      },
    },
    Limit: 1,
  };

  try {
    const command = new QueryCommand(params);
    const response = await dynamoDbClient.send(command);

    if (!response.Items) {
      return {
        status: 404,
        message: "No article found",
        article: null,
      };
    }

    const unmarshalled = unmarshall(response.Items[0]);
    return {
      status: 200,
      article: unmarshalled,
    };
  } catch (error) {
    console.error("Error fetching article:", error);

    return {
      status: 500,
      message: "Failed to fetch article",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function fetchCategoryNews(category: string) {
  const params = {
    TableName: process.env.DYNAMODB_TABLE_NAME || "blog-articles",
    IndexName: "category-date-index",
    ExpressionAttributeValues: {
      ":category": { S: category },
    },
    KeyConditionExpression: "category = :category",
    ScanIndexForward: false,
  };

  try {
    const result = await dynamoDbClient.send(new QueryCommand(params));

    if (!result.Items || result.Items.length === 0) {
      return {
        status: 404,
        message: `No articles found in category: ${category}`,
        articles: [],
      };
    }

    const unmarshalled = result.Items.map((item) => unmarshall(item));
    const sortedArticles = unmarshalled.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      return dateB - dateA;
    });

    return {
      status: 200,
      articles: sortedArticles,
    };
  } catch (error: unknown) {
    console.error("Error fetching news by category:", error);

    return {
      status: 500,
      message: "Failed to fetch articles by category",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
