const { Client, ContractExecuteTransaction,AccountBalanceQuery, Hbar,ContractFunctionParameters } = require("@hashgraph/sdk");
require('dotenv').config();
 //Import the compiled contract from the HelloHedera.json file

const newContractId = '0.0.4246401';
const myAccountId = '0.0.4243973';
const myPrivateKey = '3030020100300706052b8104000a042204200e61279c6923646ecd0ad89b49f8a2bec195a54bee1c9ed9b3c04ec4ad690617';

async function environmentSetup() {
    const client = Client.forTestnet();
    client.setOperator(myAccountId, myPrivateKey);

    const accountBalance1 = await new AccountBalanceQuery()
      .setAccountId(myAccountId)
      .execute(client);

    console.log("before balance is: " +accountBalance1.hbars);

    const bettingNumber = Math.floor(Math.random() * (1000000 - 1000 + 1)) + 1000;
    const contractExecuteTx = new ContractExecuteTransaction()
      .setContractId(newContractId)
      .setGas(1000000)
      .setFunction("placeBet", new ContractFunctionParameters().addUint256(bettingNumber))
      .setPayableAmount(new Hbar(1));
    const contractExecuteSubmit = await contractExecuteTx.execute(client);
    const contractExecuteRx = await contractExecuteSubmit.getReceipt(client);

    if (contractExecuteRx.status.toString() === "SUCCESS") 
    {
      console.log("placeBet executed successfully!");
    } 
    else 
    {
      console.log("placeBet execution failed:", receipt.status.toString());
    }
    const accountBalance2 = await new AccountBalanceQuery()
      .setAccountId(myAccountId)
      .execute(client);

    console.log("After balance is: " +accountBalance2.hbars);
}
async function main()
{
  await environmentSetup();
  process.exit();
}
main();

