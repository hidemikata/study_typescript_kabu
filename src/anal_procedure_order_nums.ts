import { AnalProcedureBase } from "./anal_procedure_base.js";
import { db_search_ita_keta_more, db_insert_ita_keta_price_data } from './db/db_ita_keta_more.js';
import { ita_keta_more } from './db/db_init.js';

export class AnalProcedureOrderNums extends AnalProcedureBase {

    private async get_id(): Promise<number> {
        const ita_keta_data: ita_keta_more[] | undefined = await db_search_ita_keta_more(this.json.getCode());

        if (ita_keta_data === undefined) {
            console.error('faild ita keta more data (1).');
            return 0;
        }

        if (ita_keta_data.length === 0) {
            console.error('faild ita keta more data (2).');
            return 0;
        }

        return ita_keta_data[0].id;
    }

    public async go_anal_procedure() {
        let ita_keta_id = await this.get_id();

        db_insert_ita_keta_price_data(ita_keta_id, this.json.getCode(), this.json.getCurrentPrice()).then((result) => {
            if (result === false) {
                console.error('anal procedure insert NG.');
                return;
            }
        });

        return;
    }
}
