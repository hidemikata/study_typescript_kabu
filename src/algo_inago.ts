import { AlgoBase } from "./algo_base.js";
import { InagoRader } from "./inago_rader.js";

export class AlgoInago extends AlgoBase {

    private async is_inago(): Promise<boolean> {
        return await InagoRader.is_inago(this.json.getCode());

    }

    public go_algo() {
        this.is_inago().then((result) => {
            return result;
        });
    }



}