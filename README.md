# Invisible Geocode
## Table of Contents

- [Invisible Geocode](#invisible-geocode)
  - [Table of Contents](#table-of-contents)
  - [About The Project](#about-the-project)
    - [Built With](#built-with)
    - [Installation](#installation)
    - [Usage](#usage)


## About The Project

This project allows you to fetch location information, time information and current weather for a specified location


### Built With

* [Typescript](https://www.typescriptlang.org/)
* [Node-Geocoder](https://www.npmjs.com/package/node-geocoder)
* [Opencage](https://opencagedata.com/)
* [OpenweatherMap](https://openweathermap.org/)



### Installation
 
1. Clone the repo
```sh
git clone https://github.com/dimosthenisk/invisible-geocode.git
```
2. Install NPM packages
```sh
yarn
```

### Usage
```sh
yarn run start "Location Information"
yarn run start "Athens Greece"
yarn run start "Athens Greece, New York US, Sao Paolo"
```