import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

type Items = {
  [key: string]: string;
};

type Post = {
  data: {
    [key: string]: string;
  };
  content: string;
};

const POSTS_PATH = join(process.cwd(), '_posts');

const getPostFilePaths = () => {
  return fs.readdirSync(POSTS_PATH).filter((path) => /\.mdx?$/.test(path));
};

export const getPost = (slug: string): Post => {
  const fullPath = join(POSTS_PATH, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return { data, content };
};

export const getPostItems = (filePath: string, fields: string[] = []): Items => {
  const slug = filePath.replace(/\.mdx?$/, '');
  const { data, content } = getPost(slug);

  const items: Items = {};

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = slug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
};

export const getAllPosts = (fields: string[] = []): Items[] => {
  const filePaths = getPostFilePaths();
  const posts = filePaths
    .map((filePath) => getPostItems(filePath, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
};
