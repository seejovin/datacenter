# Validation record

## Completed

- TypeScript type checking passed.
- Production Vinext build and portable static build passed.
- All 17 course JSON files match the original ZIP byte-for-byte.
- All 643 lesson IDs, 8,944 question IDs and 2,352 card IDs are unique.
- All question-to-lesson links and all 72 equipment-to-chapter links resolve.
- Actual question-bank checks cover 8,733 single-answer, 202 multiple-answer and 9 ordering questions. Display shuffling preserves original answer indices; order scoring is sequence-sensitive.
- Six focused tests passed, covering the actual bank, rating intervals, due ordering, backup validation, route integrity and concurrent-tab progress merging.
- Browser checks confirmed building opening and system selection using the software renderer, equipment detail navigation, full lesson rendering, quiz feedback, flashcard reveal/rating, programme search, practical-assignment rendering and persistence after reload.
- Original course practical materials remain downloadable as the unchanged source ZIP.
- Portable Python launcher served the built index, JavaScript, stylesheet, favicon and representative course data over HTTP successfully.
- Python launcher and Streamlit entry syntax validated.
- Streamlit 1.64.0 AppTest executed the entry file with zero exceptions and one registered custom component. This is a Python-side check, not a deployed Streamlit browser session.

## Boundaries

- The preview browser does not provide WebGL, so the GPU renderer could not be exercised there. The software 3D fallback was exercised.
- Browser WebMCP was unavailable. The feature-detected helper registrations are included but could not be validated in a supported browser context.
- No live GitHub or Streamlit deployment was performed. No exam, physical facility or vendor lab has been completed or certified by these checks.
- These are software/content-integrity checks, not an independent subject-matter or certification-readiness audit.
