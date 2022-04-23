import React from 'react'
import { useWallet, UseWalletProvider } from 'use-wallet'

function Connection() {
  const wallet = useWallet()
  
  const connectWallet = async (event) => {
    event.preventDefault()
    await wallet.connect()    
  }

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
    </div>
  )
}

// Wrap everything in <UseWalletProvider />
export default () => (
  <UseWalletProvider
    chainId={1337}
    connectors={{
      // This is how connectors get configured
      provided: { provider: window.cleanEthereum },
    }}>
    <Connection />
  </UseWalletProvider>
)