
Install all dependancies by using:
```shell
npm install
```
Setup your .env file with RPC URL's and your wallet Private Key.

You first need to compile the contract:
```shell
npx hardhat compile
```

Once the contract is compile run following tasks to generate token, mint nfts and transfer/bridge them respectively:
```shell
#generate token
npx hardhat run scripts/deploy.js --network sepolia

#mint nft
npx hardhat run scripts/batchMint.js --network sepolia

#deposit and check balance
npx hardhat run scripts/approvedDeposit.js --network sepolia

#check balance over amoy
npx hardhat run scripts/balanceamoy.js --network amoy
```
Parent Chain: Sepolia(ETH)
Child Chain: Polygon Amoy(MATIC)

Loom Video link for verification: 

