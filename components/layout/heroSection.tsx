export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-sky-100 to-gray-100 min-h-screen flex items-center">
      <div className="container  px-4 md:px-8 lg:px-20 mx-auto relative">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-8">
            Your Daily Source for{" "}
            <span className="text-primary relative inline-block">
              Finance & Market News
              <span className="absolute bottom-0 left-0 w-full h-2 bg-primary/20 -z-10" />
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Discover in-depth articles, breaking news, and expert analysis on
            finance, stocks, and cryptocurrency markets - all curated for you in
            one place.
          </p>
        </div>
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>
      <div className="absolute right-24 top-1/3 hidden lg:block">
        <div className="w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
      </div>
    </section>
  );
}
