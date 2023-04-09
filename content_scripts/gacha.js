class Gacha extends BaseGacha{
    constructor() {
        super();
    }

    /**
     * インスタンス変数を元に検索URLを生成する
     * @return {string}
     */
    generateUrl(){
        return super.generateUrl();
    }

    /**
     * インスタンスに設定された下限順位以下のランダムな自然数を返す
     * @return {number}
     */
    generateOffset(){
        return super.generateOffset();
    }

    /**
     * ラントロの出題秒数を抽選
     * @param max 曲の長さ
     * @param lastMargin　最後から何秒前まで出題するか
     * @return {number}
     */
    generateSeekTime(max, lastMargin=DEFAULT_LAST_MARGIN){
        return super.generateSeekTime(max, lastMargin);
    }
}