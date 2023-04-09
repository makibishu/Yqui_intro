/**
 * Discordの出題者用チャット宛てのWebhookURL
 *
 * 【※外部に漏れないように注意してください。※】
 * @see {@link https://discord.com/developers/docs/resources/webhook#execute-webhook}
 * @const {string}
 */
// ※ここにWebhookURLをコピペする※


/**
 * ニコニコ動画の動画詳細情報取得APIのエンドポイント
 * @see {@link https://dic.nicovideo.jp/a/%E3%83%8B%E3%82%B3%E3%83%8B%E3%82%B3%E5%8B%95%E7%94%BBapi#:~:text=getthumbinfo}
 * @const {string}
 */
const THUMB_BASE_URL = 'https://ext.nicovideo.jp/api/getthumbinfo/';

/**
 * DiscordのWebhookへのポストヘッダー
 * @const {Object}
 */
const HEADER = {'Content-Type': 'application/json'};

chrome.runtime.onMessage.addListener((request) => {
    let movieData = null;

    if (request.name === 'doGacha') {
        // 一旦スナップショット検索APIで抽選してから、getthumbinfoで改めて詳細を取得する
        fetch(request.url)
            .then(resp => {
                return resp.json()
            })
            .then(json => {
                return json['data'][0]['contentId']
            })
            .then(id => fetch(THUMB_BASE_URL + id)
                .then(resp => {
                    resp.text()
                        .then(txt => movieData = txt)
                        .catch(
                            () => movieData = '動画情報の取得に失敗しました。'
                        ).finally(() => sendMessage(movieData));
                }))
            .catch(() => movieData = '検索に失敗しました。')
            .finally(() => sendMessage(movieData));
    } else if (request.name === 'command') {
        // discordのWebhookにコマンドを投げる
        fetch(
            WEBHOOK_URL,
            {
                method: 'POST',
                headers: HEADER,
                body: JSON.stringify({'content': request.command})
            }
        ).catch(
            e => console.log(e)
        );
    }
})

// main.jsに情報を渡す
function sendMessage(movieData){
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(
            tabs[0].id, {
                name: 'movieData',
                data: {movieData}
            }
        )
    });
}
