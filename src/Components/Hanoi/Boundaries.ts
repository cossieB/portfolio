export function getElementBounds(ref: React.RefObject<HTMLDivElement>) {
    const elem = ref.current!
    return {
        start: elem.getBoundingClientRect().left,
        end: elem.getBoundingClientRect().right
    }
}
export type HanoiBoundaries = {
    first: {
        start: number;
        end: number;
    };
    middle: {
        start: number;
        end: number;
    };
    last: {
        start: number;
        end: number;
    };
}

export function recalculateBoundaries(
    firstDiv: React.RefObject<HTMLDivElement>,
    middleDiv: React.RefObject<HTMLDivElement>,
    lastDiv: React.RefObject<HTMLDivElement>,
    setBoundaries: React.Dispatch<React.SetStateAction<HanoiBoundaries | undefined>>
) {

    let obj = {
        first: getElementBounds(firstDiv),
        middle: getElementBounds(middleDiv),
        last: getElementBounds(lastDiv)
    }
    setBoundaries(obj)
}