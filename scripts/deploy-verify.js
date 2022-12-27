const { ethers, run, network } = require("hardhat")

async function main() {
  const AirdropMON = await ethers.getContractFactory('AirdropMON')
	const deployArgs = []

	const airdropMON = await AirdropMON.deploy(...deployArgs)
	console.log('Deploying airdropMON...')
  await airdropMON.deployed()
	console.log('airdropMON deployed to:', airdropMON.address)

  if (network.config.chainId === 1 && process.env.ETHERSCAN_API) {
    console.log("Waiting for block confirmations...")
    await airdropMON.deployTransaction.wait(8)
    await verify(airdropMON.address, deployArgs)
  }
}

const verify = async (contractAddress, args) => {
  console.log("Verifying contract...")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!")
    } else {
      console.log(e)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })