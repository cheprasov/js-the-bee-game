# The Bee Game

## About
The game based on a small exercise (please, see bee_game_frontend.pdf) special for W3.

## About me

Alexander Cheprasov
- emails: acheprasov84@gmail.com or cheprasov.84@ya.ru
- phone: 07490 216907
- linkedin: https://uk.linkedin.com/in/alexandercheprasov/en
- London, UK

## What need to do, and what I have not done, because it is just for a test exercise.
- I did not write js test for code, which works with DOM and Canvas.
- Optimization for web (minification for js and css, sprites for images, compression for images and mp3)
- More smooth behaviour for bees.
- More browsers for test. I have tested the game only on Chrome, Firefox and Safari.

## How to build
I have done build for you. You need just play.
But, if you want to rebuild it, please, do next:
```
> npm install
...
> grunt
...
```
The game will be build to `build/game` folder.

## How to run

Open local file `build/game/index.html` in a browser.

## How to play

Just click on yellow buttons.

## How to run tests

```
> grunt build-tests
...
> ./node_modules/mocha/bin/_mocha ./build/test/*/*/*
...
```

