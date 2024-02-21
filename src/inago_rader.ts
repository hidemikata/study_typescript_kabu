import { PriceChangedCounter } from "./price_changed_counter.js";

type InagoSaveTime = {
    time: number
    count: number
};

export class InagoRader {
    private inago_duration: number;
    private inago_judgement_num: number;

    private map_of_inago_each_code = new Map<string, InagoSaveTime[]>();

    //秒
    constructor(duration: number, inago_judgement_num: number) {
        this.inago_duration = duration;
        this.inago_judgement_num = inago_judgement_num;
    }

    public addData(code: number, counter: PriceChangedCounter): void {

        const currentTime: number = Math.floor(new Date().getTime() / 1000); // 現在時刻を秒単位で取得

        const codeStr = code.toString(); // コードを文字列に変換して再利用
        const newEntry = {
            time: currentTime,
            count: counter.getCount(codeStr)
        };

        let inago = this.map_of_inago_each_code.get(codeStr);

        // inagoが未定義、または空の場合は新規に配列を作成または更新する
        if (!inago) {
            inago = [newEntry];
        } else {
            // inagoが2つのエントリを持ち、最新のエントリが一定期間より古い場合、最古のエントリを削除
            if (inago.length === 2 && inago[0].time + this.inago_duration < currentTime) {
                inago.shift();
            }
            // 配列が満杯でない、または最新のエントリが更新基準を満たす場合は新規エントリを追加
            if (inago.length < 2 || inago[inago.length - 1].time + this.inago_duration < currentTime) {
                inago.push(newEntry);
            }
        }

        // 更新されたinago配列をMapにセットする
        this.map_of_inago_each_code.set(codeStr, inago);
    }

    public is_inago(code: number): boolean {

        let inago = this.map_of_inago_each_code.get(code.toString())

        if (inago === undefined || inago.length != 2) {
            return false;
        }

        if (inago[1].count - inago[0].count >= this.inago_judgement_num) {
            return true;
        } else {
            return false;
        }
    }
}