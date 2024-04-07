
import { getBoard } from "./get_board.js";
import { JsonParseMain } from "./json_parse_main.js";
import do_sell_kabu from './db/db_sell_kabu.js';

export class OrderWacher {

    private map_of_order_wacher = new Map<string, NodeJS.Timeout>();

    public registOrderWatcherForFix(code: number): string {

        const timer = setTimeout(async () => {
            const data: JsonParseMain | undefined = await getBoard(code);
            if (data === undefined) {
                return;
            }
            const sell_price = data.AskPrice();

            do_sell_kabu(code.toString(), sell_price)

        }, 6000);
        const tiemrId = this.generateUniqueString(8);
        console.log('timer = ', tiemrId);

        this.map_of_order_wacher.set(tiemrId, timer);

        return tiemrId;
    }

    public clearOrderFixTimer(timerId: string) {
        const timer = this.map_of_order_wacher.get(timerId);
        clearTimeout(timer)
    }

    private generateUniqueString(length: number = 8): string {
        // 使用する文字を定義します。大文字、小文字、数字を含む
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

}


