# taisei-document-portal-front

## 環境構築

- node version

voltaを使用すると簡単に設定できます。

```
"node": "22.16.0"
```

- 環境構築手順

[.env.keys（環境変数用の秘密鍵）](https://drive.google.com/file/d/176fEONTA3dOpWf_4NB6jeTVYoPAJMbx1/view?usp=drive_link)をダウンロードしファイル名を`.env.keys`に変更する。その後プロジェクトのルートディレクトリに配置すること。

```bash
npm install
npm run dev
```

## 環境変数更新手順

```
1.復号化する
  npx dotenvx decrypt -f .env.dev
  npx dotenvx decrypt -f .env.stg
  npx dotenvx decrypt -f .env.prod
2.対象のenvファイルの中身が平文に戻っているので、編集する
3.ファイル暗号化して、コミットする
  npx dotenvx encrypt -f .env.dev
  npx dotenvx encrypt -f .env.stg
  npx dotenvx encrypt -f .env.prod
```

## フォルダ構成

```
src
├── __mocks__/ # モック関連のファイル (未実装)
├── assets/ # 画像やフォントなどの静的ファイル
│       ├── images/
│       └── styles/
├── components/ # アプリケーション全体で使用されるコンポーネント
│       ├── pages/ # 各ページのコンポーネント
│       ├── domain/ # domainに関心を持つコンポーネント
│       └── ui/ # ドメインに関心をもたない見た目に関するコンポーネント。Modalなど少し大きめのコンポーネントも含む
├── domain/ # ドメインモデルを表すレイヤー
├── repositories/ # 主に外部と通信を行うレイヤー
├── usecases/ # ユーザーがしたいと思うひとまとまりの処理を表現するレイヤー
├── store/ # zustandを使用したglobal stateを管理
├── lib/ # ライブラリをラップして使う場所、設定も含む
├── shared/ # アプリケーション全体で共有したいコード
├── utils/ # 便利な関数を入れる場所 何でも入れられるのでutilsに入れるかどうかよく考える
└── routes/ # ルーティング設定
```

#####
test123456