/* --------settings-------- */
/**
 * 検索クエリの初期値
 * @const {string}
 */
const DEFAULT_QUERY = 'VOCALOID OR UTAU OR CeVIOオリジナル曲 OR NEUTRINO(歌声合成エンジン) OR NEUTRINOオリジナル曲 OR VOICEROIDオリジナル曲 OR A.I.Voiceオリジナル曲 OR SynthesizerV OR SynthesizerVオリジナル曲 OR SynthVオリジナル曲 OR ソフトウェアシンガー OR VOCALOIDオリジナル曲 OR ミクオリジナル曲 OR リンオリジナル曲 OR レンオリジナル曲 OR ルカオリジナル曲 OR KAITOオリジナル曲 OR MEIKOオリジナル曲 OR GUMIオリジナル曲 OR UTAUオリジナル曲 OR ボカロオリジナル曲 OR 可不オリジナル曲 OR AIきりたんオリジナル曲 OR 知声 OR 知声(CeVIO) OR 星界 OR VOCALOID新曲リンク OR VOCALOID殿堂入り OR プロセカ公式 -ニコカラ -ニコニコカラオケDB -ボカロカラオケDB -歌ってみた -踊ってみた -PVつけてみた -VOCALOIDカバー曲 -UTAUカバー曲 -VOCALOID→VOCALOIDカバー -VOCALOID→UTAUカバー曲 -SynthesizerVカバー曲 -CeVIOカバー曲 ';

/**
 * 出題範囲下限の初期値
 * @const {number}
 */
const DEFAULT_BORDER = 250;

/**
 * ソート順の初期値
 * @const {string}
 */
const DEFAULT_SORT_TYPE = 'mylistCounter';

/**
 * 出題モードの初期値
 * @const {string}
 */
const DEFAULT_MODE = 'intro';

/**
 * ラントロ出題時に、曲の最後から何秒地点まで出題するかの設定
 * @const {number}
 */
const DEFAULT_LAST_MARGIN = 15;

/* --------niconicoAPI-------- */
/**
 * ニコニコ動画のスナップショット検索APIのエンドポイント
 * @see {@link https://site.nicovideo.jp/search-api-docs/snapshot}
 * @const {string}
 */
const SNAPSHOT_BASE_URL = 'https://api.search.nicovideo.jp/api/v2/snapshot/video/contents/search?targets=tagsExact&fields=contentId&_limit=1&_context=nicogacha';

/**
 * ニコニコ動画のiframeエンドポイント
 * @const {string}
 */
const IFRAME_BASE_URL = 'https://ext.nicovideo.jp/thumb/'

/* --------Yqui-------- */
/**
 * Yquiで自分が司会者の時に表示されるボタンのクラス名
 * @const {string}
 */
const MASTER_CLASS_NAME = 'MuiButtonBase-root MuiIconButton-root MuiIconButton-colorSecondary MuiIconButton-sizeLarge toggle-master-button css-1zh8l8';

/**
 * Yquiでプレイヤーの一覧が入るboxのクラス名
 * @const {string}
 */
const PLAYERS_AREA_CLASS_NAME = 'teams MuiBox-root css-0';

/**
 * Yquiでボタンを押していないプレイヤーに付けられるクラス名
 * @const {string}
 */
const UNSLASHED_CLASS_NAME = 'MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation2 push-order css-li77g6';

/**
 * Yquiでボタンを押したプレイヤーに付けられるクラス名
 * @const {string}
 */
const SLASHED_CLASS_NAME = 'MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation2 push-order pushed css-li77g6';

/* --------Discord-------- */
/**
 * Discordの音楽botのコマンド接頭辞
 * @const {string}
 */
const BOT_PREFIX = '$';
