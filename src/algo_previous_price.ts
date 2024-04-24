import { AlgoBase } from "./algo_base.js";

export class AlgoPreviousPrice extends AlgoBase {

    private compare_previous_price(): boolean {
        if (this.json.getCurrentPrice() > this.json.getPreviousPrice()) {
            return true;
        }
        return false;
    }

    public go_algo() {
        if (this.compare_previous_price()) {
            return true;
        }
        return false;
    }
}
