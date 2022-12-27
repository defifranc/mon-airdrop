# AirdropMON

This repository contains a solution for the MON airdrop of GNHY holders and stakers.

Basically, users can either choose between Vesting during 1000 days and Freezing during 2000 days but with the possibility of earning staking rewards.

## What you'll find here

- `AirdropMON`

This contract is reserved for MON airdrop of GHNY holders.
Airdrop eligible users can either choose vesting or freezing and staking.

Airdrop based on a MerkleTree which each node is defined by an address and an amount.
The protocol does not spend any gas fees, as it is a pull method, in which users claim from the contract.
If any user does not claim the airdrop those amounts will remain in the distributor address.
The distributor just is one address with MONs that has the MON token approved in the AirdropContract (spender) so the latter pulls the corresponding amount of token per user.

Vesting during 1000 days is chosen by default. Thus, users who want Freeze & Stake need to later call addUserToFreezer().
Any amount already claimed by the user during the Vesting will be deducted from the totalAmount the user is eligible.

Unvesting of Frozen MON starts in 2000 days and has 180 days of duration. Until that moment, user's MON is staked in the stakingPool.

The mapping snapshots stores the user snapshots of F_ASSETS and F_DCHF in the form of key-value pair (address -> struct Snapshot)
The mapping F_ASSETS stores the asset fees in the form of key-value pair (address -> uint256).
The mapping entitiesVesting stores the user's vesting data in the form of key-value pair (address -> struct RuleVesting).
The mapping entitiesFreezing stores the user's vesting data in the form of key-value pair (address -> struct RuleFreezing).
The mapping stakes stores the user's stake in the form of key-value pair (address -> uint256).

START_VESTING_DATE & END_VESTING_DATE are immutable and excluded from RuleVesting struct in order to save gas.
This means all users have the same vesting conditions.

On the other hand, with regards to the Freezer, the conditions are set when the user adds itself to the Freezer.

## Basic Use

Steps for Common Repo usage

```
cd mon-airdrop
```

```
yarn
```

## Installation

To install Hardhat, go to an empty folder, initialize an `npm` project (i.e. `npm init`), and run

```
npm install --save-dev hardhat
```

Once it's installed, just run this command and follow its instructions:

```
npx hardhat
```

## Testing

To run the tests:

```
npx hardhat test
```

or for a specific test

```
npx hardhat test tests/<test>.js
```

in the case of the merkle airdrop test

```
npx hardhat test tests/merkleAirdrop.js --network localhost
```
