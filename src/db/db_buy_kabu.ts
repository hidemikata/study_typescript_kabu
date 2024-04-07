import { get_time } from './../now_iso8601.js';



export default async function db_buy_kabu(code: string, price: number, interval_id: string) {

    global.db.run(`INSERT INTO trades (stock_code, interval_id, buy_price, buy_time)
    VALUES ('${code}', '${interval_id}', ${price}, '${get_time()}');`, (err) => {
        if (err) {
            console.error('Error buy kabu', err);
        } else {
            console.log('success buy kabu' + code);
        }
    });

    return true;
}