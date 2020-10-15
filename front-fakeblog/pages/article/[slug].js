import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";

import Navbar from "../../components/Navbar/Navbar";
import Loading from "../../components/Loading/Loading";

const Article = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [article, setArticle] = useState();
  const [loading, setLoading] = useState(true);

  const getArticleBySlug = () => {
    setLoading(true);
    axios({
      method: "get",
      url: `https://fred-ihu-strapi-fakeblog.herokuapp.com/articles?slug=${slug}`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // console.log(res);
        setArticle(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getArticleBySlug();
  }, article);

  // console.log("ARTICLE HOOK CONTENT", article);

  return (
    <>
      <Head>
        <link rel="shortcun icon" href="/favicon.svg" />
        <title>{article ? article.title : null || ''}</title>
      </Head>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <article className="px-10 md:px-0">
          <img
            src={article ? article.image.url || '' : null || ''}
            alt="alt a changer"
            className="mt-8 mx-auto md:w-3/4 lg:w-3/4 xl:w-2/4 shadow-md"
          />
          <section className="mx-auto sm:w-full md:w-3/4 xl:w-2/4 mb-10">
            <div className="md:flex md:flex-row pt-8 justify-between items-baseline">
              <h1 className="font-bold text-gray-700 text-3xl">
                {article ? article.title : null}
              </h1>
              <h2 className="text-gray-600 text-md">
                By {article ? article.author.nickname : null}
              </h2>
            </div>
            <div className="inline-block bg-gray-200 px-4 py-1 mt-2 rounded-lg text-sm font-semibold text-gray-700">
              #{article ? article.category.name : null}
            </div>
            <p className="py-6 mt-6 text-gray-700 border-t-2">
              {article ? article.content : null}
            </p>
          </section>
        </article>
      )}
    </>
  );
};

export default Article;
