import Image from "next/image";
import parse from "html-react-parser";
import { fetchUniqueNews } from "@/utils/fetchNews";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const query = params.slug;
  const res = await fetchUniqueNews(query);
  const article = res.article;

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: article.title,
    description: article.description || article.title,
    openGraph: {
      title: article.title,
      description: article.description || article.title,
      images: article.image ? [article.image] : [],
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const query = params.slug;
  const res = await fetchUniqueNews(query);

  if (!res.article) {
    return (
      <section className="min-h-screen py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center">No Article Found</h2>
          <p className="text-center">
            There is currently no article available.
          </p>
        </div>
      </section>
    );
  }

  const article = res.article;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString();
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.description || article.title,
    image: article.image ? [article.image] : [],
    datePublished: formatDate(article.date),
    dateModified: formatDate(article.updated),
    author: article.author
      ? {
          "@type": "Person",
          name: article.author,
        }
      : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://yoursite.com/articles/${params.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div className="container mx-auto px-4 md:px-8 lg:px-20 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {article.title}
        </h1>
        <div className="flex items-start md:items-center flex-col md:flex-row text-sm text-gray-600 mb-8">
          <div>
            <time dateTime={article.date}>{article.date}</time> -{" "}
            <span>Updated on: {article.updated}</span>
          </div>
          {article.author && (
            <>
              <span className="mx-2">•</span> <span>by {article.author}</span>
            </>
          )}
          {article.source && (
            <div className="flex">
              <span className="mx-2">•</span>
              <a
                href={article.source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Original Source
              </a>
            </div>
          )}
        </div>
        {article.image && (
          <div className="relative w-full h-96 md:h-[35rem] mb-8">
            <Image
              src={article.image}
              alt={article.title || ""}
              width={2000}
              priority
              height={2000}
              className="object-cover w-full h-full rounded-lg shadow-lg"
            />
          </div>
        )}
        <article className="prose prose-lg max-w-none">
          {article.content && parse(article.content)}
        </article>
      </div>
    </>
  );
}
