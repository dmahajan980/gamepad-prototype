# Gamepad Prototype

This repository contains the Gamepad Navigation Prototype, a demo for experiencing the browser and webpage navigation using a standard game controller such as Xbox gamepad.

## Technologies Used

The prototype uses the following technologies and languages:

- [HTML5 Gamepad API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API)
- [JQuery](https://jquery.com)
- JavaScript
- CSS3

In this prototype, the ***HTML5 Gamepad API*** is used to establish connectivity between the browser and the gamepad. Further, it is used to read the values of the nputs passed by the various keypresses or joystick events. On top of this, we have used the ***JavaScript*** to implement the handlers for the key and joystick events which are needed for navigation and other background processes. Some ***JQuery*** was also used to make the event handlers more efficient.

***Note:*** The original Gamepad project will be built using [Infusion](https://fluidproject.org/infusion.html), a high performance and clean, client-side JavaScript framework that uses JQuery in its core. The solution will require using a [Chrome Extension](https://developer.chrome.com/extensions), [ElectronJs](https://www.electronjs.org/) or an API/Tool that is compatible with majority of the browsers.

## Controls

<p align="center">
  <img src="./standard_gamepad.svg" height=400>
</p>

Below is the list of buttons with their corresponding functionalities specified along:  
(_Please refer to the above diagram for the below mentioned buttons and axes_)

| Keys | Functionality | Analogous Keyboard Keys |
| :---: | :---: | :---: |
| Button `0` | Select or Click | `Enter` |
| Button `1` | Back or Cancel | `Esc` |

| Button `3` | Move to next focusable element | `Tab` |
| Button `2` | Move to previous focusable element | `Shift` + `Tab` |
| :---: | :---: | :---: |

