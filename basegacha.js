/**
 * ガチャの基本形
 *
 * ※自分でガチャをカスタマイズする際にはこれを継承したGacha.jsを使用してください
 */

let bango;

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
			this.years = this.generateYear();
			this.yearStart = this.years[0];
			this.yearEnd = this.years[1];
			
			console.log(this.yearStart);
			

            return `${SNAPSHOT_BASE_URL}&q=${this.query}` +
                `&_offset=${this.generateOffset()}&_sort=${this.sortType}`+			`&filters[startTime][gte]=${this.yearStart}-01-01T00:00:00%2B09:00&filters[startTime][lt]=${this.yearEnd}-12-31T23:59:00%2B09:00`
				;
        })
    }

    /**
     * インスタンスに設定された下限順位以下のランダムな自然数を返す
     * @return {number}
     */
    generateOffset(){
		let lam = 1 / this.border;
		let U = Math.random();
		bango = Math.floor( -1 / lam* Math.log(U) );
		chrome.storage.local.set({bango: bango});
		console.log(bango);
		return bango;

        //return Math.floor(Math.random() * this.border);
    }
	
    generateYear(){
		let kakuritu = [6,6,6,7,7,7,8,8,8,9,9,9,10,10,10,4];
		let ruiseki = [];
		let k = 0;
		for ( var i = 0; i < kakuritu.length; i++){
			k += kakuritu[i];
			ruiseki.push(k);
		}
		
		let sum = kakuritu.reduce((a, b) => {
			return a + b;
		});
		
		let j = Math.floor(Math.random() * (sum - 1) + 1);
		
		console.log(kakuritu.length);
		
		for ( var i = 0; i < kakuritu.length; i++){
			if (j < ruiseki[i]+1){
				var Y = i + 2008;
				break;
			}
		}

		if (Y == 2008){
			var YY = 2007;
		}else{
			var YY = Y;
		}
		return [YY, Y]
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
