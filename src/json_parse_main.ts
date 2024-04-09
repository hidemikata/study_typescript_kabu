export class JsonParseMain {
    public parsed_json;

    constructor(json: any, parse = true) {
        if (parse) {
            this.parsed_json = JSON.parse(json.toString());
        } else {
            this.parsed_json = json;
        }
    }

    getCurrentPrice() {
        return this.parsed_json.CurrentPrice;
    }

    getCode() {
        return this.parsed_json.Symbol;
    }
    BidPrice() {
        return this.parsed_json.BidPrice;
    }
    AskPrice() {
        return this.parsed_json.AskPrice;
    }

    getSell1Qty(): number {
        return this.parsed_json.Sell1.Qty;
    }
    getSell2Qty(): number {
        return this.parsed_json.Sell2.Qty;
    }
    getSell3Qty(): number {
        return this.parsed_json.Sell3.Qty;
    }
    getSell4Qty(): number {
        return this.parsed_json.Sell4.Qty;
    }
    getSell5Qty(): number {
        return this.parsed_json.Sell5.Qty;
    }

    getSell6Qty(): number {
        return this.parsed_json.Sell6.Qty;
    }

    getSell7Qty(): number {
        return this.parsed_json.Sell7.Qty;
    }

    getSell8Qty(): number {
        return this.parsed_json.Sell7.Qty;
    }

    getSell9Qty(): number {
        return this.parsed_json.Sell7.Qty;
    }

    getSell10Qty(): number {
        return this.parsed_json.Sell10.Qty;
    }
    getBuy1Qty(): number {
        return this.parsed_json.Buy1.Qty;
    }
    getBuy2Qty(): number {
        return this.parsed_json.Buy2.Qty;
    }
    getBuy3Qty(): number {
        return this.parsed_json.Buy3.Qty;
    }
    getBuy4Qty(): number {
        return this.parsed_json.Buy4.Qty;
    }
    getBuy5Qty(): number {
        return this.parsed_json.Buy5.Qty;
    }
    getBuy6Qty(): number {
        return this.parsed_json.Buy6.Qty;
    }
    getBuy7Qty(): number {
        return this.parsed_json.Buy7.Qty;
    }
    getBuy8Qty(): number {
        return this.parsed_json.Buy8.Qty;
    }
    getBuy9Qty(): number {
        return this.parsed_json.Buy9.Qty;
    }
    getBuy10Qty(): number {
        return this.parsed_json.Buy10.Qty;
    }

    getBuyQtyKeta(): number {
        let keta: number = 0;

        // 配列に購入数量を格納
        const buyQtys: number[] = [
            this.getBuy1Qty(),
            this.getBuy2Qty(),
            this.getBuy3Qty(),
            this.getBuy4Qty(),
            this.getBuy5Qty(),
            this.getBuy6Qty(),
            this.getBuy7Qty(),
            this.getBuy8Qty(),
            this.getBuy9Qty(),
            this.getBuy10Qty()
        ];

        // 配列の要素の中で最大の桁数を取得
        for (const qty of buyQtys) {
            const qtyLength = qty.toString().length;
            if (qtyLength > keta) {
                keta = qtyLength;
            }
        }

        return keta;
    }

    getSellQtyKeta(): number {
        let keta: number = 0;

        // 配列に売却数量を格納
        const sellQtys: number[] = [
            this.getSell1Qty(),
            this.getSell2Qty(),
            this.getSell3Qty(),
            this.getSell4Qty(),
            this.getSell5Qty(),
            this.getSell6Qty(),
            this.getSell7Qty(),
            this.getSell8Qty(),
            this.getSell9Qty(),
            this.getSell10Qty()
        ];

        // 配列の要素の中で最大の桁数を取得
        for (const qty of sellQtys) {
            const qtyLength = qty.toString().length;
            if (qtyLength > keta) {
                keta = qtyLength;
            }
        }

        return keta;
    }

    getAllNumSell(): number {
        let count: number = 0;
        count += this.getSell1Qty();
        count += this.getSell2Qty();
        count += this.getSell3Qty();
        count += this.getSell4Qty();
        count += this.getSell5Qty();
        count += this.getSell6Qty();
        count += this.getSell7Qty();
        count += this.getSell8Qty();
        count += this.getSell9Qty();
        count += this.getSell10Qty();

        return count;

    }
    getAllNumBuy(): number {
        let count: number = 0;
        count += this.getBuy1Qty();
        count += this.getBuy2Qty();
        count += this.getBuy3Qty();
        count += this.getBuy4Qty();
        count += this.getBuy5Qty();
        count += this.getBuy6Qty();
        count += this.getBuy7Qty();
        count += this.getBuy8Qty();
        count += this.getBuy9Qty();
        count += this.getBuy10Qty();

        return count;
    }




}