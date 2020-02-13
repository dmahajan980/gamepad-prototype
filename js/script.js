window.addEventListener("gamepadconnected", function(e) {
    console.log(`Gamepad connected at index ${e.gamepad.index}: ${e.gamepad.id}, ${e.gamepad.buttons.length} buttons, ${e.gamepad.axes.length} axes.`);
});

window.addEventListener("gamepaddisconnected", function(e) {
    console.log(`Gamepad disconnected from index ${e.gamepad.index}: ${e.gamepad.id}`);
});

console.log(navigator.getGamepads());