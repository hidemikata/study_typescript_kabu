import { AlgoBase } from "./algo_base.js";

export class AlgoPriceKeta extends AlgoBase {

    private analysis_buy_board(): boolean {

        const price_int = Math.trunc(parseFloat(this.json.getCurrentPrice()));

        const price_length: number = price_int.toString().length;
        if (price_length < 5) {
            return true
        }
        return false;

    }

    public go_algo() {
        return this.analysis_buy_board();
    }


}