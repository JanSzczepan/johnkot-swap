pragma solidity ^0.5.0;

import './Token.sol';

contract EthSwap {
   string public name = "JohnKotSwap Instant Exchange";
   Token public token;
   uint rate = 100;

   event TokenPurchased (
      address account,
      address token,
      uint amount,
      uint rate
   );

   event TokenSold (
      address account,
      address token,
      uint amount,
      uint rate
   );

   constructor(Token _token) public {
      token = _token;
   }

   function buyTokens() public payable {

      // Calculate the number of tokens to buy
      uint tokensAmount = msg.value * rate;

      // Require that EthSwap has enough tokens
      require(token.balanceOf(address(this)) >= tokensAmount);

      // Transfer tokens to the user
      token.transfer(msg.sender, tokensAmount);

      // Emit an event which gives info about transaction
      emit TokenPurchased(msg.sender, address(token), tokensAmount, rate);
   }

   function sellTokens(uint _amount) public {
      
      // Users can't sell more tokens than they have
      require(token.balanceOf(msg.sender) >= _amount);

      // Calculate the amount of Ether to redeem
      uint etherAmount = _amount / rate;

      // Require that EthSwap has enough Ether
      require(address(this).balance >= etherAmount);

      // Perform sale
      token.transferFrom(msg.sender, address(this), _amount);
      msg.sender.transfer(etherAmount);

      // Emit an event which gives info about transaction
      emit TokenSold(msg.sender, address(token), _amount, rate);
   }
}