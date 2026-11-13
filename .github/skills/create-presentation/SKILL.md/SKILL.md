---
name: create-presentation
description: Used to create presentations in an Astro-based slides-as-code project based on prompts.
---

Throughout this skill, since Astro uses both {} and <> in syntax, I will use % for placeholders that you, the agent, are supposed to fill.

# How to create a presentation
1. If they haven't already told you in the prompt, make the user choose between having:
   - A single presenter name
   - Multiple presenters name
   - No presenter name
2. Ask the user for the speaker names based on their choice in step 1 if they haven't told you already.
3. Ask the user how long the presentation should last.
4. Decide on a presentation title, if the user hasn't already given you one
5. Create a directory: src/slides/%presentation-title-slug%
6. Create a config.ts file in the presentation directory. 
If there is a single speaker name:
```ts
export const speakerName = "%speaker-name%";
```
If there are mutliple speaker names:
```ts
export const speakerNames = ["%speaker-name-1%", "%speaker-name-2%"];
```
If there is no speaker name, leave it blank
3. Create a title slide: 01-title.astro
```astro
---
import Title from "../../templates/Title.astro";
---
<Title>
    <h1>%presentation-title%</h1>
    <span slot="subtitle">%subtitle%</span>
</Title>
```
If there are speaker names, then in the subtitle, you must include all of the them, from the configuration file.
4. Create an agenda slide: 02-agenda.astro

```astro
---
import Agenda from "../../templates/Agenda.astro";
---
<Agenda />
```
5. Based on the user's prompt, come up with a plan for sections for the presentation.
6. If there are multiple speakers, distribute the sections evenly amongst indexes in the speaker config, unless the user has told you what each speaker will cover. If there are more sections than speakers, each speaker should only speak once, so give speakers sections that are next to eachother.
7. For each section, create a plan for what should be covered in each slide.
8. For each slide in each section, create an Astro component file in the presentation directory with a filename that follows the pattern %2-digit- slide-number%-%section-slug%-%slide-number%.astro. 
9. Following the plan for the section, populate the slides according to the slide guide described later in this skill.
10. At the end of the presentation, add a slide for Q&A:
```astro
---
import Title from "../../templates/Title.astro";
---
<Title>
    Any Questions?
</Title>
```

# Slide Guide
1. For the first slide of every section, the frontmatter should include `export const sectionTitle = "%section-title%";`. This is so that the automatic agenda slide can pick the sections up.
2. Slides should not have large paragraphs of text.
3. Use bullet points or short sentences to convey information clearly.
4. No CSS or inline styles is allowed in slides. Do not generate any CSS at all.
5. Styles for h1, h2, h3, ul, ol and p are already implemented, so you can use those.
6. Existing components for slides are in the `src/templates` directory. Do not create new components there.
7. Do not create, delete or modify files outside of the slides directory
8. Do not write any new code except for the config.ts file, which should contain only constants, and Astro slide files.
9. You can reference other slides by using links like this:
```astro
<a href={`#slide-%slideNumber%`} data-slide-number=%slideNumber%>%link-text%</a>
```
10. All slides except for title and Q&A should be wrapped in Overlay, like so:
```astro
---
import Overlay from "../../templates/Overlay.astro";
---
<Overlay %props%>
    %...%
</Overlay>
```
Overlay can be passed the following props:
```ts
export interface Props {
    speaker?: string; // You must put the name of the speaker here if there is one
    logo?: true; // Always have this true
    inverted?: true; // Inverts the colours of the logo and speaker name, for use on dark backgrounds
}
```
11. Most slides should use the Content component.
12. Prefer to use colours from these variables in places where you need to supply a colour to existing components:
```css
:root {
	--color-kainos-blue: #283583;
	--color-kainos-green: #61a83f;
	--color-white: #ffffff;
	--color-kainos-mid-blue: #41679f;
	--color-kainos-dark-green: #004631;
	--color-kainos-grey: #575756;

	--color-kainos-orange: #ec6608;
	--color-kainos-bright-green: #cfd600;
	--color-kainos-bright-blue: #009fe3;
}
```
