# mano-bd-countdown

A static love letter website with a growing tree animation and a live “days together” countdown.

Forked and adapted from [love-letter-website](https://github.com/qzydustin/love-letter-website).

## Repository

https://github.com/muhamad-404/mano-bd-countdown

## Features

- Zero Dependencies: Pure HTML5, CSS3, and ES6+ JavaScript with no third-party libraries
- Mobile-first responsive layout (phone, tablet, desktop)
- Beautiful Animations: Tree growing, heart falling, and typewriter letter effect
- Easy Customization: Personalize content and dates through a single config file

## Getting Started

```sh
git clone https://github.com/muhamad-404/mano-bd-countdown.git
cd mano-bd-countdown
```

Edit `config.js` to personalize content. Optionally add a `bgm.mp3` file for background music (the audio element is present; the file is not included in the repo).

## Local preview (desktop + phone on same Wi‑Fi)

From the project root:

```powershell
npx --yes serve -l tcp://0.0.0.0:3000
```

1. On your PC, run `ipconfig` and note your Wi‑Fi **IPv4 Address** (for example `192.168.1.42`).
2. On your phone (same Wi‑Fi network), open `http://192.168.x.x:3000`.
3. If the phone cannot connect, allow inbound TCP port **3000** in Windows Firewall for that session.

You can also open `http://localhost:3000` on the PC itself.

## Project Structure

```
mano-bd-countdown/
├── index.html          # Main page
├── styles.css          # Stylesheet (mobile-first)
├── config.js           # Text content configuration
├── js/
│   ├── geometry.js     # Point, Heart, and math utilities
│   ├── animation.js    # Frame runner, animation phases, typewriter
│   ├── tree.js         # Tree, Branch, Bloom, Seed, Footer classes
│   ├── ui.js           # Clock, scaling, content init, canvas setup
│   └── main.js         # Entry point and orchestration
├── favicon.svg         # Website icon
└── README.md           # Project documentation
```

## Contributing

Issues and Pull Requests are welcome!

## Acknowledgments

Thanks to the original creator of the initial version of this project. This version has been extensively modernized and optimized.

## License

MIT License
