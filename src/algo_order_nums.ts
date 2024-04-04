import { AlgoBase } from "./algo_base.js";

export class AlgoOrderNums extends AlgoBase {

    private is_order_over(): boolean {
        if (this.json.getBuyQtyKeta < this.json.getSellQtyKeta) {
            return true;
        }
        return false;
    }

    public go_algo(): boolean {
        if (this.is_order_over()) {
            console.log('keta is over');
            return true;
        }
        return false;
    }
}