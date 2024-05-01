import { JsonParseMain } from "./json_parse_main.js";

export abstract class AnalProcedureBase {

    protected json: JsonParseMain;

    constructor(json: JsonParseMain) {
        this.json = json;
    }

    abstract go_anal_procedure(): any;


}