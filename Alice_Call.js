const { Client,  ContractExecuteTransaction,AccountBalanceQuery, Hbar,ContractFunctionParameters } = require("@hashgraph/sdk");
require('dotenv').config();
 //Import the compiled contract from the HelloHedera.json file

const newContractId = '0.0.4246401';
const myAccountId = '0.0.4243972';
const myPrivateKey = '3030020100300706052b8104000a04220420dba2a0bbed909b0ab821b71e8cdb56370c5b14c337c669440786023ec1e94baf';


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

