
import { JsonParseMain } from "./json_parse_main.js";
import { AlgoPrice } from "./algo_price.js";
import { AlgoOrderNums } from "./algo_order_nums.js";
import { AlgoBase } from "./algo_base.js";
import db_buy_kabu from "./db/db_buy_kabu.js";
import db_sell_kabu from "./db/db_sell_kabu.js";
import db_search_buying_data from './db/db_search_buying_data.js';
import { trade_table } from './db/db_init.js';
import { OrderWacher } from './order_watcher.js';


export class MessageAnalysis {
    public json: JsonParseMain;
    private buy_algos: AlgoBase[];
    private sell_algos: AlgoBase[];
    private order_watcher: OrderWacher;

    constructor(json: JsonParseMain) {
        this.json = json;
        this.buy_algos = [new AlgoPrice(json)];
        this.buy_algos.push(new AlgoOrderNums(json));
        this.order_watcher = new OrderWacher();

        this.sell_algos = [];

    }

    public async start() {
        const current_price = this.json.getCurrentPrice();

        const buying_data: trade_table[] | undefined = await db_search_buying_data(this.json.getCode());

        if (buying_data === undefined) {
            console.error('faild get buying data.');
            return false;
        }

        if (buying_data.length === 0) {
            this.buy();
        } else {
            //this.sell();//debug
        }

    }

    private async buy() {

        let buy_jadge: number | undefined;
        for (const algo of this.buy_algos) {
            const ret = algo.go_algo();
            buy_jadge = (buy_jadge === undefined) ? ret ? 1 : 0 : buy_jadge & (ret ? 1 : 0);
        }

        if (buy_jadge === 1) {
            const interval_id = this.order_watcher.registOrderWatcherForFix(this.json.getCode());
            db_buy_kabu(this.json.getCode(), this.json.BidPrice(), interval_id);
            return;
        }
    }

    private async sell() {

        let sell_jadge: number | undefined;
        for (const algo of this.sell_algos) {
            const ret = !!algo.go_algo();//booleanに変換
            sell_jadge = (sell_jadge === undefined) ? ret ? 1 : 0 : sell_jadge & (ret ? 1 : 0);
        }

        sell_jadge = 1;//debug必ず売りに行く。

        if (sell_jadge === 1) {
            db_sell_kabu(this.json.getCode(), this.json.AskPrice());
        }
    }
}


