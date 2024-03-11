import { create } from "zustand";
import Web3 from "web3";
import { onchainAbi, onchainContract } from "../utils/contracts/onchain";
type Web3Store = {
  address: string;
  provider: any;
  connected: boolean;
  contract: any;
  setProvider: (newAddress?: string, newProvider?: any) => void;
  setConnected: (connected?: boolean) => void;
};
export const useWeb3Store = create<Web3Store>((set) => ({
  address: "",
  provider: undefined,
  contract: undefined,
  connected: false,
  setProvider: (newAddress, newProvider) => {
    console.log("CONNECT", newAddress, newProvider);
    if (newProvider) {
      // this.checked = true;
      // console.log("CONNECT");
      let web3 = new Web3(newProvider);
      let contract = new web3.eth.Contract(onchainAbi as any, onchainContract);
      set(() => ({ provider: newProvider }));
      set(() => ({ address: newAddress }));
      set(() => ({ contract: contract }));
    }
  },
  setConnected: (connected) => {
    set(() => ({ connected: connected }));
  },
}));
