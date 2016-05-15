"use strict";

let template = `
    <div class="game">

        <div class="page page-game">
            <canvas class="game-canvas"></canvas>
            <button class="button button-hit js-game-hit-bee">Hit Bee</button>
        </div>

        <div class="page page-results">
            <button class="button button-replay js-game-play">Replay</button>
        </div>

        <div class="page page-menu">
            <button class="button button-start js-game-play">Play</button>
        </div>

        <div class="sounds" style="display: none">
            <audio controls class="music music-bees" loop>
                <source src="mp3/bees.mp3" />
            </audio>

            <audio controls class="sound sound-win">
                <source src="mp3/win.mp3" />
            </audio>

            <audio controls class="sound sound-shotgun">
                <source src="mp3/shotgun.mp3" />
            </audio>
            <audio controls class="sound sound-shotgun">
                <source src="mp3/shotgun.mp3" />
            </audio>
            <audio controls class="sound sound-shotgun">
                <source src="mp3/shotgun.mp3" />
            </audio>
            <audio controls class="sound sound-shotgun">
                <source src="mp3/shotgun.mp3" />
            </audio>
            <audio controls class="sound sound-shotgun">
                <source src="mp3/shotgun.mp3" />
            </audio>
            <audio controls class="sound sound-shotgun">
                <source src="mp3/shotgun.mp3" />
            </audio>
            <audio controls class="sound sound-shotgun">
                <source src="mp3/shotgun.mp3" />
            </audio>
            <audio controls class="sound sound-shotgun">
                <source src="mp3/shotgun.mp3" />
            </audio>
            <audio controls class="sound sound-shotgun">
                <source src="mp3/shotgun.mp3" />
            </audio>

            <audio controls class="sound sound-bomb">
                <source src="mp3/bomb.mp3" />
            </audio>
            <audio controls class="sound sound-bomb">
                <source src="mp3/bomb.mp3" />
            </audio>
            <audio controls class="sound sound-bomb">
                <source src="mp3/bomb.mp3" />
            </audio>
            <audio controls class="sound sound-bomb">
                <source src="mp3/bomb.mp3" />
            </audio>
            <audio controls class="sound sound-bomb">
                <source src="mp3/bomb.mp3" />
            </audio>
            <audio controls class="sound sound-bomb">
                <source src="mp3/bomb.mp3" />
            </audio>

        </div>

    </div>
`;

export default template;

