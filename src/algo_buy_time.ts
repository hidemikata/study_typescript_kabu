import { AlgoBase } from "./algo_base.js";
import { get_time } from './now_iso8601.js';

export class AlgoBuyTime extends AlgoBase {
    private isTimeBetween(startTime: string, endTime: string, targetTime: string): boolean {
        const startTimeArray = startTime.split(":").map(Number); // 時間を数値に変換
        const endTimeArray = endTime.split(":").map(Number); // 時間を数値に変換
        const targetTimeArray = targetTime.split(":").map(Number); // 時間を数値に変換

        const startMinutes = startTimeArray[0] * 60 + startTimeArray[1]; // 開始時間の合計分数を計算
        const endMinutes = endTimeArray[0] * 60 + endTimeArray[1]; // 終了時間の合計分数を計算
        const targetMinutes = targetTimeArray[0] * 60 + targetTimeArray[1]; // 対象時間の合計分数を計算

        return targetMinutes >= startMinutes && targetMinutes <= endMinutes;
    }

    private is_ignore_time_zenba(target_time: string): boolean {
        return this.isTimeBetween("11:25:00", "11:35:00", target_time)
    }

    private is_ignore_time_goba(target_time: string): boolean {
        return this.isTimeBetween("14:55:00", "15:05:00", target_time)
    }

    private check_buy_time(): boolean {
        const jikan_fun_byou = get_time().split("T")[1];
        return !(this.is_ignore_time_zenba(jikan_fun_byou) || this.is_ignore_time_goba(jikan_fun_byou))
    }

    public go_algo() {
        return this.check_buy_time();
    }


}