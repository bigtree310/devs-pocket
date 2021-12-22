---
title: "Next.jsとMarkdownで作るブログ"
---
# Next.jsとMarkdownで作るブログ

## 目標

テキスト形式のデータを残しつつ、記事にする。

## 仕様

1. 記事の表示

postsフォルダ直下の.mdファイルを記事として表示する

2. 記事の追加

postsフォルダ直下に.mdファイルを追加する

### 実現方法

使用するフレームワーク・ライブラリなどの説明

* [Next.js](https://nextjs.org/)

Reactベースのフレームワークである。<br />
SSR/SSGをする機能が特徴である。<br />
今回はSSGを使う。<br />

* [Vercel](https://vercel.com/)

フロントエンド向けホスティングサービス

* [remark](https://remark.js.org/)

[**Unified**](https://unifiedjs.com/)というプロジェクトに属している。<br />
Unifiedでは、あるコンテンツ⇒シンタックスツリー、シンタックスツリー⇒コンテンツに変換するようなツールを様々なパッケージで提供している。<br />
その中でもremarkではmarkdownの処理が可能である。<br />

* [gray-matter](https://github.com/jonschlinkert/gray-matter)

Front-matter(YAMLフォーマットでは```---```から```---```の部分)を解析するツール<br />
例.

```
---
title: "my page"
tags: "blog"
---

```

1. Next.jsのpre-rendering処理機能とDynamic Routes

* pre-rendering

getStaticProps：ビルド時にデータを取得する<br/>
getStaticPaths：データに元に動的ルートを指定する。<br />
[リファレンス](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation)

* Dynamic Routes

Next.jsではファイルシステムベースルーターを持つ。<br />
ルーターはディレクトリの```index```ファイルに自動的にルートとする。
ルートの起点は```pages/```
```
pages/index.js -> /

pages/blog/index.js -> /blog
```

ファイル名に```[]```を使うことで動的なルーティングが可能となる。<br />
```pages/post/[slug].js```と定義し、内部で
```
{ "slug" : "abc" }
```
というようにqueryオブジェクトを渡すことで```pages/post/abc```にルート可能になる。

2. markdown⇒html

解析のためのライブラリを組み合わせて実現する。<br />
remark、remark-htmlを使い、markdown⇒構文木⇒htmlに変換する。<br />
gray-matterで記事のタイトルや日付、タグ付けなどの付加情報を抽出できるようにする。

3. デプロイ

成果物をVercelにデプロイして公開する。

### デモ

* [github]()

* [page]()



