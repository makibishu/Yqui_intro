# Yqui-intro
Yquiの画面上でガチャ・再生を一括操作できるChrome拡張機能です。

現時点で、
- 再生数・コメント数・マイリスト数・いいね数順で指定した順位まで排出されるガチャ
- タグ検索のワード指定
- イントロ・ラントロ切り替え可能
- 誰かがボタンを押すと自動的に一時停止される

などの機能があります。

# 目次
* [動作イメージ](#動作イメージ)
* [前提](#前提)
* [導入方法](#導入方法)
* [使い方](#使い方)
* [困ったときは](#困ったときは)
* [【開発者向け】ガチャのカスタマイズ](#開発者向けガチャのカスタマイズ)

# 動作イメージ
![image](pic/image.png)

# 前提
PC版Google Chromeが必要です。
Mac OS・Linux等は動作確認していませんが、**たぶん**使えると思います。

# 導入方法
※以下の方法じゃ難しい！という方のために、Chrome拡張機能ストア経由での配布もできるように申請中です。
そちらは承認されるまで時間がかかるので、しばらくお待ちください。

①このページの上部にある「<>Code▼」という緑色のボタンをクリック

②「Download ZIP」をクリックし、好きな場所に保存、解凍する
![installation1](pic/installation_1.PNG)

③解凍したフォルダの中から、「fetch.js」というファイルを探し、「メモ帳」などで開く

④9行目「// ※ここにWebhookURLをコピペする※」の下に、別途Discordで送った1行を貼り付けて保存

![instllation2](pic/installation_2.PNG)

⑤PC版GoogleChromeでchrome://extensions/を開き、右上の「デベロッパーモード」をオンにする

⑥「パッケージ化されていない拡張機能を読み込む」を選択し、先ほど解凍したフォルダを選択

※もしかしたらこの手順のあと「安全性が確認されていません。本当に有効にしますか？」みたいな注意が出るかもしれないですが、安全なのでそのまま読み込んでください。
![installation3](pic/installation_3.PNG)

# 使い方
Yquiの部屋を作り、司会になれば自動で読み込まれると思います。

（一度司会になると司会を降りても表示され続ける不具合がありますが、ページを再読み込みすれば消えます。）

DiscordBotの再生機能を使うには、事前にDiscordの方で「$join」コマンドを使用しておいてください。
（これをしないと動きません。）

現時点で使用可能なBotは「ニコニコ流せるくん（初代・$のほう）」のみです。

Botの設定画面は、Chrome右上にあるジグソーパズルのようなボタンを押して、Yqui-introの部分をクリックすると表示されます。
右の画鋲のようなボタンを押しておくとジグソーパズルの横に表示されて便利です。

![usage](pic/usage.jpg)

# 困ったときは
まきびしに直接聞け！

# 投げ銭
音楽botなどを動かすためのレンタルサーバー代が毎月かかっています。

今後の継続的な開発・運営のためにご協力頂けると嬉しいです。

- [pixiv FANBOX](https://makibishu.fanbox.cc/)
- [Amazon欲しいものリスト](https://www.amazon.jp/hz/wishlist/ls/8O9UJH6950ZV?ref_=wl_share)

# 【開発者向け】ガチャのカスタマイズ
Gacha.js内のGachaクラスに定義されたメソッドを書き換えることで、ある程度自由にガチャのアルゴリズムを変えられる仕様になっています。

また、JavaScriptに詳しい方は他のファイルも改造することで好き放題できますので、ご自由にどうぞ。
（僕はJS初心者なので、かなり分かりづらい実装になっていると思います...。）

Chrome拡張特有の制約として、「background」に定義されたjsファイル（今回なら「fetch.js」）からしか外部APIを呼び出せなかったり、
「content_script」「popup」「background」間の変数のやり取りが面倒だったりするので、詳しくはご自身で調べつつ実装してみてください。

プルリクもお待ちしております！！！