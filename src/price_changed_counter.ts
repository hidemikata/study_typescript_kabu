import Undici from "../node_modules/undici-types/index.js";
import { JsonParseMain } from "./json_parse_main.js";

interface price_counter {
    counter: number
    current_price: number
}

export class PriceChangedCounter {

    private map_of_counter_each_code = new Map<string, price_counter>();

    constructor() {
        this.clear();
    }
    clear() {
        this.map_of_counter_each_code.clear();
    }

    add(data: JsonParseMain): void {
        const code = data.getCode();
        const new_current_price: number = data.getCurrentPrice();
        const old_counter_map = this.map_of_counter_each_code.get(code);

        if (old_counter_map && old_counter_map.current_price === new_current_price) {
            return;
        } else {
            console.log(new_current_price);
        }

        const new_count = (old_counter_map ? old_counter_map.counter : 0) + 1;

        this.map_of_counter_each_code.set(code,
            {
                counter: new_count,
                current_price: new_current_price
            });
    }

    getCount(code: string): number {

        const obj = this.map_of_counter_each_code.get(code);
        return obj ? obj.counter : 0;
    }






}