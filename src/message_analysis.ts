
import { JsonParseMain } from "./json_parse_main.js";
import { AlgoPrice } from "./algo_price.js";
import { AlgoOrderNums } from "./algo_order_nums.js";
import { AlgoPriceKeta } from "./algo_price_keta.js";
import { AlgoPreviousPrice } from "./algo_previous_price.js";
import { AlgoBuyTime } from "./algo_buy_time.js";
import { AnalAlgoOrderNums } from "./anal_algo_order_nums.js";
import { AnalProcedureOrderNums } from "./anal_procedure_order_nums.js";

//import { AlgoSellOrderNums } from "./algo_sell_order_nums.js";
import { AlgoBase } from "./algo_base.js";
import { AnalProcedureBase } from "./anal_procedure_base.js";
import db_buy_kabu from "./db/db_buy_kabu.js";
import db_sell_kabu from "./db/db_sell_kabu.js";
import db_search_buying_data from './db/db_search_buying_data.js';
import { trade_table } from './db/db_init.js';
import { OrderWacher } from './order_watcher.js';
import { AlgoSellSimpleMoving } from "./algo_sell_simple_moving.js";

interface AnalysisTrade {
    algo: AlgoBase;
    procedure: AnalProcedureBase;
}

export class MessageAnalysis {
    public json: JsonParseMain;
    private buy_algos: AlgoBase[];
    private anal_algos: AnalysisTrade[];
    private sell_algos: AlgoBase[];
    private order_watcher: OrderWacher;

    constructor(json: JsonParseMain) {
        this.json = json;
        this.buy_algos = [new AlgoPrice(json)];
        this.buy_algos.push(new AlgoOrderNums(json));
        this.buy_algos.push(new AlgoPriceKeta(json));
        this.buy_algos.push(new AlgoPreviousPrice(json));
        this.buy_algos.push(new AlgoBuyTime(json));

        this.order_watcher = new OrderWacher();

        this.sell_algos = [new AlgoSellSimpleMoving(json)];
        //this.sell_algos.push(new AlgoSellOrderNums(json));//とりあえずなし

        const analysis_trade1: AnalysisTrade = {
            algo: new AnalAlgoOrderNums(json),
            procedure: new AnalProcedureOrderNums(json)
        }
        this.anal_algos = [analysis_trade1];
    }

    public async start() {

        const buying_data: trade_table[] | undefined = await db_search_buying_data(this.json.getCode());

        if (buying_data === undefined) {
            console.error('faild get buying data.');
            return false;
        }
        this.analysis();

        if (buying_data.length === 0) {
            this.buy();
        } else {
            this.sell();
        }

    }
    private async analysis() {
        for (const algo_trade of this.anal_algos) {
            const algo = algo_trade.algo;
            const ret = algo.go_algo();
            if (ret === true) {
                algo_trade.procedure.go_anal_procedure();
            }
        }

    }

    private async buy() {

        let buy_jadge: number | undefined;
        for (const algo of this.buy_algos) {
            const ret = algo.go_algo();
            buy_jadge = (buy_jadge === undefined) ? ret ? 1 : 0 : buy_jadge & (ret ? 1 : 0);
            if (ret === false) {
                return;//一回でもfalseになったら買いに行かないのでreturnする
            }
        }

        if (buy_jadge === 1) {
            const interval_id = this.order_watcher.registOrderWatcherForFix(this.json.getCode());
            console.log('BUY!!!')
            db_buy_kabu(this.json.getCode(), this.json.BidPrice(), interval_id);
            return;
        }
    }

    private async sell() {

        let sell_jadge: number | undefined;
        for (const algo of this.sell_algos) {
            const ret = !!(await algo.go_algo());//booleanに変換
            sell_jadge = (sell_jadge === undefined) ? ret ? 1 : 0 : sell_jadge | (ret ? 1 : 0);//sellはまたはで評価
        }

        if (sell_jadge === 1) {
            console.log('SELL!!!')
            db_sell_kabu(this.json.getCode(), this.json.AskPrice());
        }
    }
}


