Ingress Intel Total Conversion Japanese (IITC-ja)
=================================================

このソフトウェアは[IITC](https://github.com/iitc-project/ingress-intel-total-conversion)を日本向けにフォークし、カスタマイズしたものです。
IITCコミュニティ及び、IITC開発メンバーに感謝します。

## ユーザー

ダウンロード / インストール をしたい方は、こちらへ → https://ingress.love/iitc-ja/

G+コミュニティ等は準備中です。

## 開発者

このGitHubページを訪れていただきありがとうございます。
あなたの協力に感謝します。

### クイックスタート

ビルドにはPythonが必要です。(最新の2.xバージョンまたは、3.0以上)

このプロジェクトをフォークするにはあなたのマシンへクローンしてください。

`build.py local` を実行すると、スクリプトを構築します。
完了後 `build/local` へ出力されます。

`localbuildsettings.py` を編集することでビルドをカスタマイズできます。 - 詳細は `buildsettings.py` をご覧ください。

#### モバイル

モバイル版をビルドする場合Pythonに加え、下記のものが必要となります。

- The Java JDK (development kit - the runtime JRE is not enough)
- The Android SDK

`build.py mobile` を実行すると、IITC-ja Mobileをdebug modeでビルドします。

ノート: build.py にはIITCスクリプトを `mobile/res` 内にコピーする機能があります。
その為、(Eclipseなどから)直接ビルドするするとこの作業が行われず、動作しないアプリケーションがビルドされます。
