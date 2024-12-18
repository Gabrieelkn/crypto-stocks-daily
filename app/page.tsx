import HeroSection from "@/components/layout/heroSection";
import Separator from "@/components/separator";
import Card from "@/components/card";
import { fetchAllNews } from "@/utils/fetchNews";
import { Article } from "@/utils/types";

export const metadata = {
  title: "CryptoStocksDaily",
  description:
    "Stay updated with the latest crypto and stocks news articles and insights.",
  openGraph: {
    title: "CryptoStocksDaily",
    description:
      "Stay updated with the latest crypto and stocks news articles and insights.",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <HeroSection />
      <Separator />
      <HowTo />
    </div>
  );
}

async function HowTo() {
  const res = await fetchAllNews();

  if (!res || !res.articles) {
    return (
      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-start mb-8">
            No Articles Found
          </h2>
          <p>There are currently no articles available.</p>
        </div>
      </section>
    );
  }

  const posts = Array.isArray(res.articles) ? res.articles : [res.articles];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 md:px-8 lg:px-20">
        <h2 className="text-3xl font-bold text-start mb-8">Latest articles</h2>
        {posts.length === 0 ? (
          <p>No articles available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {posts.map((post, index) => (
              <Card key={index} article={post as unknown as Article} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
