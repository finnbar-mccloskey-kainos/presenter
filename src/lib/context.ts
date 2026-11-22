export let currentSlide = 0;
export let slideAnimations: number[] = [];
export let slideAnimationGroups: Record<string, number>[] = [];
export function setCurrentSlide(slide: number) {
    currentSlide = slide;
    slideAnimations[slide] = 0;
    slideAnimationGroups[slide] = {};
}
export function getAnimationIndex(group?: string): number {
    if (group) {
        const groups = slideAnimationGroups[currentSlide];
        if (groups[group] !== undefined) return groups[group];

        const animation = slideAnimations[currentSlide];
        groups[group] = animation;
        slideAnimations[currentSlide] = animation + 1;
        return animation;
    }

    const animation = slideAnimations[currentSlide];
    slideAnimations[currentSlide] = animation + 1;
    return animation;
}
