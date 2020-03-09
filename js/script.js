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
    // console.log(axes)

    let div = document.createElement('div');
    div.classList = 'values';
    
    for (let i = 0; i < buttons.length; i++) {
        // When button is pressed
        if (buttons[i].value > 0.4) {
            let p = document.createElement('p');
            console.log(buttons[i]);        
            p.innerHTML = `Button ${i} pressed`;
            div.appendChild(p);
            
            // Trigger button click events
            keyHandler(i);
        }
    }

    for (let j = 0; j < axes.length; j + 2) {
        // When stick moves significantly away from center
        if (axes[j] > 0.4 || axes[j] < -0.4 || axes[j + 1] > 0.4 || axes[j + 1] < -0.4) {
            let p = document.createElement('p');
            console.log(axes[j]);
            let stick = j === 0 ? 'Left' : 'Right';
            p.innerHTML = `Moved ${stick} Stick by (${axes[j]}, ${axes[j + 1]})`;
            div.appendChild(p);
        }
    }

    /*
     * A way to add new data to previous
     */
    // Saving buttons data
    // buttonsData = buttons;

    document.querySelector('.value-box').replaceChild(div, document.querySelector('.values'));
}

const keyHandler = buttonIndex => {
    switch (buttonIndex) {
        // Open a new tab
        case 8:
            window.open('', '_blank');
            break;
        // Reload window
        case 9:
            location.reload();
            break;
    }
}