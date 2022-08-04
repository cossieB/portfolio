export function throttle(cb: Function, delay = 1000) {
    let shouldWait = false;

    return (...args: unknown[]) => {
        if (shouldWait) {
            return
        }
        cb(...args)
        shouldWait = true;
        setTimeout(() => {
            shouldWait = false
        }, delay)
    }
}