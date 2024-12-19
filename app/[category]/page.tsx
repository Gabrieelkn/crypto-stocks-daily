import Card from "@/components/card";
import { fetchCategoryNews } from "@/utils/fetchNews";
import { Article } from "@/utils/types";

export default function Stocks({ params }: { params: { category: string } }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto flex flex-col lg:flex-row lg:items-start lg:gap-8 px-4 md:px-8 lg:px-20">
        <div>
          <HowTo slug={params.category} />
        </div>
      </div>
    </div>
  );
}

async function HowTo({ slug }: { slug: string }) {
  const res = await fetchCategoryNews(slug);

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
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-start mb-8">
          Latest {slug} articles
        </h2>
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
