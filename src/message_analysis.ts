
import { JsonParseMain } from "./json_parse_main.js";
import { AlgoPrice } from "./algo_price.js";
import { AlgoBase } from "./algo_base.js";
import db_buy_kabu from "./db/db_buy_kabu.js";
import db_sell_kabu from "./db/db_sell_kabu.js";

export class MessageAnalysis {
    public json: JsonParseMain;
    private algos: AlgoBase[];

    constructor(json: JsonParseMain) {
        this.json = json;
        this.algos = [new AlgoPrice(json)];
    }

    public start() {
        const current_price = this.json.getCurrentPrice();
        console.log(current_price);

        for (const algo of this.algos) {
            const ret = algo.go_algo();
            if (ret) {
                db_buy_kabu(this.json.getCode(), this.json.BidPrice());
            }
        }

        売りと買いのロジックを検討する。
        for (const algo of this.algos) {
            const ret = algo.go_algo();
            if (ret) {
                db_sell_kabu(this.json.getCode(), this.json.AskPrice());
            }
        }


    }
}


