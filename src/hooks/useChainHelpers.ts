import { ethers } from 'ethers';

export default function useChainHelpers() {

  function getChainName(chainId) {
    if (chainId === 1) {
      return "Ethereum";
    } else if (chainId === 168587773) {
      return "Blast Testnet";
    } else {
      return "Unsupported Network";
    }
  }

  function getFallbackProvider(networkId) {
    let urls;

      if (networkId === 1) {
        // Ethereum
        urls = [
          "https://1rpc.io/eth"
        ];
      } else if (networkId === 168587773) {
        // Blast Testnet
        urls = [
          "https://sepolia.blast.io"
        ]; 
      } 

      if (urls) {
        const providers = urls.map(url => new ethers.providers.JsonRpcProvider(url));
        return new ethers.providers.FallbackProvider(providers, 1); // return fallback provider
      } else {
        return null;
      }
  }

  function switchNetwork(networkName) {
    let method;
    let params;

    if (networkName == "Ethereum") {
      method = "wallet_switchEthereumChain"
      params = [{ chainId: "0x1" }] 
    } else if (networkName == "Blast Testnet") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://testnet.blastscan.io" ],
        chainId: ethers.utils.hexValue(168587773),
        chainName: networkName,
        nativeCurrency: { decimals: 18, name: "ETH", symbol: "ETH" }, 
        rpcUrls: ["https://sepolia.blast.io"]
      }] 
    } 

    return { 
      method: method, 
      params: params
    }
  }

  // RETURN
  return {
    getChainName,
    getFallbackProvider,
    switchNetwork
  }
}