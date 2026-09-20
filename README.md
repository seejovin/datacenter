# Inside the Data Center — Interactive Academy

An explorable 3D data center built around your existing Data Center Academy v3.1 study archive. The building opens into six systems. Equipment leads to explanations and the original foundation, applied and advanced learning materials.

## Start learning locally

Extract the entire ZIP first. The prebuilt `web/` folder is included; you do not need Node.js or a JavaScript build to use it.

- **Windows:** double-click `START-WINDOWS.bat` if Python 3 is installed.
- **macOS:** run `python3 launch.py` from the extracted folder, or use `START-MAC.command` if your system allows it.
- **Linux:** run `python3 launch.py`.

The launcher opens `http://127.0.0.1:8765/`. Keep its terminal open while learning. Press Ctrl+C to stop. If the port is busy, use `python3 launch.py --port 8766`. Do not open `web/index.html` directly as a file: browsers restrict the lesson data requests under `file://`.

## Run or deploy with Streamlit

```sh
python -m pip install -r requirements.txt
python -m streamlit run streamlit_app.py
```

For your GitHub and Streamlit workflow, upload the extracted project to your repository and select **streamlit_app.py** as the entry file. Include **web/** and **requirements.txt**. The prebuilt frontend is served as a Streamlit custom component; deployment does not need Node.js. No credentials or API keys are required by this application. This deliverable has not been pushed or published.

For conventional static hosting, publish the **contents of web/**. Relative asset paths support a subdirectory such as a GitHub Pages repository path. You can also copy that folder to any static web server.

## What to explore

1. Click the building or **Open the building**. Drag to orbit; scroll or pinch to zoom.
2. Choose **Power, Cooling, Network, Compute, Controls or Security**.
3. Select equipment in the 3D view or the equivalent button list.
4. Read its role, inputs, outputs, dependencies and failure consequences. Answer the short explained check.
5. Follow a suggested **foundation, applied or advanced** chapter. These labels describe the suggested route, not an official exam difficulty rating.
6. Work through **Learn → Worked examples → Practice → Quiz → Flashcards**.

The **Programme** view gives direct access to all courses and chapters, including subjects that are not represented by a scene hotspot. The 24 equipment views link to 72 chapter entry points; they are not a claim that every chapter has its own custom 3D simulation.

## Content retained

| Material | Count |
| --- | ---: |
| Full courses and engineering extensions | 17 |
| Full course chapters | 555 |
| Additional orientation lessons | 88 |
| All accessible lessons | 643 |
| Full course questions | 8,452 |
| Additional orientation questions | 492 |
| All accessible questions | 8,944 |
| Built-in flashcards | 2,352 |
| Explorable systems / equipment views | 6 / 24 |

All 17 original course JSON files are preserved byte-for-byte. The orientation collection adapts the older lesson schema while retaining bodies, examples, questions, cards, practical assignments and assigned teaching resources. The original ZIP is available inside every lesson under **Sources & scope**, including the lab files, portfolio material, exports and original Streamlit application.

Source archive: `Data-Center-Academy-v3.1-Streamlit.zip`

SHA-256: `19130ffe30b24076ac13537e59c889e618722be6617fe2a70e856126c815dfd6`

Certificate routes remain available within the Programme view. ISA Expert remains an integration milestone, not a separate examination. The 3D interface does not add new certification coverage or independently validate the source programme. The archive's source dates, exam-scope limitations and required external practical work remain visible in lesson Sources & scope. Original practice questions are not official exam questions.

## Flashcards and progress

Flashcards are built into both the chapter reader and a dedicated course-filtered review area. Reveal an answer, then rate **Again / Hard / Good / Easy**. Reviews use fixed intervals of **10 minutes / 1 day / 3 days / 7 days**, measured from your rating time. This is intentionally a simple scheduler, not FSRS or an adaptive Anki algorithm. Due cards appear before new cards; scheduled cards can be reviewed early.

Reading records, latest question results and flashcard schedules stay in the browser on the current device and website origin. **My progress → Export progress** creates a JSON backup; **Restore Explorer backup** replaces progress with a validated backup. The new interface does not automatically migrate the older Streamlit app's progress format. Export before changing origin, clearing browser storage or moving devices. Current browsers with Web Locks coordinate simultaneous tab writes; older browsers also merge against the latest stored record and listen for updates.

A chapter marked read is a personal record, not independently assessed competence. There is no cloud account or cross-device sync.

## Model and scope

The model is a simplified teaching aid, not a digital twin, vendor-accurate physical layout, process simulator or approved operating procedure. Some equipment views represent logical services hosted on real hardware. Do practical exercises only in the authorized environments described by the course.

The intended identity remains **data center cybersecurity engineer**, with network/telecom, IT hardware, OT controls and cybersecurity as the near-term domains. Power and cooling provide required interface knowledge and later specialist depth. The building is the navigation container; civil/structural engineering ownership is outside programme scope.

Three.js renders the scene with WebGL where available and a software SVG renderer otherwise. The fallback preserves camera and object interaction but omits GPU shadows and can be slower. Keyboard-accessible system and equipment buttons provide the same learning access.

## Edit the website source

Use Node 22.13+ and the pnpm version declared in package.json. Preserve the lockfile.

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm run build:web
```

The static build recreates `web/` from the React source and `public/` data. Commit the rebuilt **web/** directory for Streamlit deployment. Do not commit node_modules or local runtime files.

Important files:

- `components/explorer.tsx`: building navigation, programme library and local progress.
- `components/scene.tsx`: interactive 3D scene and renderer fallback.
- `components/learning.tsx`: full lesson reader, quiz and flashcard UI.
- `lib/learning.ts`: answer checking, review scheduling and progress validation/merge.
- `public/data/systems.json`: equipment explanations and verified chapter routes.
- `public/data/*.json`: original course material and normalized orientation collection.
- `vite.static.config.ts` and `static-entry.tsx`: portable static website build and Streamlit handshake.
- `streamlit_app.py`: Streamlit entry point.
- `VALIDATION.md`: completed checks and remaining validation limits.

The Vinext development entry is also retained in `app/`. It is not required to deploy the prebuilt website in Streamlit.
