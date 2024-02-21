import { AlgoBase } from "./algo_base.js";

export class AlgoPrice extends AlgoBase {

    private analysis_buy_board(): boolean {

        return true;
    }

    public go_algo(): boolean {
        this.analysis_buy_board();
        return true;
    }


}