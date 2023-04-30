/* --------settings-------- */
/**
 * 検索クエリの初期値
 * @const {string}
 */
const DEFAULT_QUERY = 'VOCALOID オリジナル曲';

/**
 * 出題範囲下限の初期値
 * @const {number}
 */
const DEFAULT_BORDER = 5000;

/**
 * 日付フィルターの始点初期値
 * @const {string}
 */
const DEFAULT_DATE_START = '2007-03-06'

/**
 * ソート順の初期値
 * @const {string}
 */
const DEFAULT_SORT_TYPE = 'viewCounter';

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
const SNAPSHOT_BASE_URL = 'https://api.search.nicovideo.jp/api/v2/snapshot/video/contents/search?targets=tags&fields=contentId&_limit=1&_context=nicogacha';

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
