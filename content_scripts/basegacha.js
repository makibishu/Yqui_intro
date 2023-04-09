/**
 * ガチャの基本形
 *
 * ※自分でガチャをカスタマイズする際にはこれを継承したGacha.jsを使用してください
 */
class BaseGacha {
    constructor(
        query=DEFAULT_QUERY,
        border=DEFAULT_BORDER,
        sortType=DEFAULT_SORT_TYPE
    ){
        this.query = query;
        this.border = border;
        this.sortType = sortType;
    }

    /**
     * インスタンス変数を元に検索URLを生成する
     * @return {string}
     */
    generateUrl(){
        return chrome.storage.local.get(
            ['query', 'border', 'sortType']
        ).then((locals) => {
            this.query = locals.query;
            this.border = locals.border;
            this.sortType = locals.sortType;

            return `${SNAPSHOT_BASE_URL}&q=${this.query}` +
                `&_offset=${this.generateOffset()}&_sort=${this.sortType}`;
        })
    }

    /**
     * インスタンスに設定された下限順位以下のランダムな自然数を返す
     * @return {number}
     */
    generateOffset(){
        return Math.floor(Math.random() * this.border);
    }

    /**
     * ラントロの出題秒数を抽選
     * @param max 曲の長さ
     * @param lastMargin　最後から何秒前まで出題するか
     * @return {number}
     */
    generateSeekTime(max, lastMargin=DEFAULT_LAST_MARGIN){
        return Math.floor(Math.random() * Math.max(max-lastMargin, 0))
    }
}
