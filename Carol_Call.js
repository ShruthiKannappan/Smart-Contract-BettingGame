const { Client, ContractExecuteTransaction,AccountBalanceQuery,ContractCallQuery, Hbar, ContractFunctionParameters } = require("@hashgraph/sdk");
require('dotenv').config();
 //Import the compiled contract from the HelloHedera.json file

const newContractId = '0.0.4246401';

const myAccountId = '0.0.4243974';
const myPrivateKey = '3030020100300706052b8104000a0422042082476933f0d31beafccb0420fb2efb517a8e4871346db380e2360aeddea70200';

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
        .setPayableAmount(new Hbar(2));
    const contractExecuteSubmit = await contractExecuteTx.execute(client);
    const contractExecuteRx = await contractExecuteSubmit.getReceipt(client);

    if (contractExecuteRx.status.toString() === "SUCCESS") 
    {
      console.log("placeBet executed successfully!");
    } 
    else 
    {
      console.log("placeBet failed:", receipt.status.toString());
    }

    const functions = ['getCarolVal', 'getAliceVal', 'getBobVal'];

    for (let func of functions) 
    {
      const result = await new ContractCallQuery()
        .setContractId(newContractId)
        .setGas(30000)
        .setFunction(func, null)
        .execute(client);

      const returnedValue = result.getUint256(0);
      console.log(`${func} returned: ${returnedValue.toString()}`);
    }

    const contractExecuteTx2 = new ContractExecuteTransaction()
      .setContractId(newContractId)
      .setGas(1000000)
      .setFunction("determineWinner")
      .setPayableAmount(new Hbar(2));
    const contractExecuteSubmit2 = await contractExecuteTx2.execute(client);
    const contractExecuteRx2 = await contractExecuteSubmit2.getReceipt(client);

    if (contractExecuteRx2.status.toString() === "SUCCESS") 
    {
      console.log("determineWinner executed successfully!");
    } 
    else 
    {
      console.log("determineWinner execution failed:", receipt.status.toString());
    }

    const AliceAccountId = '0.0.4243972';
    const aliceAccountBalance = await new AccountBalanceQuery()
      .setAccountId(AliceAccountId)
      .execute(client);

    console.log("Alice's account balance is: "+ aliceAccountBalance.hbars);   
    const BobAccountId = '0.0.4243973';
    const bobAccountBalance = await new AccountBalanceQuery()
      .setAccountId(BobAccountId)
      .execute(client);

    console.log("Bob's account balance is: "+ bobAccountBalance.hbars);    
    const CarolAccountId = myAccountId;

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

