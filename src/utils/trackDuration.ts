/**
 * Возвращает длительность трека в виде строки(в формате "минуты:секунды")
 * @param {Number} millis - Длительность трека в миллисекундах
 * @returns {String} возвращает строку
 */
export const millisToMinutesAndSeconds = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}