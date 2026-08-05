// Shared site constants.
//
// RESUME_PATH is defined once because it is referenced from more than one
// component. It previously lived as a hardcoded string in both Hero.tsx and
// Navbar.tsx, and the two drifted: the navbar was updated on a resume rename
// while the hero kept pointing at a file that no longer existed, producing a
// silent 404 in production. Renaming the asset now means editing this line and
// the file in public/ — nothing else.
//
// Invariant: this must name a file that exists in public/.
// Covered by tests/e2e/resume.spec.ts and tests/unit/navbar.test.tsx.
export const RESUME_PATH = "/resume072026.pdf";
