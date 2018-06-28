# make_erc20_coin

ERC20기반 코인을 만들어보도록 하자

# 기본 환경 구성

#### 1. nodejs 및 truffle 설치

* nodejs : https://nodejs.org/en/
* truffle : npm install -g truffle

#### 메타마스크 설치

* [in chrome extension](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn/related)
* 우측 상단에 여우 모양 아이콘이 생긴 것을 확인할 수 있음
* 정보동의 이후 비밀번호 및 복구 코드를 잘 적어 놓기 바람.
* 지갑을 만들면 자동으로 계정도 한개 만들어 짐

#### Rinkeby : 코인요청 ( 못받음 )

* 주소 정보 확인
* https://www.rinkeby.io/#faucet 에서 tweet 버튼을 눌러 주소정보를 바꿔서 트윗
* 늦게 줌

#### Ropsten : 코인요청

* https://faucet.metamask.io/ 접속
* request 1 ether from faucet 버튼을 누름
* 몇 분 있음 도착 됨, 여러번 요청 가능한 것 같음 5 eth 받음

#### Kovan : 코인요청

* https://gitter.im/kovan-testnet/faucet 접속
* 주소 정보를 넣으면 3 eth 줌
* 자주 요청 불가

#### 2. truffle 초기화

> 참고로 아래 명령(truffle init)을 수행할 때에는 폴더 내부에 아무런 파일도 존재해서는 안됨에 유의

```
$ mkdir sama-coin
$ cd sama-coin
$ truffle init
```

#### 3. npm 초기화

```
npm init -y
```

#### 4. 의존성 설치

```
npm install zeppelin-solidity
npm install web3
npm install ethereumjs-wallet
npm install dotenv
npm install truffle-hdwallet-provider
```

#### ./contracts/Samacoin.js 작성

```
pragma solidity ^0.4.23;
import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

/*
  Samacoin을 설정
*/
contract Samacoin is StandardToken {
    string public name = "Samacoin";
    string public symbol = "SAMA";        //통화단위
    uint public decimals = 18;            //자리수
    uint256 public INITIAL_SUPPLY = 10000 * (10 ** decimals); //초기 공급량 : 1억개로 함

    mapping (address => uint256) public balanceOf;

    //생성자
    constructor() public {
        balanceOf[msg.sender] = INITIAL_SUPPLY;
    }
}
```

#### ./migrations/2_deploy_samacoin.js 작성

```
var Samacoin = artifacts.require("./Samacoin.sol");

module.exports = function(deployer) {
    deployer.deploy(Samacoin);
};
```

#### ./truffle.js 수정

```
// loading config
require('dotenv').config();

// [mnemonic] : Metamask - Settings - Reveal Seed Words 에서 확인할 수 있는 12개의 단어로 이뤄진 값임
let HDWalletProvider = require("truffle-hdwallet-provider");
let mnemonic = process.env.MNEMONIC;
let infura = process.env.INFURA;

// console.log(mnemonic, infura);

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, `https://ropsten.infura.io/${infura}`),
      network_id: '3'
    }
  }
};
```

# 빌드 및 배포

#### 빌드

`truffle compile`

#### 배포

* 배포 후 코인변동 : 5.000 ETH => 4.816 ETH

`truffle deploy --network ropsten`

> Samacoin: 0xff838f5731625d1a12ad60d17af2e08144e6263e
> https://ropsten.etherscan.io/address/0xff838f5731625d1a12ad60d17af2e08144e6263e


```
Using network 'ropsten'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0x771f741aa7272124b3b9a7c89ec6de108e38261b31e8474843dc145b8bb1f0a0
  Migrations: 0x1b59eb669cf378acd8c6fefb88476310051493b0
Saving successful migration to network...
  ... 0x0de5346414c6d95b3be824972b5c28b77beaca6aa29f4653fbe45c063e4dec00
Saving artifacts...
Running migration: 2_deploy_samacoin.js
  Deploying Samacoin...
  ... 0x72932747fdb4ff46e90136e939ba06d7c6ecd564fc4c64df053a0e35fba6c2c0
  Samacoin: 0xff838f5731625d1a12ad60d17af2e08144e6263e
Saving successful migration to network...
  ... 0x39b72e2182af10d6a422104ba105ce05b93bd60914ce4ac4baa44212e838217f
Saving artifacts...
```

# 토큰 추가하기

* 위에서 생성한 Samacoin 주소를 복사하여 MeataMask 토큰에 추가

0xff838f5731625d1a12ad60d17af2e08144e6263e

# 참조링크

* [DAAP ERC20 토큰을 만들어서 배포까지](http://javaexpert.tistory.com/926?category=697445)
* [Ethereum Test Network (Rinkeby) 사용법](https://medium.com/@hyundonk/ethereum-test-network-rinkeby-%EC%82%AC%EC%9A%A9%EB%B2%95-6631744f0aef)
* [Mnemonic Code Converter](https://iancoleman.io/bip39/#english)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [USING INFURA (OR A CUSTOM PROVIDER)](https://truffleframework.com/tutorials/using-infura-custom-provider)
* [How To Create Token and Initial Coin Offering Contracts Using Truffle + Zeppelin Solidity](https://blog.zeppelin.solutions/how-to-create-token-and-initial-coin-offering-contracts-using-truffle-openzeppelin-1b7a5dae99b6)
* [ERC20 Token Standard](https://theethereum.wiki/w/index.php/ERC20_Token_Standard)
* [Create your own CRYPTO-CURRENCY with Ethereum](https://ethereum.org/token#the-coin)
