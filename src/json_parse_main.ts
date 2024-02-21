export class JsonParseMain {
    public recieved_json: string;
    public parsed_json;

    constructor(json: string) {
        this.recieved_json = json;
        this.parsed_json = JSON.parse(this.recieved_json);

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

    getAllNumSell(): number {
        let count: number = 0;
        count += this.parsed_json.Sell1.Qty;
        count += this.parsed_json.Sell2.Qty;
        count += this.parsed_json.Sell3.Qty;
        count += this.parsed_json.Sell4.Qty;
        count += this.parsed_json.Sell5.Qty;
        count += this.parsed_json.Sell6.Qty;
        count += this.parsed_json.Sell7.Qty;
        count += this.parsed_json.Sell8.Qty;
        count += this.parsed_json.Sell9.Qty;
        count += this.parsed_json.Sell10.Qty;

        return count;

    }
    getAllNumBuy(): number {
        let count: number = 0;
        count += this.parsed_json.Buy1.Qty;
        count += this.parsed_json.Buy2.Qty;
        count += this.parsed_json.Buy3.Qty;
        count += this.parsed_json.Buy4.Qty;
        count += this.parsed_json.Buy5.Qty;
        count += this.parsed_json.Buy6.Qty;
        count += this.parsed_json.Buy7.Qty;
        count += this.parsed_json.Buy8.Qty;
        count += this.parsed_json.Buy9.Qty;
        count += this.parsed_json.Buy10.Qty;

        return count;
    }




}