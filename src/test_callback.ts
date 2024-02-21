
import { TestData } from "./test_data.js";

export class TestCallback {
    //インデックスシグネチャでコールバック関数を定義
    private callbacks: { [trigger: string]: Function } = {};

    // コールバック関数を登録するメソッド
    public on(trigger: string, callback: Function) {
        this.callbacks[trigger] = callback;
    }
    // 登録されたコールバック関数を実行するメソッド
    public executeCallback(trigger: string, data: any) {
        const callback = this.callbacks[trigger];
        if (callback) {
            callback(data);
        } else {
            console.error("No callback function registered for trigger:", trigger);
        }
    }
    public async start_notify() {
        for (let i = 0; i < 3; i++) {
            console.log(i);
            const data = new TestData(`./test_data/test${i}.json`, 1000 + i * 1000, this);
        }
    }
}