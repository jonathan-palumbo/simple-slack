# Simple Slack
Simple Slack helps you focus by hiding the distracting elements of Slack.

To activate Simple Slack, just press `ctrl+d`. To go back to normal Slack, press `ctrl+d` again.

When you activate Simple Slack, here's what happens:
- The top and side menus are hidden
- The channel or thread you are viewing fills the entire window
- All animated gifs, emoji, and reactji are hidden (unless you hover over the post they're on)

If you're not sure how to navigate Slack without the menus on the side, press `cmnd+/` to pull up a list of built-in keyboard shortcuts.

Simple Slack also adds a hot key to navigate posts in a channel more easily. Press `ctrl` then a number from `1-9` to focus on one of the nine most recent messages in a channel. From there, you can press the right arrow key to open the thread for that message, or press tab to navigate the message's other clickable elements.

# How to Download

To use Simple Slack, you need to do some nerdy stuff, but it's really easy too. (Disclaimer: these instructions are for Mac)

First, open the *Terminal* (this is a built-in Mac application). Then copy and paste this text into the Terminal, and press `Enter`:

```
git clone https://github.com/jonathan-palumbo/simple-slack
cd simple-slack
```

After you run those commands, quit the Slack application, then copy and paste this into the Terminal:

```
./slack-dark-mode.sh
```

Then open Slack, press `ctrl+d`, and Simple Slack should work!
