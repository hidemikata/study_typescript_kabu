import { AlgoBase } from "./algo_base.js";
import { db_search_ita_keta_more, db_insert_ita_keta_more, db_delete_ita_keta_more } from './db/db_ita_keta_more.js';
import { ita_keta_more } from './db/db_init.js';

export class AnalAlgoOrderNums extends AlgoBase {

    private is_order_over(): boolean {
        if (this.json.getBuyQtyKeta() < this.json.getSellQtyKeta()) {//売り板のほうがでかい場合。
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

        return true;

    }

    private set_ita_keta_timer() {
        const second = 60;
        const timer = setTimeout(async () => {
            db_delete_ita_keta_more(this.json.getCode())
        }, second * 1000);
        return
    }

    public async go_algo() {
        global.db.run('BEGIN TRANSACTION');
        let exists: boolean = await this.is_already_exist();

        let order_over: boolean = this.is_order_over();

        if (order_over === true && exists === false) {
            let ret: boolean = await db_insert_ita_keta_more(this.json.getCode());
            if (ret) {
                global.db.run('COMMIT');
                this.set_ita_keta_timer();
            } else {
                global.db.run('ROLLBACK');
                return false;
            }

            return true;
        } else if (exists) {
            return true
        }

        return false;
    }
}
