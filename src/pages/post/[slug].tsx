import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';

import Layout from '../../components/layout/Layout';
import Directions from '../../components/post/Directions';
import Ingrediants from '../../components/post/Ingrediants';
import Thumbnail from '../../components/UI/Thumbnail';
import { IPost } from '../../types/post';
import { SITE_URL } from '../../utils/constants';
import { getAllPosts, getPost } from '../../utils/mdxUtils';

const PostPage = ({ source, frontMatter }) => {
  const ogImage = `${SITE_URL}${frontMatter.thumbnail}`;

  return (
    <Layout pageTitle={frontMatter.title}>
      <Head>
        <meta name="description" content={frontMatter.description} key="description" />
        <meta property="og:description" content={frontMatter.description} key="ogDescription" />
        <meta property="og:image" content={ogImage} key="ogImage" />
      </Head>

      <article className="prose prose-green">
        <div className="mb-4">
          <Thumbnail title={frontMatter.title} src={frontMatter.thumbnail} />
        </div>

        <h1>{frontMatter.title}</h1>

        <p className="font-bold">yield: {frontMatter.yields}</p>

        <p>{frontMatter.description}</p>
      </article>
    </Layout>
  );
};

export default PostPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { content, data } = getPost(params?.slug as string);

  // const mdxSource = await serialize(content, { scope: data });

  return {
    props: {
      frontMatter: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts(['slug']);

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
