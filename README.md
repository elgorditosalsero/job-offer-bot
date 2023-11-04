# Job Offer Bot
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

`Job Offer Bot` allows you to post your job offers via simple and intuitive messages via Telegram.

You'll have the ability to send your job offer to a single group or in multiple ones, the **chose** is yours!

## Why this bot exist

The bot is and idea of the [Lavoro Digitale Italia](https://lavorodigitaleitalia.it/) communities manager and leadership.

The wanted something useful for them to easily post `job offers` in telegram communities simplifying the way of writing the messages
following different templates.

They wanted to keep the bot open source, to follow the spirit of the tech communities and the work every of us is doing.

## Contents

1. [Usage of the bot](#usage-of-the-bot)
2. [How it works](#how-it-works)
3. [Run the project](#run-the-project)
4. [Contributing](#contributing)
5. [Support](#support)
6. [License](#license)

## Usage of the bot

In order to be able to use the bot, you just have to add it to your group with `admin` rights.

Then you just have to send the `/start` command, and you're done!

You'll have the abilities to use different commands, you can have more info using `/commands` and `/help`.

## How it works

The idea is pretty simple, every time the bot is initialized inside a group, it will store the data required
to send messages inside that group, such as the `topic id` and the language of the message (defaults to Italian).

Everything else is just stored on the fly, called `session` in [grammY](https://www.grammy.dev) framework.

**IMPORTANT**

The _job offers_ you're sending, **are not stored anywhere**, that means that once it was sent to a group or groups, you'll not able to edit it.

## Run the project

In order to run this project, you just have to follow only some small steps:

- Fork the project and install the dependencies via
```bash
$ yarn install 
```
- Copy the `.env.example` file and fill it with your data.
```bash
$ cp .env.example .env
```
- Run the project with
```bash
$ yarn dev
```

## Contributing

Any contributions and/or suggestions about how to improve the bot are welcome!

Just be sure to follow our [contributing](CONTRIBUTING.md) guidelines, following our [code of conduct](CODE_OF_CONDUCT.md)

**The repo is based on [telegram-bot-template](https://github.com/bot-base/telegram-bot-template)**

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/elgorditosalsero"><img src="https://avatars.githubusercontent.com/u/65770455?v=4?s=100" width="100px;" alt="Guido Porcaro"/><br /><sub><b>Guido Porcaro</b></sub></a><br /><a href="https://github.com/elgorditosalsero/jd-post-bot/commits?author=elgorditosalsero" title="Code">💻</a> <a href="https://github.com/elgorditosalsero/jd-post-bot/commits?author=elgorditosalsero" title="Documentation">📖</a> <a href="#promotion-elgorditosalsero" title="Promotion">📣</a></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td align="center" size="13px" colspan="7">
        <img src="https://raw.githubusercontent.com/all-contributors/all-contributors-cli/1b8533af435da9854653492b1327a23a4dbd0a10/assets/logo-small.svg">
          <a href="https://all-contributors.js.org/docs/en/bot/usage">Add your contributions</a>
        </img>
      </td>
    </tr>
  </tfoot>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## Support

If you want to support my work, but mostly this bot, you can just leave a star, share the project, but mostly important, you can support it
donating via the sponsorship page via the dedicated option.

This will allow to not have heavy costs to keep the bot up and running and supporting the development of new features.

## License

This project is licensed under the [MIT License](LICENSE.md)

