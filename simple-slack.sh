#!/usr/bin/env bash
# Usage: ./slack-dark-mode.sh (see README.md for other commands)
# Homebaked Slack Dark Mode. After executing this script restart Slack for changes to take effect.
# Adopted from https://gist.github.com/a7madgamal/c2ce04dde8520f426005e5ed28da8608

SLACK_DIRECT_LOCAL_SETTINGS="Library/Application\ Support/Slack/local-settings.json"
SLACK_STORE_LOCAL_SETTINGS="Library/Containers/com.tinyspeck.slackmacgap/Data/Library/Application\ Support/Slack/local-settings.json"
OSX_SLACK_RESOURCES_DIR="/Applications/Slack.app/Contents/Resources"

if [[ -d $OSX_SLACK_RESOURCES_DIR ]]; then
    SLACK_RESOURCES_DIR=$OSX_SLACK_RESOURCES_DIR
fi

SLACK_EVENT_LISTENER="event-listener.js"
SLACK_FILEPATH="$SLACK_RESOURCES_DIR/app.asar.unpacked/dist/ssb-interop.bundle.js"
THEME_FILEPATH="$SLACK_RESOURCES_DIR/simple-slack.css"

echo "Simplifying Slack... "

# Copy CSS to Slack Folder
sudo cp -af simple-slack.css "$THEME_FILEPATH"

 # Modify Local Settings
 if [[ -f "$HOME/$SLACK_DIRECT_LOCAL_SETTINGS" ]]; then sed -i 's/"bootSonic":"[^"]*"/"bootSonic":"never"/g' "$HOME/$SLACK_DIRECT_LOCAL_SETTINGS"; fi

 if [[ -f "$HOME/$SLACK_STORE_LOCAL_SETTINGS" ]]; then sudo sed -i 's/"bootSonic":"[^"]*"/"bootSonic":"never"/g' "$HOME/$SLACK_STORE_LOCAL_SETTINGS"; fi

 # Unpack Asar Archive for Slack
 sudo "PATH=$PATH" npx asar extract $SLACK_RESOURCES_DIR/app.asar $SLACK_RESOURCES_DIR/app.asar.unpacked

 # Add JS Code to Slack
 sed -i -e '2,$d' $SLACK_FILEPATH
 sudo tee -a "$SLACK_FILEPATH" > /dev/null < $SLACK_EVENT_LISTENER

 # Insert the CSS File Location in JS
 sudo sed -i -e s@SLACK_DARK_THEME_PATH@$THEME_FILEPATH@g $SLACK_FILEPATH

 # Pack the Asar Archive for Slack
 sudo "PATH=$PATH" npx asar pack $SLACK_RESOURCES_DIR/app.asar.unpacked $SLACK_RESOURCES_DIR/app.asar

echo && echo "Done! Restart Slack for changes to take effect."
