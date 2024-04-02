import { trade_table } from './db_init.js';

export default async function db_search_buying_data(code: string): Promise<trade_table | undefined> {

    return new Promise((resolve, reject) => {

        global.db.all("SELECT * FROM trades WHERE stock_code = ? and sell_price is null;", [code], (err, rows) => {

            if (err) {
                console.error('Error search table', err);
                reject(err)
            } else {
                //console.log('success search');
            }
            if (rows.length !== 1) {
                //console.error(`(code=${code})Error search table is not 1`);
                resolve(undefined);
            } else {
                resolve(rows[0]);
            }
        });
    });
}