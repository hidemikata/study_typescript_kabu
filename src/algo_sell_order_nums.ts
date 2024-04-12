import { AlgoBase } from "./algo_base.js";

export class AlgoSellOrderNums extends AlgoBase {

    private is_order_over(): boolean {
        if (this.json.getBuyQtyKeta() > this.json.getSellQtyKeta()) {
            return true;
        }
        return false;
    }

    public go_algo() {
        if (this.is_order_over()) {
            console.log('sell true:keta is over none');
            return true;
        }
        return false;
    }
}