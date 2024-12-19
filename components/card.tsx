import { Article } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

export default function Card({ article }: { article: Article }) {
  return (
    <Link
      key={article.id}
      href={`/articles/${article.id}`}
      className="block h-96 w-full bg-zinc-100 rounded-lg group"
    >
      <div className="h-full w-full rounded-lg overflow-hidden transition-all duration-300 ease-in-out group-hover:-translate-y-1">
        {article.image && (
          <div className="relative w-full h-4/6">
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        )}
        <div className="h-1/4 flex flex-col justify-center">
          <p className="text-sm text-gray-500 mt-1">
            {article.date} {article.author && ` - by ${article.author}`}
          </p>
          <h3 className="font-medium text-gray-800 line-clamp-4">
            {article.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
