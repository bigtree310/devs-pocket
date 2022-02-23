import type { NextPage, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Link from 'next/link';
import { getPosts } from '../lib/postlib';

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Logo = () => (
  <Image src="/dp-circle.svg" alt="dp Logo" width={72} height={16} />
);

export const getStaticProps = async () => {
  const posts = await getPosts();
  return {
    props: {
      posts
    }
  };
}

const getPostList = (posts: any[]) => {
  return (
    posts.map(
      (post) =>
      (
        <Link href={`/post/${post.id}/${post.slug}`} key={`${post.slug}-key`}>
          <a>{post.title}</a>
        </Link>
      )
    )
  );
}

const Home: NextPage<Props> = ({ posts }) => {
  const title = 'Developer\'s pocket';
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="developer pocket" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <Logo></Logo>
      </header>

      <main className={styles.main}>
        {getPostList(posts)}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.logo}>
            <Image src="/Pyocota.svg" alt="pyoco pyoco" width={64} height={64} />
          </span>
          ぴょこ
        </a>
      </footer>
    </div>
  )
}

export default Home
