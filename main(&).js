// ボタン監視のためのクラスとその設定
const observer = new MutationObserver(pause);
const observerOptions = {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: ['class'],
        subtree: true
    };

const gachaClient = new Gacha();
const baseGacha = new BaseGacha();

// 現在の状況を管理するための変数
let playing = false;
let currentMovie = null;

let number = 1;

// 自分が司会になるまで待機
const waitingTaskId = setInterval(initialWait, 500);

function initialWait() {
    const isMaster =
        document.getElementsByClassName(MASTER_CLASS_NAME);

    if (isMaster.length){
        clearInterval(waitingTaskId);

        initialize(document.getElementsByClassName(PLAYERS_AREA_CLASS_NAME)[0]);
    }
}


async function initialize(root){
    const gachaBox = document.createElement('div');
    gachaBox.setAttribute('id', 'gachaBox');

    const songInfo = document.createElement('iframe');
    songInfo.setAttribute('id', 'songInfo');
    songInfo.setAttribute('width', '450');
    songInfo.setAttribute('height', '160');
    songInfo.setAttribute('scrolling', 'no');
    songInfo.setAttribute('frameborder', '0');

    const hyouki = document.createElement('textarea');
    hyouki.setAttribute('id', 'hyouki');
    hyouki.setAttribute('type', 'text');
    hyouki.setAttribute('value', '');
    hyouki.style.fontSize = '20px';

    const playButton = document.createElement('button');
    playButton.setAttribute('id', 'playButton');
    playButton.onclick = play;
    playButton.textContent = 'この曲を再生';

    const resumeButton = document.createElement('button');
    resumeButton.setAttribute('id', 'resumeButton');
    resumeButton.onclick = pause;
    resumeButton.textContent = '一時停止/再開';

    const stopButton = document.createElement('button');
    stopButton.setAttribute('id', 'stopButton');
    stopButton.onclick = stop_;
    stopButton.textContent = '停止';

    const gachaButton = document.createElement('button');
    gachaButton.setAttribute('id', 'gachaButton');
    gachaButton.onclick = doGacha;
    gachaButton.textContent = '次の曲へ'


    gachaBox.appendChild(songInfo);
    gachaBox.appendChild(hyouki);
    gachaBox.appendChild(playButton);
    gachaBox.appendChild(resumeButton);
    gachaBox.appendChild(stopButton);
    gachaBox.appendChild(gachaButton);
    root.appendChild(gachaBox);

    chrome.storage.local.set({
        query: DEFAULT_QUERY,
        border: DEFAULT_BORDER,
        sortType: DEFAULT_SORT_TYPE,
        mode: DEFAULT_MODE
    });
}

// main.jsからは外部APIに接続できないため、fetch.jsにURLを渡す
async function doGacha(){
    gachaClient.generateUrl().then(
        (url) => chrome.runtime.sendMessage({name: 'doGacha', url: url})
    )
}

async function play(){
    if(currentMovie){
        document.getElementById('playButton').disabled = true;
        const playersArea =
            document.getElementsByClassName(
                'players MuiBox-root css-0'
            )[0];

        observer.observe(playersArea, observerOptions);

        chrome.storage.local.get('mode').then( locals => {
            let command;
            if (locals.mode === 'intro'){
                command = `${BOT_PREFIX}yqp ${currentMovie.id}`;
            } else {
                const seek = gachaClient.generateSeekTime(currentMovie.length);
                command = `${BOT_PREFIX}yqpseek ${seek} ${currentMovie.id}`;
            }

            chrome.runtime.sendMessage({
                name: 'command',
                command: command
            });
        })
        number += 1;
        playing = true;
    }
}

async function pause(events=null){
    if (events instanceof PointerEvent){　// 司会が「一時停止/再開」ボタンを押した場合
        if(playing) {
            observer.disconnect()
            command = `${BOT_PREFIX}yqpause`
        } else {
            const playersArea =
                document.getElementsByClassName(
                    'players MuiBox-root css-0'
                )[0];

            observer.observe(playersArea, observerOptions);
            command = `${BOT_PREFIX}yqplay`
        }

        await chrome.runtime.sendMessage({
            name: 'command',
            command: command
        });

        playing = !playing
    } else { // 参加者が早押しボタンを押した場合
        if (playing){
            for (let e of events){
                if (e.oldValue === UNSLASHED_CLASS_NAME
                    && e.target.className === SLASHED_CLASS_NAME){
                    observer.disconnect();
                    await chrome.runtime.sendMessage({
                        name: 'command',
                        command: `${BOT_PREFIX}yqpause`
                    });
                    playing = !playing
                    break;
                }
            }
        }
    }
}

async function stop_(){
    observer.disconnect();
    await chrome.runtime.sendMessage({
        name: 'command',
        command: `${BOT_PREFIX}yqstop`
    });
    playing = false;
    document.getElementById('playButton').disabled = false;
}

chrome.runtime.onMessage.addListener((request, options) => {
    if (request.name === 'movieData') {
        const hyouki = document.getElementById('hyouki');

        const movieData = request.data.movieData;

        if (movieData !== null){
            if (movieData.startsWith('<?xml')){ // 正常なxmlが帰ってきた場合
                currentMovie = new Movie(movieData);

                songInfo.setAttribute(
                    'src',
                    `${IFRAME_BASE_URL}${currentMovie.id}`
                );

                hyouki.value = `${number}:${currentMovie.title}/${currentMovie.author}`;

            } else { // ガチャに失敗した場合エラーメッセージを表示
                songInfo.removeAttribute('src');
                currentMovie = null;
                const hyouki = movieData;
                console.log(hyouki); // デバッグ用コード

                hyouki.value = movieData;
            }
        }
    }
});
