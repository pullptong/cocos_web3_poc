
import { _decorator, Component, Node } from 'cc';
import Web3Controller from "./web3-controller/Web3Controller";

const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {

    onLoad() {
    }

    async start() {
        await Web3Controller.instance.initialize(); 
        await Web3Controller.instance.getBalance();
    }

    // update (dt) {}
}
