
import { JsonParseMain } from "./json_parse_main.js";
import { AlgoPrice } from "./algo_price.js";
import { AlgoOrderNums } from "./algo_order_nums.js";
import { AlgoBase } from "./algo_base.js";
import db_buy_kabu from "./db/db_buy_kabu.js";
import db_sell_kabu from "./db/db_sell_kabu.js";
import { InagoRader } from "./inago_rader.js";
import db_search_buying_data from './db/db_search_buying_data.js';
import { trade_table } from './db/db_init.js';


export class MessageAnalysis {
    public json: JsonParseMain;
    private buy_algos: AlgoBase[];
    private sell_algos: AlgoBase[];

    constructor(json: JsonParseMain) {
        this.json = json;
        this.buy_algos = [new AlgoPrice(json)];
        this.buy_algos.push(new AlgoOrderNums(json));

        this.sell_algos = [];

    }

    public async start() {
        const current_price = this.json.getCurrentPrice();
        //console.log(current_price);

        const buying_data: trade_table[] | undefined = await db_search_buying_data(this.json.getCode());
        if (buying_data === undefined) {
            console.error('faild get buying data.');
            return false;
        }

        if (buying_data.length === 0) {
            //console.error('Error alrady exist buying data');
            this.buy();
        } else {
            this.sell();
        }

    }

    private async buy() {

        const inago = await InagoRader.is_inago(this.json.getCode());
        if (!inago) {
            //console.log('not inago. nothing to do.');
            return;
        }

        let buy_jadge: number | undefined;
        for (const algo of this.buy_algos) {
            const ret = algo.go_algo();
            buy_jadge = (buy_jadge === undefined) ? ret ? 1 : 0 : buy_jadge & (ret ? 1 : 0);
        }

        if (buy_jadge === 1) {
            db_buy_kabu(this.json.getCode(), this.json.BidPrice());
            return;//買ったら一度逃がす。
        }
    }

    private async sell() {

        let sell_jadge: number | undefined;
        for (const algo of this.sell_algos) {
            const ret = algo.go_algo();
            sell_jadge = (sell_jadge === undefined) ? ret ? 1 : 0 : sell_jadge & (ret ? 1 : 0);
        }

        sell_jadge = 1;//debug必ず売りに行く。

        if (sell_jadge === 1) {
            db_sell_kabu(this.json.getCode(), this.json.AskPrice());
            return;
        }
    }
}


