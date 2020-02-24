let message, gamepad, connectivityInterval, buttonsData;

const buttonPressed = key => (typeof key == 'object') ? key.pressed : false;

window.addEventListener("gamepadconnected", function() {
    gamepad = navigator.getGamepads()[0];
    console.log(gamepad)

    message = `${gamepad.id} <br> ${gamepad.buttons.length} buttons <br> ${gamepad.axes.length} axes`;
    document.querySelector('.console-message').innerHTML = message;

    connectivityInterval = setInterval(runGamepad, 100);
});

window.addEventListener("gamepaddisconnected", function(e) {
    if (e.gamepad.index === gamepad.index) {
        clearInterval(connectivityInterval);
        message = `Gamepad disconnected`;
        document.querySelector('.console-message').innerHTML = message;
    }
});

// Perform actions/functionality using gamepad
function runGamepad() {
    let gamepadObject = navigator.getGamepads()[0];
    let buttons = gamepadObject.buttons;
    let axes = gamepadObject.axes;

    let div = document.createElement('div');
    div.classList = 'values';
    
    for (let i = 0; i < buttons.length; i++) {
        let p = document.createElement('p');

        // When button is pressed
        if (buttons[i].value > 0.4) {
            console.log(buttons[i]);        
            p.innerHTML = `Button ${i} pressed`;
        }
        div.appendChild(p);
    }

    for (let j = 0; j < axes.length; j++) {
        // When button is pressed
        if (axes[j].value > 0.4) {
            console.log(axes[j]);        
            // p.innerHTML = `Button ${i} pressed`;
        }
    }

    /*
     * A way to add new data to previous
     */
    // Saving buttons data
    // buttonsData = buttons;

    document.querySelector('.value-box').replaceChild(div, document.querySelector('.values'));
}