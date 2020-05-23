![Build](https://github.com/515hikaru/pnovel/workflows/Build/badge.svg)

[![dockeri.co](https://dockeri.co/image/515hikaru/pnovel)](https://hub.docker.com/r/515hikaru/pnovel)

**WIP**: 開発中です。

# pnovel
Pixiv小説用ツール

# How To Install

## NPM

```
# @515hikaru のパッケージをインストールするときだけ GitHub のレジストリを利用するように設定
npm config set @515hikaru:registry https://npm.pkg.github.com/515hikaru
npm install @515hikaru/pnovel
```

## Docker

```
docker pull 515hikaru/pnovel:0.3.9
```

利用例としては下記:

```
docker run --rm -v $(pwd):/work 515hikaru/pnovel:0.3.2 pnovel /work/main.pnovel > main.txt
```

## Before

```
# はじめに

春はあけぼの
ようよう白くなりry

枕草子をいきなり空で書くなんて無理だったわ。

「会話文」

「改行
もできる？」

文章でも改行をしたいときは

と1行あけます。

空白行をつかいたいときは、上下に空行を挟んで、

[newline]

と書きます

% % から始まる行はコメントです。消えます。 % TODO なんとか みたいに使いましょう
```

## After

```
[chapter:はじめに]
　春はあけぼのようよう白くなりry
　枕草子をいきなり空で書くなんて無理だったわ。
「会話文」
「改行もできる？」
　文章でも改行をしたいときは
　と1行あけます。
　空白行をつかいたいときは、上下に空行を挟んで、

　と書きます
```
