const { Client,ContractCreateFlow,FileCreateTransaction,ContractFunctionParameters } = require("@hashgraph/sdk");
require('dotenv').config();
const fs = require('fs');
 //Import the compiled contract from the HelloHedera.json file
const aliceEVMAddress = '0x000000000000000000000000000000000040c204';
const bobEVMAddress = '0x000000000000000000000000000000000040c205';
const carolEVMAddress = '0x000000000000000000000000000000000040c206';

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
    
    const contractBytecode = fs.readFileSync("smart_contract_compilation/HederaBettingGame.bin");
        
    const fileCreateTx = new FileCreateTransaction()
        .setContents(contractBytecode);
    const submitTx = await fileCreateTx.execute(client);
    const fileReceipt = await submitTx.getReceipt(client);
    const bytecodeFileId = fileReceipt.fileId;
    console.log("The smart contract byte code file ID is " +bytecodeFileId);


    const contractCreate =  new ContractCreateFlow()
        .setGas(1000000)
        .setBytecode(contractBytecode)
        .setConstructorParameters(new ContractFunctionParameters().addAddress(aliceEVMAddress).addAddress(bobEVMAddress).addAddress(carolEVMAddress));
    const txResponse = await contractCreate.execute(client);
    const receipt = await txResponse.getReceipt(client);
    const newContractId =receipt.contractId;
    console.log("The smart contract ID is " + newContractId);  
}
async function main()
{
    await environmentSetup();
    process.exit();
}
main();


