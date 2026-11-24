export let currentSlide = 0;
export let slideAnimations: number[] = [];
export let slideAnimationGroups: Map<string, number>[] = [];
let slideAnimationOrdering: ("automatic" | "explicit" | undefined)[] = [];

export function setCurrentSlide(slide: number) {
    currentSlide = slide;
    slideAnimations[slide] = 0;
    slideAnimationGroups[slide] = new Map();
    slideAnimationOrdering[slide] = undefined;
}

export function getAnimationIndex(group?: string, order?: number): number {
    const mode = order === undefined ? "automatic" : "explicit";
    if (slideAnimationOrdering[currentSlide] && slideAnimationOrdering[currentSlide] !== mode) {
        throw new Error(`All reveals on slide ${currentSlide + 1} must either specify an order or omit it.`);
    }
    if (order !== undefined && (!Number.isSafeInteger(order) || order < 0)) {
        throw new Error(`Reveal order on slide ${currentSlide + 1} must be a non-negative safe integer.`);
    }
    slideAnimationOrdering[currentSlide] = mode;

    if (group) {
        const groups = slideAnimationGroups[currentSlide];
        const groupOrder = groups.get(group);
        if (groupOrder !== undefined) {
            if (order !== undefined && order !== groupOrder) {
                throw new Error(`Reveal group "${group}" on slide ${currentSlide + 1} has conflicting orders.`);
            }
            return groupOrder;
        }

        const animation = order ?? slideAnimations[currentSlide]++;
        groups.set(group, animation);
        return animation;
    }

    return order ?? slideAnimations[currentSlide]++;
}
