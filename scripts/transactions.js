const { ethers, network } = require('hardhat')
const { Wallet, providers, BigNumber } = require('ethers');

const AirdropABI = require('../abi/AirdropMON.json')

const AIRDROP_MON_CONTRACT = '0x06b3244b086cecC40F1e5A826f736Ded68068a0F'
const ADMIN_MULTI = '0x83737EAe72ba7597b36494D723fbF58cAfee8A69'
const TREASURY = '0x83737EAe72ba7597b36494D723fbF58cAfee8A69'
const DISTRIBUTOR = '0x83737EAe72ba7597b36494D723fbF58cAfee8A69'

async function main() {
    const provider = new providers.InfuraProvider("mainnet");
    const wallet = new Wallet(process.env.ACCOUNT || "").connect(provider);

    const AirdropMON = new ethers.Contract(AIRDROP_MON_CONTRACT, AirdropABI, wallet)

    await setAddresses(AirdropMON)
    await transferOwnership(AirdropMON)
}

async function setAddresses(AirdropMON) {
    console.log('Setting Addresses in AirdropMON Contract...')
    const initialize = await AirdropMON.setAddresses(TREASURY, DISTRIBUTOR)
    await initialize.wait()
    console.log('AirdropMON initialized')
}

async function transferOwnership(airdropMON) {
    console.log('Transferring airdropMON ownership to MultiSig...')
    const transferOwnership = await airdropMON.transferOwnership(ADMIN_MULTI)
    await transferOwnership.wait()
    console.log('Ownership transferred to: ', {ADMIN_MULTI})
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})