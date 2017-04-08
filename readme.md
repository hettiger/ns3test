# Flexible List inside a TabView

This repository shows the attempt to put the [flexible list](https://github.com/hettiger/ns3test/tree/flexible-list) inside a TabView.

## Reasons for this demo

This demo proofs that ListView item templates __do not__ work inside a TabView.
Outside of a TabView everything would work just fine as you can see in the [flexible-list branch](https://github.com/hettiger/ns3test/tree/flexible-list).

## Issues

* The `page.getViewById("listView")` call in `app/pages/main/main-page.ts` fails because {NS} is not able to build the UI
* With the fade in logic in place I could no longer build the app

In order to get a running build I removed the fade in logic. (Compare with the [flexible-list branch](https://github.com/hettiger/ns3test/tree/flexible-list) for details)
Besides of that there are no changes but putting everything inside a TabView ...
