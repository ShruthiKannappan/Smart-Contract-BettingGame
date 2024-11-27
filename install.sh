#!/bin/bash

npm init -y
npm install --save @hashgraph/sdk
npm install dotenv
npm install fs
mkdir smart_contract_compilation
solc --bin --abi --optimize -o smart_contract_compilation HederaBettingGame.sol --overwrite