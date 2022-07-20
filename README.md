# Game Of Life

## Prerequisites

- [What is the web?](https://www.youtube.com/playlist?list=PLo3w8EB99pqLEopnunz-dOOBJ8t-Wgt2g) (videos)
- [HTML basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics)
- [CSS basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics)
- [A friendly web development tutorial for complete beginners](https://www.internetingishard.com/html-and-css/)

## Project Diary

- Day 1:
  - Intro to Game Of Life
  - Get familiar with the rules via matrix + decision tree (whiteboard)
  - Useful links:
    - [Wikipedia page](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
    - [Playground 1](https://playgameoflife.com/), [playground 2](https://copy.sh/life/)
- Day 2:
  - Project setup:
    - Github account + repository creation
    - VS Code (locally) synced with repo
    - Initial HTML + JS file
  - Intro to variables, array data type + for-loops
  - Create initial state array incl. adaption to count neighbour cells easy
  - Loop through matrix to access cell values
  - Display state array + single item coordinates + values in browser console
  - Useful links:
    - [Variables and Statements](https://wesbos.com/javascript/01-the-basics/variables-and-statements)
    - [5 JavaScript Konzepte die du kennen musst (als Anfänger)](https://www.youtube.com/watch?v=LZpS4xS307Q)
    - [Arrays](https://wesbos.com/javascript/08-data-types/arrays)
    - [for-Loops](https://wesbos.com/javascript/09-gettin-loopy/54-looping-and-iterating-for-for-in-for-off-and-while-loops)
- Day 3:
  - Intro to functions
  - Put matrix loop functionality into function
  - Create function to count neighbour cells of a given array item
  - Clone original state array into new one
  - Put decision tree logic into function to set values for new array
  - Useful links:
    - [Functions](https://wesbos.com/javascript/02-functions/functions-custom/)
    - [if-conditions](https://wesbos.com/javascript/07-logic-and-flow-control/if-statements-function-returns-truthy-falsy/)
- Day 4:
  - Create a grid layout using CSS grid with dead / alive classes
  - Prepare grid item elements and render into DOM node
  - Useful links:
    - [CSS Grid Garden Playground](https://cssgridgarden.com/)
    - [CSS Grid Adventure Game](https://gridcritters.com/)(€€)
    - [CSS Grid video lesson](https://cssgrid.io/)
    - [CSS Grid Reference](https://tympanus.net/codrops/css_reference/grid/)
- Day 5:
  - Create initital game loop version with 10 fixed cycles
- Day 6:
  - Create a simulation loop function with recursion
  - Create a start / stop button for the loop
  - Useful links:
    - [What is recursion](https://www.youtube.com/watch?v=6oDQaB2one8)
    - [Create a proper game loop](https://spicyyoghurt.com/tutorials/html5-javascript-game-development/create-a-proper-game-loop-with-requestanimationframe)
- Day 7:
  - Add functionality to create a random grid incl. some bugs ;)
  - Session with UX designer for a nice app layout
- Day 8:
  - Bugfixing issues with random grid
  - Session with UX designer about user personas and collaboration about icons for navigation
- Day 9:
  - Add [normalize.css](https://github.com/sindresorhus/modern-normalize) before custom.css
  - Implement header design with CSS flexbox
  - Useful links:
      - [Header element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header)
      - [Nav element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav)
      - [Flexbox Adventure](https://codingfantasy.com/games/flexboxadventure/play)
      - [Reboot, Reset & Reasoning](https://css-tricks.com/reboot-resets-reasoning/)
- Day 10:
  - Optimize header layout further
  - [Add a welcome screen](https://github.com/EwanLenhard/game-of-life/issues/8) incl. web font + change app starting behaviour
  - Make use of Git branches + create a [first Pull Request](https://github.com/EwanLenhard/game-of-life/pull/15) linked to issue https://github.com/EwanLenhard/game-of-life/issues/8
  - Useful links:
    - [Web fonts](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Web_fonts)
    - [A visual introduction to Git](https://medium.com/@ashk3l/a-visual-introduction-to-git-9fdca5d3b43a)
    - [Learn Git Branching](https://learngitbranching.js.org)
- Day 11:
  - Code review changes + merge of [Add a welcome screen](https://github.com/EwanLenhard/game-of-life/issues/8) issue
  - Create a Favicon](https://github.com/EwanLenhard/game-of-life/issues/17)
  - Useful links:
    - [Favicon-Generator](https://realfavicongenerator.net/)
    - [How to Favicon in 2022](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs)
- Day 12:
  - [Add a help/info dialog](https://github.com/EwanLenhard/game-of-life/issues/10) with explanation of the rules


## General resources

- [Learning DOM API in a playful way](https://dom-city.github.io)
