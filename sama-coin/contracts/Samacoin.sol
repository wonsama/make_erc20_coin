pragma solidity ^0.4.23;
import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

/*
	Samacoin을 설정
*/
contract Samacoin is StandardToken {
    string public name = "Samacoin"; 
    string public symbol = "SAMA"; 				//통화단위
    uint public decimals = 18; 						//자리수
    uint256 public INITIAL_SUPPLY = 10000 * (10 ** decimals); //초기 공급량 : 1억개로 함 
 
    mapping (address => uint256) public balanceOf;

    //생성자
    constructor() public {
        balanceOf[msg.sender] = INITIAL_SUPPLY;
    }
}


