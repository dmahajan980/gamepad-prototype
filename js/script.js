let message, gamepad, connectivityInterval, buttonsData;

const buttonPressed = key => (typeof key == 'object') ? key.pressed : false;

window.addEventListener("gamepadconnected", function() {
    gamepad = navigator.getGamepads()[0];
    console.log(gamepad)

    message = `${gamepad.id} <br> ${gamepad.buttons.length} Buttons | ${gamepad.axes.length} Axes`;
    document.querySelector('.console-message').innerHTML = message;
    connectivityInterval = setInterval(runGamepad, 100);
    document.querySelector('.value-box').style.display = 'flex'
});

window.addEventListener("gamepaddisconnected", function(e) {
    if (e.gamepad.index === gamepad.index) {
        clearInterval(connectivityInterval);
        message = `Gamepad disconnected`;
        document.querySelector('.console-message').innerHTML = message;
        document.querySelector('.value-box').style.display = 'none'
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
                window.scrollBy(axes[j] * 80, axes[j + 1] * 80);
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
        // Click element
        case 0: 
            clickEventHandler();
            break;

        // Tab to prev element
        case 2:
            focusElement(prevFocus);
            break;

        // Tab to next element
        case 3:
            focusElement(nextFocus);
            break;
        
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
        //     setTimeout(window.open(), 500);
        //     break;

        // Reload window
        case 9:
            location.reload();
            break;

        // Up arrow key
        case 12:
        case 14:
            arrowKeyEventHandler(upKey);
            break;

        // Down arrow key
        case 13:
        case 15:
            arrowKeyEventHandler(downKey);
            break;
    }
}

const focusElement = action => {
    //add all elements we want to include in our selection
    let focussableElementsFilter = 'a:not([disabled]), button:not([disabled]), input:not([disabled]), select, [tabindex]:not([disabled]):not([tabindex="-1"])';
    let focussable = Array.prototype.filter.call(document.querySelectorAll(focussableElementsFilter),
        function (element) {
            //check for visibility while always include the current activeElement 
            return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
        });

    console.log(focussable.length)

    let index = focussable.indexOf(document.activeElement);
    action(index, focussable);
    
    if (document.activeElement === document.querySelector('body')) {
        focussable[0].focus();
    }
}

const nextFocus = (index, focussable) => {
    if (index > -1) {
        let nextElement = focussable[index + 1] || focussable[0];
        nextElement.focus();
    }
}

const prevFocus = (index, focussable) => {
    if (index > -1) {
        let prevElement = focussable[index - 1] || focussable[focussable.length - 1];
        prevElement.focus();
    }
}

const clickEventHandler = () => {
    // SELECT Element
    if (document.activeElement.nodeName === 'SELECT') {
        // let initialPosition = document.activeElement.style.position;
        // document.activeElement.style.position = 'relative';
        // document.activeElement.style.top = 0;
        let length = 0;
        document.activeElement.childNodes.forEach(node => {
            if (node.nodeName === 'OPTION') { 
                length++;
            }
        });
        if ($(document.activeElement).attr('size') === '1' || !$(document.activeElement).attr('size')) {
            $(document.activeElement).attr('size', length);
        }
        else {
            $(document.activeElement).attr('size', 1);
        }
    }
    else {
        document.activeElement.click();
        console.log(document.activeElement)
    }
}

const arrowKeyEventHandler = keyFunction => {
    if (document.activeElement.nodeName === 'SELECT') {
        console.log('works')
        let activeElement = document.activeElement.nodeName.toLowerCase();
        keyFunction(activeElement);
    }
}

const upKey = activeElement => {
    let prevElement = $(`${activeElement} option:selected`).prev('option');
    if (prevElement.length > 0) {
        $(`${activeElement} option:selected`).removeAttr('selected').prev('option').attr('selected', 'selected');
    }
}

const downKey = activeElement => {
    let nextElement = $(`${activeElement} option:selected`).next('option');
    if (nextElement.length > 0) {
        $(`${activeElement} option:selected`).removeAttr('selected').next('option').attr('selected', 'selected');
    }
}