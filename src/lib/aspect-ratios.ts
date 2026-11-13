export const DEFAULT_ASPECT_RATIO = 16 / 9;
export const SLIDE_WIDTH = 1920;

export function getSlideAspectRatios(slides: { aspectRatio?: number }[]): number[] {
    let currentRatio = DEFAULT_ASPECT_RATIO;

    return slides.map((slide, index) => {
        if (slide.aspectRatio !== undefined) {
            if (
                typeof slide.aspectRatio !== "number" ||
                !Number.isFinite(slide.aspectRatio) ||
                slide.aspectRatio <= 0 ||
                !Number.isFinite(slide.aspectRatio * SLIDE_WIDTH) ||
                !Number.isFinite(SLIDE_WIDTH / slide.aspectRatio)
            ) {
                throw new Error(`Invalid aspectRatio on slide ${index + 1}: expected a positive finite ratio with finite slide dimensions.`);
            }
            currentRatio = slide.aspectRatio;
        }

        return currentRatio;
    });
}
