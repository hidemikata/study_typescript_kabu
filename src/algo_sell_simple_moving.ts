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

        if (this.shouldExecuteAction(buying_data[0].buy_price * 1.0, this.json.getCurrentPrice() * 1.0)) {
            console.log('sell true: price is over')
            return true;
        }

        return false;

    }
    private shouldExecuteAction(currentValue: number, previousValue: number): boolean {
        // 相対差を計算する
        const difference = Math.abs(currentValue - previousValue);
        const percentageDifference = (difference / previousValue) * 100;

        // 相対差が0.1%以上であるか判断する
        return percentageDifference >= 0.50;
    }

    public async go_algo() {
        return await this.analysis_sell();
    }


}