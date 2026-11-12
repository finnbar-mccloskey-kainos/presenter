export interface SlideModule {
    default: any;
    sectionTitle?: string;
}

export interface Presentation {
    slug: string;
    title: string;
    slides: SlideModule[];
}

const slideModules = import.meta.glob<SlideModule>("../slides/*/*.astro", {
    eager: true,
});

function toTitle(slug: string): string {
    return slug
        .split(/[-_]/)
        .filter(Boolean)
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
}

export function getPresentations(): Presentation[] {
    const grouped = new Map<string, [string, SlideModule][]>();

    for (const [path, slide] of Object.entries(slideModules)) {
        const [, slug, file] = path.match(/\.\.\/slides\/([^/]+)\/([^/]+)$/)!;
        if (!grouped.has(slug)) grouped.set(slug, []);
        grouped.get(slug)!.push([file, slide]);
    }

    return [...grouped.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([slug, files]) => ({
            slug,
            title: toTitle(slug),
            slides: files
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([, slide]) => slide),
        }));
}

export function getPresentation(slug: string | undefined): Presentation | undefined {
    return getPresentations().find((presentation) => presentation.slug === slug);
}
