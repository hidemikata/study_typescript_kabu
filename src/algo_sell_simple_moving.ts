import { AlgoBase } from "./algo_base.js";
import db_search_buying_data from './db/db_search_buying_data.js';
import { trade_table } from './db/db_init.js';

export class AlgoSellSimpleMoving extends AlgoBase {

    private async analysis_sell(): Promise<boolean> {
        const buying_data: trade_table[] | undefined = await db_search_buying_data(this.json.getCode());

        if (buying_data === undefined) {
            console.error('faild get buying data.');
            return false;
        }

        if (buying_data.length === 0) {
            return false;
        }

        if (this.shouldExecuteAction(buying_data[0].buy_price * 1.0, this.json.AskPrice() * 1.0)) {//currentpriceではなく売れる金額で計算
            console.log('sell true: price is over')
            return true;
        }

        return false;

    }
    private shouldExecuteAction(buy_price: number, current_price: number): boolean {
        // 相対差を計算する
        const diff_price = current_price - buy_price;
        const difference = Math.abs(diff_price);
        const percentageDifference = (difference / current_price) * 100;

        // 相対差が0.1%以上であるか判断する
        if (diff_price < 0) {
            //損失
            return percentageDifference >= 0.50;
        } else {
            //利益
            return percentageDifference >= 1.00;
        }
    }

    public async go_algo() {
        return await this.analysis_sell();
    }


}