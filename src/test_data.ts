
import * as fs from "fs";
import { TestCallback } from "./test_callback.js";

export class TestData {

    constructor(private file_path: string, private duration: number, callback: TestCallback) {
        console.log('new TestData');

        const get_data = this.get_from_file(file_path, duration)
        get_data.then((message: string) => {
            callback.executeCallback('message', message)//exec callback
        });
        console.log('after then');
    }

    private async get_from_file(file_path: string, duration: number): Promise<string> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const message: string = fs.readFileSync(file_path, "utf8");
                resolve(message)
            }, duration);
        });

    }

}