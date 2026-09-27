// Shared site constants.
//
// RESUME_PATH is defined once because it is referenced from more than one
// component. It previously lived as a hardcoded string in both Hero.tsx and
// Navbar.tsx, and the two drifted: the navbar was updated on a resume rename
// while the hero kept pointing at a file that no longer existed, producing a
// silent 404 in production. The filename is now stable: updating the resume
// means overwriting the file in public/, not renaming it.
//
// Invariant: this must name a file that exists in public/.
// Consumers: Navbar, Hero, and the embedded viewer on /about.
// Covered by tests/e2e/resume.spec.ts and tests/unit/{navbar,hero,about}.test.tsx.
export const RESUME_PATH = "/ChristopherStipes_Resume.pdf";
