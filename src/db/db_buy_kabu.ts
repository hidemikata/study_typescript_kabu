import db_search_buying_data from './db_search_buying_data.js';
import { trade_table } from './db_init.js';
import { get_time } from './../now_iso8601.js';



export default async function db_buy_kabu(code: string, price: number) {
    const buying_data: trade_table | undefined = await db_search_buying_data(code);
    if (buying_data !== undefined) {
        //console.error('Error alrady exist buying data');
        return false;
    }

    global.db.run(`INSERT INTO trades (stock_code, buy_price, buy_time)
    VALUES ('${code}', ${price}, '${get_time()}');`, (err) => {
        if (err) {
            console.error('Error buy kabu', err);
        } else {
            console.log('success buy kabu' + code);
        }
    });

    return true;
}