const { Client, PrivateKey, AccountCreateTransaction, AccountBalanceQuery, Hbar } = require("@hashgraph/sdk");
require('dotenv').config();

async function environmentSetup() {

    //Grab your Hedera testnet account ID and private key from your .env file
    const myAccountId = process.env.MY_ACCOUNT_ID;
    const myPrivateKey = process.env.MY_PRIVATE_KEY;

    // If we weren't able to grab it, we should throw a new error
    if (!myAccountId || !myPrivateKey) {
        throw new Error("Environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY must be present");
    }
    const client = Client.forTestnet();
    client.setOperator(myAccountId, myPrivateKey);
    // client.setDefaultMaxTransactionFee(new Hbar(100));


    // Create new keys
    const AlicePrivateKey = PrivateKey.generateECDSA(); 
    const AlicePublicKey = AlicePrivateKey.publicKey;
    

    const AliceAccount = await new AccountCreateTransaction()
        .setKey(AlicePublicKey)
        .setInitialBalance(new Hbar(50))
        .execute(client);

    const getAliceReceipt = await AliceAccount.getReceipt(client);
    const AliceAccountId = getAliceReceipt.accountId;
    

    console.log("Alice's account ID is: " +AliceAccountId);
    console.log("Alice's Public key: "+AlicePublicKey+" ,Private Key: "+AlicePrivateKey);
    const aliceAccountBalance = await new AccountBalanceQuery()
     .setAccountId(AliceAccountId)
     .execute(client);

    console.log("Alice's account balance is: "+ aliceAccountBalance.hbars);   

    const BobPrivateKey = PrivateKey.generateECDSA(); 
    const BobPublicKey = BobPrivateKey.publicKey;

    const BobAccount = await new AccountCreateTransaction()
        .setKey(BobPublicKey)
        .setInitialBalance(new Hbar(50))
        .execute(client);

    const getBobReceipt = await BobAccount.getReceipt(client);
    const BobAccountId = getBobReceipt.accountId;

    console.log("Bob's account ID is: " +BobAccountId);
    console.log("Bob's Public key: "+BobPublicKey+" ,Private Key: "+BobPrivateKey);
    const bobAccountBalance = await new AccountBalanceQuery()
     .setAccountId(BobAccountId)
     .execute(client);

    console.log("Bob's account balance is: "+ bobAccountBalance.hbars);


    const CarolPrivateKey = PrivateKey.generateECDSA(); 
    const CarolPublicKey = CarolPrivateKey.publicKey;

    const CarolAccount = await new AccountCreateTransaction()
        .setKey(CarolPublicKey)
        .setInitialBalance(new Hbar(50))
        .execute(client);


    const getCarolReceipt = await CarolAccount.getReceipt(client);
    const CarolAccountId = getCarolReceipt.accountId;

    console.log("Carol's account ID is: " +CarolAccountId);
    console.log("Carol's Public key: "+CarolPublicKey+" ,Private Key: "+CarolPrivateKey);
    const carolAccountBalance = await new AccountBalanceQuery()
     .setAccountId(CarolAccountId)
     .execute(client);

    console.log("Carol's account balance is: "+ carolAccountBalance.hbars);
}
async function main()
{
await environmentSetup();
process.exit();
}
main();

