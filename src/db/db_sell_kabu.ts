import db_search_buying_data from './db_search_buying_data.js';
import { trade_table } from './db_init.js';
import { get_time } from './../now_iso8601.js';

export default async function db_sell_kabu(code: string, price: number) {

    const buying_data: trade_table | undefined = await db_search_buying_data(code);

    if (buying_data === undefined) {
        //console.error('Error no buing data');
        return false;
    }

    const profit_loss: number = price - buying_data.buy_price;

    global.db.run(`update trades set sell_price = ${price}, sell_time = '${get_time()}', profit_loss = ${profit_loss}
        where id = ${buying_data.id};`, (err) => {
        if (err) {
            console.error('Error update sell kabu', err);
        } else {
            console.log('success sell kabu');
        }
    });

    return true;
}