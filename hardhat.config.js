// hardhat.config.js
require('dotenv').config()
require('@nomiclabs/hardhat-ethers')
require('@nomiclabs/hardhat-etherscan')
require('hardhat-abi-exporter')
require("hardhat-gas-reporter")
require('hardhat-contract-sizer');
require("@nomicfoundation/hardhat-chai-matchers")

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	solidity: {
		version: '0.8.15',
		settings: {
			optimizer: {
				enabled: true,
				runs: 10000
			},
			evmVersion: 'istanbul'
		}
	},
	etherscan: {
		apiKey: process.env.ETHERSCAN_API
	},
	abiExporter: {
		path: './abi',
		clear: true,
		flat: true,
		spacing: 2,
		pretty: true
	},
	networks: {
		hardhat: {
			allowUnlimitedContractSize: true,
			chainId: 137,
			hardfork: 'london',
			forking: {
				url: 'https://polygon-rpc.com/'
			},
			initialBaseFeePerGas: 0,
			mining: {
				auto: true,
				interval: 1000
			}
		},
		localhost: {
			chainId: 1,
			url: 'http://127.0.0.1:8545/',
			allowUnlimitedContractSize: true,
			timeout: 1000 * 60,

		},
		"polygon-mumbai": {
			url: 'https://polygon-rpc.com',
			chainId: 137,
			hardfork: 'istanbul',
			accounts: [process.env.ACCOUNT]
		},
		"rinkeby": {
			url: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
			chainId: 4,
			hardfork: 'istanbul',
			accounts: [process.env.ACCOUNT]
		},
		"goerli": {
			url: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
			chainId: 5,
			hardfork: 'istanbul',
			accounts: [process.env.ACCOUNT],
		},
		"mainnet": {
			url: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
			chainId: 1,
			hardfork: 'istanbul',
			accounts: [process.env.ACCOUNT]
		}
	},
	gasReporter: {
		enabled: false
	},
	contractSizer: {
		alphaSort: true,
		disambiguatePaths: false,
		runOnCompile: false,
		strict: true,
		only: [],
	}
}

