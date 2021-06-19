

import { JsonAsset } from "cc";
// import * as Web3 from "web3";
// import { EthApi, ContractAbi, Provider } from "web3";

const isWeb3Enabled = () => {
    let w = window as any;
    return !!w.web3
}

export interface IRequestAccountResponse {
    accounts: string[]
}

export interface IRequestBalanceResponse {
    balance: number
}

export interface IError {
    code: string,
    message: string
}


export default class Web3Controller {
    web3!: any; // Web3 instance which injected by MetaMask
    web3Provider!: any; // Current provider in Web3
    web3ProviderName: string = "metamask"; // Current provider name in Web3
    contract: any; // TomoLuckyBox contract object
    contractABI: JsonAsset | null = null; // Ref to ABI JSON file of contract 
    currentAccount: string = ""; //Current player address
    public static TOMOLUCKYBOX_CONTRACT_ADRESS_TESTNET: string = "0xE4b9575808a400BDBA5FF4dED99a23939D38081a"; // Address of our smart contract on TomoChain Testnet


    public static get instance(): Web3Controller {
        if (this._instance == null)
            this._instance = new Web3Controller();
        return this._instance;
    }
    private static _instance: Web3Controller | null = null;

    public isConnect(): boolean {
        if (!this.web3)
            return false;
        return this.web3.isConnected();
    }

    public async initialize(): Promise<IRequestAccountResponse> {

        return new Promise(async (resolve, reject) => {
            if (isWeb3Enabled()) {
                this.web3 = new Web3();
                let w = window as any;
                //Request account access for modern dapp browsers
                if (w.ethereum) {
                    this.web3ProviderName = "metamask";
                    this.web3Provider = w.ethereum;
                    this.web3.setProvider(this.web3Provider);

                    w.ethereum
                        .enable()
                        .then(async (accounts: any) => {
                            console.log('accounts', accounts);
                            let result = await Web3Controller.instance._initAccount();
                            Web3Controller.instance.initContract();
                            resolve(result);
                        })
                        .catch((error: any) => {
                            console.error(error);
                            reject({ code: "", message: "You must enable and login into your TomoWallet or MetaMask accounts!" });
                        });
                } else if (w.web3) {
                    this.web3ProviderName = "tomowallet";
                    this.web3Provider = w.web3.currentProvider;
                    this.web3.setProvider(this.web3Provider);

                    let result = await Web3Controller.instance._initAccount();
                    Web3Controller.instance.initContract();
                    resolve(result);
                }
                //Request account access for legacy dapp browsers
                // else if (w.web3) {
                //     this.Web3ProviderName = "tomowallet";
                //     this.Web3Provider = w.web3.currentProvider;
                //     this.Web3.setProvider(this.Web3Provider);
                //     Web3Controller.instance.initAccount();
                //     // Web3Controller.instance.initContract();
                // }
            }
            else {
                reject({ code: "", message: "You must enable and login into your TomoWallet or MetaMask accounts!" });
            }
        });
    }


    initContract() {
        // this.contract = this.web3.eth.contract(
        //     // this.contractABI.json.abi,
        //     Web3Controller.TOMOLUCKYBOX_CONTRACT_ADRESS_TESTNET
        // );
        // console.log('contract', this.contract);
    }

    private async _initAccount(): Promise<IRequestAccountResponse> {
        console.log('_initAccount');
        return new Promise((resolve, reject) => {
            this.web3.eth.getAccounts((error: Error, accounts: string[]) => {
                if (accounts.length > 0) {
                    Web3Controller.instance.currentAccount = accounts[0].toLowerCase();
                    console.log('getAccounts', accounts);
                    resolve({ accounts: accounts });
                } else {
                    reject({ code: "", message: "You must enable and login into your TomoWallet or MetaMask accounts!" });
                }
            });
        });
    }

    public getBalance(): Promise<IRequestBalanceResponse> {
        console.log('request getBalance');
        return new Promise((resolve, reject) => {
            this.web3.eth.getBalance(
                Web3Controller.instance.currentAccount,
                (err: Error, balance: number) => {
                    if (err) {
                        console.error(err);
                        reject({ code: "", message: err.message })
                        return;
                    }
                    console.log('balance', balance);
                    resolve({ balance: balance });
                }
            );
        });

    }

}

