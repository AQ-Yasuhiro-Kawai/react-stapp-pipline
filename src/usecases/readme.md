# Usecase

Usecaseは「ユーザーがしたいと思うひとまとまりの処理」を表現するレイヤーです。主に属するのは以下です。

- 取得したデータのキャッシュを伴うread系のusecase（reader.ts）
- 取得したデータのキャッシュを伴わないwrite系のusecase（usecase.ts）
- キャッシュのkeyやmutatorの定義（cache.ts）
