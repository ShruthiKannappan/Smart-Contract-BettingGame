// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract HederaBettingGame {
    address payable AliceAddress;
    address payable BobAddress;
    address payable CarolAddress;
    bool AlicePlaced;
    bool BobPlaced;
    bool CarolPlaced;

    uint AliceVal;
    uint BobVal;
    uint CarolVal;

    uint AlicebetAmount;
    uint BobbetAmount;
    

    constructor(address payable AliceAddress_, address payable BobAddress_,address payable CarolAddress_) {
        AliceAddress = AliceAddress_;
        BobAddress = BobAddress_;
        CarolAddress = CarolAddress_;
        AlicePlaced = false;
        BobPlaced = false;
        CarolPlaced = false;
    }

    function getCarolVal() public view returns (uint) {
        return CarolVal;
    }
    function getAliceVal() public view returns (uint) {
        return AliceVal;
    }
    function getBobVal() public view returns (uint) {
        return BobVal;
    }
    function placeBet(uint _number) public payable {
        if(msg.sender == AliceAddress)
        {
            
            if(!AlicePlaced){
                AlicePlaced = true;
                AliceVal = _number;
                AlicebetAmount = msg.value;
            }

        }
        else if(msg.sender == BobAddress)
        {

            if(!BobPlaced){
                BobPlaced = true;
                BobVal = _number;
                BobbetAmount = msg.value;
            }
        }
        else if(msg.sender == CarolAddress)
        {
            if(!CarolPlaced){
                CarolPlaced = true;
                CarolVal = _number;
            }
        }
        
    }

    function determineWinner() public payable {
        require(AlicePlaced&&BobPlaced&&CarolPlaced,"Not all have betted!");
        uint aliceDifference = 0;
        uint bobDifference = 0;
        
        if(AliceVal>=CarolVal) aliceDifference = AliceVal-CarolVal;
        else aliceDifference = CarolVal-AliceVal;


        if(BobVal>=CarolVal) bobDifference = BobVal-CarolVal;
        else bobDifference = CarolVal-BobVal;
        
        if (aliceDifference == bobDifference) {
            (bool success, ) = AliceAddress.call{value: AlicebetAmount,gas:10000}("");
            require(success, "Payment failed.");
            (bool success2, ) = BobAddress.call{value: BobbetAmount,gas:10000}("");
            require(success2, "Payment failed.");
        } else if (aliceDifference < bobDifference) {
            uint returnval = AlicebetAmount+BobbetAmount;
            (bool success, ) = AliceAddress.call{value: returnval,gas:10000}("");
            require(success, "Payment failed.");
        } else {
            uint returnval = AlicebetAmount+BobbetAmount;
            (bool success, ) = BobAddress.call{value: returnval,gas:10000}("");
            require(success, "Payment failed.");
        }
        AlicePlaced = false;
        BobPlaced = false;
        CarolPlaced = false;   
    }
}