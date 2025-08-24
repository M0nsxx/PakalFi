# 🚀 PakalFi - Production Setup Guide

## 📋 Overview

This guide will help you set up PakalFi for production with all real integrations and deployed contracts on Monad testnet.

## 🔧 Prerequisites

- Node.js 18+ 
- npm or yarn
- Monad testnet wallet with MONAD tokens
- API keys for all partner integrations

## 🏗️ Contract Deployment Status

All contracts are deployed on Monad testnet (Chain ID: 10143):

| Contract | Address | Status |
|----------|---------|--------|
| Oracle | `0xaF9bAD18233d180BB7F763A0be4A252bDf16c776` | ✅ Deployed |
| Reinsurance Token | `0x47EdA49ea71f20738085f8774Be3f881A02354Af` | ✅ Deployed |
| Policy NFT | `0xdaAb335F3B2dAc3e963809EE7dD8102A890870a3` | ✅ Deployed |
| Insurance Pool | `0x5b33069977773557D07023A73468fD16F83ebaea` | ✅ Deployed |
| Gasless Payment Handler | `0xd5de766cdAAA47c9dB756c0f0c01d0F0494571D0` | ✅ Deployed |
| Savings Goal Handler | `0xE01592cE50FeFF1e9FB65888c66Dd5c6c4C85637` | ✅ Deployed |

## 🔑 Required API Keys

### 1. Envio Analytics
- **Purpose**: Real-time blockchain analytics and indexing
- **Get API Key**: [Envio Dashboard](https://indexer.envio.dev)
- **Environment Variable**: `ENVIO_API_KEY`

### 2. Para Insurance
- **Purpose**: App Clips and savings goals
- **Get API Key**: [Para Dashboard](https://api.para.com)
- **Environment Variable**: `PARA_API_KEY`

### 3. SDG Impact (BGA)
- **Purpose**: SDG impact tracking and metrics
- **Get API Key**: [BGA Dashboard](https://api.bga.com)
- **Environment Variable**: `BGA_API_KEY`

### 4. 0x Protocol
- **Purpose**: Gasless payments and token swaps
- **Get API Key**: [0x Dashboard](https://api.0x.org)
- **Environment Variable**: `NEXT_PUBLIC_0X_API_KEY`

## ⚙️ Environment Configuration

1. Copy the example environment file:
```bash
cp env.example .env.local
```

2. Fill in all required environment variables:

```env
# Monad Testnet Configuration
NEXT_PUBLIC_MONAD_TESTNET_RPC=https://testnet-rpc.monad.xyz/
NEXT_PUBLIC_MONAD_TESTNET_CHAIN_ID=10143
NEXT_PUBLIC_MONAD_TESTNET_EXPLORER=https://explorer.testnet.monad.xyz

# Deployed Contract Addresses (Monad Testnet)
NEXT_PUBLIC_ORACLE_ADDRESS=0xaF9bAD18233d180BB7F763A0be4A252bDf16c776
NEXT_PUBLIC_REINSURANCE_TOKEN_ADDRESS=0x47EdA49ea71f20738085f8774Be3f881A02354Af
NEXT_PUBLIC_POLICY_NFT_ADDRESS=0xdaAb335F3B2dAc3e963809EE7dD8102A890870a3
NEXT_PUBLIC_INSURANCE_POOL_ADDRESS=0x5b33069977773557D07023A73468fD16F83ebaea
NEXT_PUBLIC_GASLESS_PAYMENT_HANDLER_ADDRESS=0xd5de766cdAAA47c9dB756c0f0c01d0F0494571D0
NEXT_PUBLIC_SAVINGS_GOAL_HANDLER_ADDRESS=0xE01592cE50FeFF1e9FB65888c66Dd5c6c4C85637

# Partner Integrations
ENVIO_API_KEY=your_envio_api_key_here
ENVIO_API_URL=https://indexer.envio.dev

PARA_API_KEY=your_para_api_key_here
PARA_API_URL=https://api.para.com

BGA_API_KEY=your_bga_api_key_here
BGA_API_URL=https://api.bga.com

NEXT_PUBLIC_0X_API_KEY=your_0x_api_key_here
NEXT_PUBLIC_0X_API_URL=https://api.0x.org

# Environment
NODE_ENV=production
NEXT_PUBLIC_APP_ENV=production
```

## 🚀 Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Validate configuration:
```bash
npm run validate:config
```

3. Build the application:
```bash
npm run build
```

4. Start the production server:
```bash
npm start
```

## 🔍 Configuration Validation

The application includes automatic configuration validation that checks:

- ✅ All required API keys are present
- ✅ Contract addresses are valid and deployed
- ✅ Environment variables are properly set
- ✅ Network connectivity to Monad testnet
- ✅ Partner API connectivity

## 🧪 Testing Integrations

### 1. Test Contract Connectivity
```bash
npm run test:contracts
```

### 2. Test Partner APIs
```bash
npm run test:integrations
```

### 3. Test End-to-End Flow
```bash
npm run test:e2e
```

## 📊 Monitoring & Analytics

### Integration Status Dashboard
Access `/admin/integrations` to view real-time status of all integrations.

### Health Check Endpoint
```bash
curl https://your-domain.com/api/health
```

## 🔧 Troubleshooting

### Common Issues

1. **Contract Connection Failed**
   - Verify RPC URL is correct
   - Check if contracts are deployed
   - Ensure wallet is connected to Monad testnet

2. **API Integration Errors**
   - Verify API keys are valid
   - Check API rate limits
   - Ensure network connectivity

3. **Configuration Validation Failed**
   - Run `npm run validate:config` for detailed errors
   - Check all environment variables are set
   - Verify API endpoints are accessible

### Debug Mode

Enable debug mode for detailed logging:
```env
NEXT_PUBLIC_DEBUG=true
NODE_ENV=development
```

## 🚀 Deployment

### Vercel Deployment
1. Connect your repository to Vercel
2. Set all environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Docker Deployment
```bash
docker build -t pakalfi .
docker run -p 3000:3000 --env-file .env.local pakalfi
```

## 📈 Performance Optimization

- ✅ Automatic code splitting
- ✅ Image optimization
- ✅ PWA caching
- ✅ API response caching
- ✅ Real-time data streaming

## 🔒 Security

- ✅ Environment variable validation
- ✅ API key encryption
- ✅ CORS configuration
- ✅ Rate limiting
- ✅ Input validation

## 📞 Support

For technical support:
- 📧 Email: support@pakalfi.com
- 💬 Discord: [PakalFi Community](https://discord.gg/pakalfi)
- 📱 Telegram: [@PakalFiSupport](https://t.me/PakalFiSupport)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
