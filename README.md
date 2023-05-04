# Code Commenter: Automatic Comment Generator for VSCode

Code Commenter is a Visual Studio Code extension that leverages the power of OpenAI's ChatGPT to automatically generate meaningful comments for your code. This plugin makes understanding and maintaining codebases easier, saving you time and effort in the long run.

## Features

- Automatically generates comments for functions, classes, and methods.
- Utilizes the ChatGPT API for accurate and human-like comments.
- Customizable shortcut: Command+Shift+P (Mac) or Ctrl+Shift+P (Windows/Linux).
- Easy installation and usage within VSCode.

## Installation

1. Clone this repository to your local machine.
2. Open Visual Studio Code.
3. Go to Extensions (or press `Cmd+Shift+X` on Mac, `Ctrl+Shift+X` on Windows/Linux).
4. Click the `...` (More Actions) button in the top-right corner of the Extensions pane.
5. Select "Install from VSIX...".
6. Locate and select the downloaded VSIX file from this repository.
7. Reload VSCode to activate the extension.

## Prerequesite

Since this app uses the chatgpt-3.5 API, so you need to get your own api key and set it mannually hardcode into this plugin, Use this link to get a key. (https://openai.com)
*Note: This plugin is currently in development, and we plan to publish it on the VSCode Marketplace in the near future for easier installation.*

## Usage

1. Place your cursor on the line of code you want to generate a comment for.
2. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux) to open the Command Palette.
3. Type "Automatically Comment Generator" in the Command Palette and press Enter.
4. The extension will generate a comment for the selected line of code using the ChatGPT API.
5. Review and edit the generated comment as needed.

## Requirements

- Visual Studio Code (version 1.62.0 or newer).
- An internet connection for accessing the ChatGPT API.
- A valid API key for the ChatGPT API (sign up [here](https://www.openai.com/signup)).

## Configuration

To configure the plugin with your API key and preferences, open the VSCode Settings (File > Preferences > Settings), and search for "Code Commenter". Update the following settings as needed:

- `codeCommenter.apiKey`: Enter your ChatGPT API key.
- `codeCommenter.shortcut`: Customize the keyboard shortcut for generating comments (default is `Cmd+Shift+P` on Mac, `Ctrl+Shift+P` on Windows/Linux).

## Screeenshots

## Future Plans
Before:
<img width="877" alt="截屏2023-05-04 下午3 00 07" src="https://user-images.githubusercontent.com/63761776/236302967-0af03395-8469-41e6-b030-0d3494320e6f.png">
After:
<img width="942" alt="截屏2023-05-04 下午3 00 24" src="https://user-images.githubusercontent.com/63761776/236302982-59eb853a-44a9-45c0-87bf-312b4a7a78bb.png">

- Publish the extension on the VSCode Marketplace for easier installation and updates.
- Add support for more programming languages.
- Improve the accuracy and relevancy of generated comments.
- Allow customization of comment styles and templates.

## Contributing

We welcome contributions to improve the Code Commenter plugin. Please feel free to submit issues and pull requests on the GitHub repository. We appreciate your help in making this plugin better for the developer community!

## License

Code Commenter is released under the [MIT License](https://opensource.org/licenses/MIT).
