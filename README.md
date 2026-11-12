# Presenter

A slide deck framework built with [Astro](https://astro.build). Slides are Astro components, so each deck is ordinary code with reusable templates. A single site can hold several presentations.

## Features

- **Multiple presentations.** Each subfolder of `src/slides/` becomes its own presentation at `/<folder-name>`.
- **Presentation picker.** The home page (`/`) lists every presentation with its slide count.
- **Keyboard navigation.** Use the <kbd>→</kbd> and <kbd>←</kbd> arrow keys to move between slides. Navigation wraps around at either end.
- **Slide permalinks.** The URL updates as you navigate (for example `/example?slide=3`), so you can share or reload a link to a specific slide. Slide numbers start at 1.
- **Automatic agenda.** The `Agenda` template lists the `sectionTitle` exported by each slide in the current presentation.
- **Reusable templates.** The title, agenda, content, layout and code slide templates use the Kainos brand colours.

## Project structure

```text
/
├── public/                  # Static assets (favicon, logos)
├── src/
│   ├── layouts/
│   │   └── Layout.astro     # HTML shell, global typography and brand colour variables
│   ├── lib/
│   │   └── presentations.ts # Discovers presentations and slides under src/slides/
│   ├── pages/
│   │   ├── index.astro          # Presentation picker
│   │   └── [presentation].astro # Renders one presentation per slides subfolder
│   ├── slides/
│   │   └── example/         # One folder per presentation
│   │       ├── 01-title.astro
│   │       ├── 02-agenda.astro
│   │       └── ...
│   └── templates/           # Reusable slide building blocks
└── package.json
```

## Creating a presentation

1. Create a folder under `src/slides/`, such as `src/slides/my-talk/`. The folder name is used as the URL (`/my-talk`). It is also turned into the display title by replacing hyphens and underscores with spaces and capitalising each word ("My Talk").
2. Add one `.astro` file per slide. Slides are shown in filename order, so prefix them with numbers (`01-title.astro`, `02-agenda.astro`, ...).
3. To list a slide in the agenda, export a `sectionTitle`:

```astro
---
import Overlay from "../../templates/Overlay.astro";
import Content from "../../templates/Content.astro";

export const sectionTitle = "Introduction";
---
<Overlay speaker="Your Name" logo>
    <Content>
        <h2>{sectionTitle}</h2>
        <p>Slide content goes here.</p>
    </Content>
</Overlay>
```

## Templates

| Template    | Purpose | Usage |
| :---------- | :------ | :---- |
| `Title`     | Full-screen title slide with a gradient background and logo. | Default slot for the title, `subtitle` named slot for the subtitle. |
| `Agenda`    | Lists the `sectionTitle` of each slide in the current presentation. | `<Agenda />` |
| `Overlay`   | Adds a speaker name and optional logo on top of slide content. | Props: `speaker` (required), `logo`, `inverted` (white text and alternate logo for dark backgrounds). |
| `Content`   | White, centred content area. | Default slot. |
| `Row`       | Lays out its children horizontally and wraps them when space runs out. | Default slot. |
| `CodeBlock` | Code block with syntax highlighting (wraps Astro's `<Code />`). | Accepts the same props as `<Code />`, such as `code` and `lang`. |

## Commands

You need Node.js `>=22.23.4`. Run these commands from the project root:

| Command           | Action                                        |
| :---------------- | :-------------------------------------------- |
| `npm install`     | Install dependencies                          |
| `npm run dev`     | Start the dev server at `localhost:4321`      |
| `npm run build`   | Build the static site into `./dist/`          |
| `npm run preview` | Preview the production build locally          |
