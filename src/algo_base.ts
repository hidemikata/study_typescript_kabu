import { JsonParseMain } from "./json_parse_main.js";

export class AlgoBase {
    protected json: JsonParseMain;

    constructor(json: JsonParseMain) {
        this.json = json;
    }

    public go_algo(): boolean {
        return true;
    }


}