export function get_time(): string {
    const japanTimezoneOffset = 9 * 60 * 60 * 1000; // 9時間 * 60分 * 60秒 * 1000ミリ秒
    const currentTime: number = Math.floor((new Date().getTime() + japanTimezoneOffset) / 1000); // 現在時刻を秒単位で取得
    const date = new Date(currentTime * 1000);
    const dateIsoString: string = date.toISOString();
    return dateIsoString;
}