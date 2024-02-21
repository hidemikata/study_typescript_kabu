export function get_time(): string {
    const currentTime: number = Math.floor(new Date().getTime() / 1000); // 現在時刻を秒単位で取得
    const date = new Date(currentTime * 1000);
    const dateIsoString: string = date.toISOString();
    return dateIsoString;
}