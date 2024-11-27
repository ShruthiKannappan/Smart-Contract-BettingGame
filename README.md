# Hedera Betting Game

## Description
This is a project implementing a Betting Game which is described as follows-
* There are three parties in this game – Alice, Bob, and Carol. Alice and Bob are
the players. They will bet the same amount, say, 1 HBar. Thus, they must commit
1 Hbar to the smart contract. Carol is a moderator who will not bet anything.
* Each party will generate a random number between [1000, 1000000] and pass it to
the smart contract. Denote them a, b, and c, respectively, for Alice, Bob, and Carol.
* The winner is the player whose random number is closest to the moderator’s random
number. A tie occurs when |a − c| = |b − c|.
* Then the smart contract will send all the money to the winner’s account. The
players will get back their money if it is a tie

The project is educative in the field of smart contracts as a smart contract in solidity is invoked by Hedera Javascript SDK which will deploy the contract on Hedera Testnet and provide a user friendly interface for accounts i.e Alice, Bob and Carol to interact with the contract.

## Prerequisites

* nodejs
* solidity compiler

## Installation

To install the necessary dependencies, execute the following command:

```
$ bash install.sh 
```

Store the credentials of the account which is going to create the smart contract in the .env file 

* create a .env file in the current working directory
* enter the account id and privatekey in the following format
```
MY_ACCOUNT_ID=0.0.4236734
MY_PRIVATE_KEY=302e020100300506032b6570042204207f735299cabfba8e22b770b450213603908ede5be6137f6dcc54f048046f0584
```

Note the above accountid and private key are valid on the hedera testnet and could be used for testing purposes.

To create Accounts for Alice, Bob and Carol from main ACCOUNT_ID ,Accounts_Creation.js could be used 

```
$ node Accounts_Creation.js
```
The output will contain the account-id, Account public key, account private key for each of alice Bob and Carol with Initial Balances of 50 Hbar each.

In Create_Contract.js 
replace the value of aliceEVMAddress, bobEVMAddress ,carolEVMAddress  with the corresponding EVM addresses of desired Alice, Bob and Carol.

For obtaining the EVM addresses using ACCOUNT_ID
* visit https://hashscan.io/testnet/dashboard
* paste the account id on the search bar
* the EVM address is displayed along with other information, use this EVM address in Create_Contract.js

To create the contract 

```
   $ node Create_Contract.js
```


The output will be 

```
The smart contract byte code file ID is <bytecodeFileId>

The smart contract ID is <ContractId>

```

For Alice to place a bet

In Alice_Call.js

Replace newContractId's value to ContractId

Rplace myAccountId and myPrivateKey with desired account id and private key for alice

Repeat the same procedure for bob in Bob_Call.js 

To execute Alice's Bet run
```
    $ node Alice_Call.js
```

To execute Bob's Bet run
```
    $ node Bob_Call.js
```
Note Alice and Bob could place bets in any order

After Alice and Bob have completed, execute Carol's bet i.e run the following command after replacing the right contractId,accountID,privatekey similar to alice

```
    $ node Carol_Call.js
```

The output will contain the betted numbers and the final account balances of all the three . And the contract is ready to be used for the next round.

## Assumptions and Novelty
* The project ensures that the contract creator or any of the participants do not have access to others' private key. The private key is used only in their respective Calling javascripts for them to transact. Hence the principles of smart contract is fulfilled.
* Additional Account creation interface using javascript sdk
* Both Alice and Bob will place the bet before Carol i.e Alice_Call.js and Bob_Call.js are executed before Carol.js with Alice and Bob, any order works.
* If Carol_Call.js is executed before either of the two, then an error stating CONTRACT_REVERTED is raised. However if Alice and Bob are executed and Carol_Call.js is executed after that, the contract continues to work good.
* There is no restriction on the Number of betting rounds, i.e the game could be repeated for the same contract id multiple times.
* If Alice or Bob attempt to call placeBet more than once for the same round, then only the first number is considered and the betted amount will not be returned.
* Here Carol transfers some amount to the contract to ensure the contract has gas for transferring hbars back to alice and bob.



