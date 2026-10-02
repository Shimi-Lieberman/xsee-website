# Legacy standalone HTML

These files used to sit in `public/`, which meant Next.js served them publicly at
`/xsee-demo.html` and `/landing.html`.

They are no longer referenced by the app — the `/demo` route that framed
`xsee-demo.html` was removed — but they remained reachable by direct URL and
still contained superseded product copy (six engines, "Operational Playbooks",
older pricing). Anything served from `public/` is also outside the React app, so
a path-specific CSP entry had to be maintained by hand for them.

They are kept here for reference. Moving them out of `public/` stops them being
served without discarding the content; restore with `git mv` if either is needed
again, and refresh the copy before doing so.
