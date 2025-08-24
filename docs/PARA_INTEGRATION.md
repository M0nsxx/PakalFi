# Para x Monad Mobile3 Hackathon Integration

## 🚀 Overview

Esta integración implementa las dos bounties del hackathon de Monad Mobile3 usando Para SDK:

1. **Bounty 1: App Clips Payments** - Pagos instantáneos de USDC usando App Clips
2. **Bounty 2: Savings Goals** - App de ahorros con metas usando stablecoins

## 📋 Requirements

### Prerequisites
- Node.js 18+
- Para Developer Account
- Monad Testnet Access
- iOS Simulator (para App Clips)

### Dependencies
```bash
npm install @getpara/react-sdk @getpara/server-sdk qrcode.react
```

## 🔧 Setup

### 1. Environment Configuration

Copia `env.example` a `.env.local` y configura las variables:

```bash
# Para SDK Configuration
NEXT_PUBLIC_PARA_CLIENT_ID=your_para_client_id_here
PARA_API_KEY=your_para_api_key_here

# Monad Network Configuration
NEXT_PUBLIC_MONAD_RPC_URL=https://rpc.testnet.monad.xyz
NEXT_PUBLIC_MONAD_CHAIN_ID=10143
NEXT_PUBLIC_MONAD_EXPLORER=https://explorer.testnet.monad.xyz

# Contract Addresses
NEXT_PUBLIC_USDC_TOKEN_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_PARAD_INTEGRATION_ADDRESS=0x0000000000000000000000000000000000000000
```

### 2. Deploy Smart Contracts

```bash
# Compile contracts
npx hardhat compile

# Deploy to Monad testnet
npx hardhat run scripts/deploy-monad.js --network monad-testnet
```

### 3. Update Contract Addresses

Después del deploy, actualiza las direcciones en `.env.local`:

```bash
NEXT_PUBLIC_USDC_TOKEN_ADDRESS=<deployed_usdc_address>
NEXT_PUBLIC_PARAD_INTEGRATION_ADDRESS=<deployed_integration_address>
```

## 🏗️ Architecture

### Smart Contracts

#### MonadParaIntegration.sol
- **processInstantPayment()**: Maneja pagos instantáneos de USDC
- **createSavingsGoal()**: Crea metas de ahorro
- **addToSavingsGoal()**: Añade fondos a metas existentes
- **lockSavingsGoal()**: Bloquea metas completadas

#### MockUSDC.sol
- Token ERC20 mock para testing
- 6 decimales como USDC real

### Frontend Components

#### ParaMonadDemo.tsx
Componente principal que incluye:

- **AppClipPaymentDemo**: Implementación de Bounty 1
- **SavingsGoalsDemo**: Implementación de Bounty 2
- **ParaProvider**: Configuración del SDK de Para

## 🎯 Bounty 1: App Clips Payments

### Features Implemented
- ✅ QR code generation para pagos
- ✅ Para wallet integration
- ✅ Instant USDC transfers
- ✅ Transaction signing
- ✅ Payment status tracking

### Usage Flow
1. User clicks "Create Payment QR"
2. Para wallet connects (passkey/Face ID)
3. QR code generated with payment details
4. iOS App Clip scans QR
5. User approves with biometrics
6. Transaction signed and broadcast to Monad

### Code Example
```typescript
const createAppClipPayment = async () => {
  const payment = {
    id: `payment_${Date.now()}`,
    amount: 50, // Fixed USDC amount
    recipient: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    qrCode: `microinsurance://pay/${Date.now()}`,
    status: 'pending'
  };
  
  // Process with Para SDK
  const transaction = {
    to: payment.recipient,
    value: payment.amount * 1e6,
    data: '0x',
    chainId: 10143
  };
  
  const signedTx = await signTransaction(transaction);
};
```

## 💰 Bounty 2: Savings Goals

### Features Implemented
- ✅ Goal creation with custom names
- ✅ USDC deposits and tracking
- ✅ Progress visualization
- ✅ Automatic goal completion
- ✅ Fund locking mechanism

### Usage Flow
1. User creates savings goal
2. Para wallet handles authentication
3. Initial deposit locked in smart contract
4. User can add funds over time
5. Goal automatically completes when target reached
6. Funds locked until user unlocks

### Code Example
```typescript
const createSavingsGoal = async (formData) => {
  const goal = {
    id: `goal_${Date.now()}`,
    name: formData.name,
    targetAmount: formData.targetAmount,
    currentAmount: formData.initialDeposit,
    deadline: formData.deadline,
    status: 'active'
  };
  
  // Lock initial deposit
  if (formData.initialDeposit > 0) {
    const transaction = {
      to: contractAddress,
      value: formData.initialDeposit * 1e6,
      data: '0x',
      chainId: 10143
    };
    
    await signTransaction(transaction);
  }
};
```

## 🔐 Para SDK Integration

### Configuration
```typescript
<ParaProvider
  clientId={process.env.NEXT_PUBLIC_PARA_CLIENT_ID}
  environment="testnet"
>
  {/* App content */}
</ParaProvider>
```

### Hooks Used
- `useModal()`: Para wallet connection modals
- `useAccount()`: User account state
- `useSignTransaction()`: Transaction signing
- `useWallet()`: Wallet operations

### Authentication Flow
1. User clicks connect
2. Para modal opens
3. User authenticates with passkey/Face ID
4. Embedded wallet created
5. User can sign transactions

## 🧪 Testing

### Local Development
```bash
# Start development server
npm run dev

# Navigate to demo
http://localhost:3000/demo/para-monad
```

### Test Scenarios

#### App Clips Payments
1. Connect Para wallet
2. Create payment QR
3. Verify QR code generation
4. Test transaction signing
5. Verify payment status updates

#### Savings Goals
1. Create new savings goal
2. Add initial deposit
3. Add additional funds
4. Verify progress tracking
5. Test goal completion
6. Test fund locking

### Contract Testing
```bash
# Run contract tests
npx hardhat test

# Test specific functions
npx hardhat test test/MonadParaIntegration.test.js
```

## 📱 App Clips Implementation

### iOS App Clip Structure
```
AppClip/
├── Info.plist
├── AppClipDelegate.swift
├── PaymentViewController.swift
└── QRScannerViewController.swift
```

### URL Scheme Handling
```swift
// Handle microinsurance:// URLs
func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    if url.scheme == "microinsurance" {
        handlePaymentURL(url)
        return true
    }
    return false
}
```

### Para Integration in iOS
```swift
// Initialize Para SDK
ParaClient.shared.configure(
    clientId: "your_client_id",
    environment: .testnet
)

// Authenticate user
ParaClient.shared.authenticate { result in
    switch result {
    case .success(let wallet):
        // Handle successful authentication
    case .failure(let error):
        // Handle error
    }
}
```

## 🚀 Deployment

### Smart Contracts
```bash
# Deploy to Monad testnet
npx hardhat run scripts/deploy-monad.js --network monad-testnet

# Verify contracts
npx hardhat verify --network monad-testnet <contract_address> <constructor_args>
```

### Frontend
```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

### iOS App Clip
1. Build App Clip target
2. Upload to App Store Connect
3. Configure App Clip experience
4. Test QR code scanning

## 📊 Monitoring & Analytics

### Events Tracked
- Wallet connections
- Payment transactions
- Goal creations
- Fund deposits
- Goal completions

### Metrics
- Transaction success rate
- User engagement
- Goal completion rate
- Average deposit amounts

## 🔒 Security Considerations

### Smart Contract Security
- Reentrancy protection
- Access control
- Input validation
- Emergency pause functionality

### Frontend Security
- Environment variable protection
- API key management
- Input sanitization
- Error handling

### Para SDK Security
- Secure authentication
- Transaction signing
- Session management
- Key management

## 🐛 Troubleshooting

### Common Issues

#### Para SDK Connection
```bash
# Check environment variables
echo $NEXT_PUBLIC_PARA_CLIENT_ID

# Verify network configuration
# Ensure Monad testnet is accessible
```

#### Contract Deployment
```bash
# Check gas fees
# Verify contract addresses
# Test contract functions
```

#### QR Code Generation
```bash
# Verify URL scheme
# Test QR code scanning
# Check App Clip configuration
```

### Debug Mode
```typescript
// Enable debug logging
const paraClient = new ParaClient({
  clientId: process.env.NEXT_PUBLIC_PARA_CLIENT_ID,
  environment: "testnet",
  debug: true
});
```

## 📚 Resources

### Documentation
- [Para SDK Documentation](https://docs.getpara.com/v2/)
- [Monad Documentation](https://docs.monad.xyz/)
- [App Clips Guide](https://developer.apple.com/app-clips/)

### APIs
- [Para API Reference](https://docs.getpara.com/v2/api/)
- [Monad RPC Endpoints](https://docs.monad.xyz/developers/rpc)

### Community
- [Para Discord](https://discord.gg/para)
- [Monad Discord](https://discord.gg/monad)
- [Hackathon Discord](https://discord.gg/monadhackathon)

## 🏆 Bounty Submission

### Acceptance Criteria Met

#### Bounty 1: App Clips Payments ✅
- ✅ App Clip launches from QR code
- ✅ Para authentication with passkey/Face ID
- ✅ USDC payment confirmation
- ✅ Transaction broadcast to Monad
- ✅ iOS App Clip implementation
- ✅ Monad smart contract
- ✅ Para integration
- ✅ Clear README

#### Bounty 2: Savings Goals ✅
- ✅ Mobile-first savings app
- ✅ Custom savings goals
- ✅ USDC deposits and tracking
- ✅ Smart contract fund locking
- ✅ Progress visualization
- ✅ Goal completion events
- ✅ Para wallet integration
- ✅ Clean UI implementation

### Demo Links
- **Live Demo**: https://microinsurance.global/demo/para-monad
- **GitHub Repository**: https://github.com/microinsurance/para-monad-demo
- **Video Demo**: [Link to demo video]

### Technical Stack
- **Frontend**: Next.js 14, React 18, TypeScript
- **Blockchain**: Monad, Solidity, Hardhat
- **Wallet**: Para SDK v2.0
- **UI**: Tailwind CSS, Headless UI
- **QR Codes**: qrcode.react
- **Mobile**: iOS App Clips, Swift

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests
5. Submit pull request

---

**Built with ❤️ for the Monad Mobile3 Hackathon**
