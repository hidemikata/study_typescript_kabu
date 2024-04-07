import { JsonParseMain } from "./json_parse_main.js";

export abstract class AlgoBase {
    protected json: JsonParseMain;

    constructor(json: JsonParseMain) {
        this.json = json;
    }

    abstract go_algo(): any;


}