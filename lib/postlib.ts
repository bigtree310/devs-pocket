import process from 'process';
import { readdir } from 'fs/promises';
import { join } from 'path';
import matter from 'gray-matter';
import fs from 'fs';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

export type Post = {
    title: string;
    slug: string;
    content: string;
};

const postsDirctroy: string = join(process.cwd(), 'posts');

const getPostFiles = async () => {
    const files = await readdir(postsDirctroy, { withFileTypes: true });
    return files.filter((dirent) => !dirent.isDirectory());
}

/**
 * .mdファイルのファイル名を取得する。.md以外はそのままのファイル名となる。
 * @param fileName  .mdファイル名
 * @returns .mdを除くファイル名
 */
const getPrefixFileName = (fileName: string) => {
    return fileName.replace(/\.md$/, '')
}

const getContent = (path: string) => {
    const file = fs.readFileSync(path, 'utf8');
    const { data, content } = matter(file);
    return {
        data: data,
        content: content
    };
}

export const mdTohtml = async (mdContent: string) => {
    const htmlContent = await remark().use(remarkHtml).process(mdContent)
    return htmlContent.toString();
}

/**
 * 全投稿を取得する。
 * @returns 全投稿
 */
export const getPosts = async () => {
    const files = await getPostFiles();
    const posts = await Promise.all(files.map((file, i) => {
        const fullPath = join(postsDirctroy, file.name);
        const { data, content } = getContent(fullPath);
        const slug = getPrefixFileName(file.name);
        const post = {
            id: i,
            title: data.title,
            slug: slug,
            mdContent: content
        };
        return post
    }));
    return posts;
}