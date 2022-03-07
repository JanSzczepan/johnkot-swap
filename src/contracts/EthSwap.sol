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

   constructor(Token _token) public {
      token = _token;
   }

   function buyTokens() public payable {
      uint tokensAmount = msg.value * rate;

      require(token.balanceOf(address(this)) >= tokensAmount);

      token.transfer(msg.sender, tokensAmount);

      emit TokenPurchased(msg.sender, address(token), tokensAmount, rate);
   }
}