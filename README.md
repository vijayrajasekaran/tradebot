# Tradebot (WIP)

Crypto strategy bot built with Fosmos.js which runs on paper trading mode as of now.

### Install

Install Fosmos.js globally

`npm install -g fosmos`
or
`yarn global add fosmos`


### Clone this project

`git clone https://github.com/vijayrajasekaran/tradebot`

`npm install` or `yarn install`

### Configure

Rename `./static/binance-sample.json` to `./static/binance.json` and update it with your `APIKEY` & `APISECRET`

Run MongoDB local instance with DB `tradebot`

### Launch app

Enter the below command inside your app directory 

`fosmos dev`

### Default Bot Configuration

`./config.json`

Exchange: Binance

Period: 30 minute time frame

`./strategies/sma.json`

Strategy: SMA 20/50 crossover
