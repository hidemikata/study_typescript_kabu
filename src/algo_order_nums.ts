import { AlgoBase } from "./algo_base.js";

export class AlgoOrderNums extends AlgoBase {

    private count_order(): number {

        return 1;
    }

    public go_algo(): boolean {
        this.count_order();
        return true;
    }
}