import { AlgoBase } from "./algo_base.js";
import { db_search_ita_keta_more, db_insert_ita_keta_more } from './db/db_ita_keta_more.js';
import { ita_keta_more } from './db/db_init.js';

export class AnalAlgoOrderNums extends AlgoBase {

    private is_order_over(): boolean {
        if (this.json.getBuyQtyKeta() > this.json.getSellQtyKeta()) {
            return true;
        }
        return false;
    }

    private async is_already_exist(): Promise<boolean> {
        const ita_keta_data: ita_keta_more[] | undefined = await db_search_ita_keta_more(this.json.getCode());

        if (ita_keta_data === undefined) {
            console.error('faild get buying data.');
            return false;
        }

        if (ita_keta_data.length === 0) {
            return false;
        }

        return false;

    }

    public go_algo() {
        let exists: boolean = false;
        this.is_already_exist().then((result) => {
            if (result) {
                console.log('exist ita_keta_more');
                exists = true;
            }
        });
        let order_over: boolean = false;
        if (this.is_order_over()) {
            order_over = true;
        }

        if (order_over === true && exists === false) {
            db_insert_ita_keta_more(this.json.getCode());
            //ここでタイマー起動。起動してita_keta_moreから消すというのをやる。
            return true;
        } else if (exists) {
            return true
        }

        return false;
    }
}
