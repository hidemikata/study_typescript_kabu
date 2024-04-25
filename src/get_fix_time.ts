
import { get_time } from './now_iso8601.js';

function iso8601ToUnixTime(iso8601DateString: string): number {
    const unixTime = Date.parse(iso8601DateString); // ISO 8601形式の文字列をUnix時間に変換
    const unixTimeInSeconds = Math.floor(unixTime / 1000); // ミリ秒を秒に変換
    return unixTimeInSeconds;
}

function get_secoond_in_time(dist_time: string): number {
    const dist_second = iso8601ToUnixTime(dist_time);
    const corrent_seccond = iso8601ToUnixTime(get_time());
    return dist_second - corrent_seccond;

}

export function get_fix_time() {
    const today = get_time().split("T")[0];

    const time = get_time().split("T")[1];
    const jikan = time.split(":")[0];
    let fix_second = 0
    if (Number(jikan) < 12) {
        fix_second = get_secoond_in_time(today + "T11:28:00Z");
    } else {
        fix_second = get_secoond_in_time(today + "T14:58:00Z");
    }

    return fix_second
}


