export const limit = (text: string | null | undefined | number, length: number = 12, last: boolean = false) => {
    if (text === null || text === undefined) return '';
    if (typeof text === 'number') text = text.toString()
    return text.length > length ? (
        !last
            ? text.slice(0, length) + '...'
            : '...' + text.slice(-1 * length)
    ) : text
}