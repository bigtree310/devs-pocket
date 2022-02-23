import { InferGetStaticPropsType, NextPage } from 'next'
import { getPosts, mdTohtml } from '../../lib/postlib'
import { GetStaticPathsResult } from 'next'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticPaths = async () => {
    const posts = await getPosts();
    const paths = posts.flatMap((post) =>
        ({ params: { slug: [post.id.toString(), post.slug] } }));

    const ret: GetStaticPathsResult = {
        paths: paths,
        fallback: false
    };
    return ret;
}

export const getStaticProps = async ({ params }: any) => {
    const posts = await getPosts();
    const post = posts.find((post) => post.id.toString() === params.slug[0]);
    const mdContent = post?.mdContent ? post.mdContent : ""
    const content = await mdTohtml(mdContent);
    return {
        props: {
            post: {
                ...post,
                content
            }
        }
    };
}

const Post: NextPage<Props> = ({ post }) => {
    return (<section>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </section>);
}

export default Post;