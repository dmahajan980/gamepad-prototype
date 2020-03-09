let message, gamepad, connectivityInterval, buttonsData;

const buttonPressed = key => (typeof key == 'object') ? key.pressed : false;

window.addEventListener("gamepadconnected", function() {
    gamepad = navigator.getGamepads()[0];
    console.log(gamepad)

    message = `${gamepad.id} <br> ${gamepad.buttons.length} Buttons | ${gamepad.axes.length} Axes`;
    document.querySelector('.console-message').innerHTML = message;
    connectivityInterval = setInterval(runGamepad, 100);
    // document.querySelector('.image').style.display = 'none'
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

    for (let j = 0; j < axes.length;) {
        // When stick moves significantly away from center
        if (axes[j] > 0.4 || axes[j] < -0.4 || axes[j + 1] > 0.4 || axes[j + 1] < -0.4) {
            let p = document.createElement('p');
            console.log(axes[j]);
            let stick = j === 0 ? 'Left' : 'Right';
            p.innerHTML = `Moved ${stick} Stick by (${axes[j]}, ${axes[j + 1]})`;
            div.appendChild(p);

            // Left Stick
            if (j === 0) {
                // Scroll vertically
                // if (axes[j + 1] > 0) {
                //     window.scrollBy(0, 30);
                // }
                // else if (axes[j + 1] < 0) {
                //     window.scrollBy(0, -30);
                // }

                // // Scroll horizontally
                // if (axes[j] > 0) {
                //     window.scrollBy(10, 0);
                // }
                // else if (axes[j] < 0) {
                //     window.scrollBy(-10, 0);
                // }
                window.scrollBy(axes[j] * 50, axes[j + 1] * 50);
            }
        }
        j += 2;
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
        // Move to previous page in history
        case 6:
            window.history.back();
            break;

        // Move to previous page in history
        case 7:
            window.history.forward();
            break;

        // Open a new tab
        // case 8:
        //     window.open('', '_blank');
        //     break;

        // Reload window
        case 9:
            location.reload();
            break;
    }
}

const focusNextElement = () => {
    //add all elements we want to include in our selection
    var focussableElements = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
    if (document.activeElement && document.activeElement.form) {
        var focussable = Array.prototype.filter.call(document.activeElement.form.querySelectorAll(focussableElements),
            function (element) {
                //check for visibility while always include the current activeElement 
                return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
            });
        var index = focussable.indexOf(document.activeElement);
        if (index > -1) {
            var nextElement = focussable[index + 1] || focussable[0];
            nextElement.focus();
        }
    }
}

// {
//     let focussableElements = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';

// }