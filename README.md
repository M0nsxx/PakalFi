# MicroInsurance - Plataforma de Micro-Seguros Descentralizada

## 🚀 Descripción

MicroInsurance es una plataforma innovadora de micro-seguros paramétricos que utiliza tecnología blockchain para democratizar el acceso a seguros en México. La plataforma ofrece cobertura automática desde $10 MXN por mes, sin papeleo y con pagos automáticos.

## 🏗️ Arquitectura de Smart Contracts

### Contratos Principales

#### 1. **InsurancePool.sol** - Contrato Principal de Seguros
- **Función**: Gestión de pólizas de micro-seguros
- **Características**:
  - Creación de pólizas paramétricas
  - Gestión de pools de riesgo por tipo de seguro
  - Pagos automáticos basados en triggers
  - Integración con oráculos para datos externos
  - Sistema de roles y permisos

#### 2. **PolicyNFT.sol** - Tokens NFT de Pólizas
- **Función**: Representación digital de pólizas como NFTs
- **Características**:
  - Minting automático de NFTs al crear pólizas
  - Metadatos completos de la póliza
  - Transferibilidad de pólizas
  - Gestión de pólizas activas

#### 3. **ReinsuranceToken.sol** - Sistema de Reaseguro
- **Función**: Tokenización de pools de reaseguro
- **Características**:
  - Tokens ERC20 para inversión en reaseguro
  - Pools de inversión por tipo de riesgo
  - Distribución de yield a inversores
  - Gestión de claims y pérdidas

#### 4. **Oracle.sol** - Sistema de Oráculos
- **Función**: Gestión de datos externos para triggers paramétricos
- **Características**:
  - Datos de clima en tiempo real
  - Datos de salud y seguridad
  - Verificación de triggers automáticos
  - Sistema de reputación de oráculos

### Tipos de Seguros Soportados

1. **Micro-Health** - Seguros de salud
   - Cobertura: $500 MXN diarios por hospitalización
   - Prima: $10-50 MXN/mes
   - Trigger: Datos de salud del usuario

2. **Micro-Climate** - Seguros climáticos
   - Cobertura: Sequía, inundaciones, tormentas
   - Prima: $20-100 MXN/mes
   - Trigger: Datos meteorológicos

3. **Micro-Security** - Seguros de seguridad
   - Cobertura: Robo, asalto, fraude digital
   - Prima: $15-75 MXN/mes
   - Trigger: Datos de criminalidad

4. **Micro-Mobility** - Seguros de movilidad
   - Cobertura: Accidentes, daños a terceros
   - Prima: $25-150 MXN/mes
   - Trigger: Datos de tráfico y accidentes

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 14** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de estilos
- **Framer Motion** - Animaciones
- **Wagmi v2** - Integración con Ethereum
- **Reown AppKit** - WalletConnect moderno

### Smart Contracts
- **Solidity 0.8.20** - Lenguaje de contratos
- **OpenZeppelin** - Contratos seguros
- **Hardhat** - Framework de desarrollo
- **Monad Testnet** - Red de pruebas

### Backend & APIs
- **Supabase** - Base de datos y autenticación
- **Twilio** - Integración WhatsApp
- **TensorFlow.js** - Machine Learning
- **Chart.js** - Visualizaciones

## 🚀 Despliegue en Monad Testnet

### Prerrequisitos
- Node.js 18+
- npm o yarn
- Cuenta en Monad Testnet con MONAD tokens

### Configuración

1. **Instalar dependencias**:
```bash
npm install
```

2. **Compilar contratos**:
```bash
npm run compile
```

3. **Desplegar en Monad Testnet**:
```bash
npm run deploy:monad
```

4. **Verificar contratos**:
```bash
npm run verify:monad
```

### Variables de Entorno

Crear archivo `.env.local`:
```env
# Monad Testnet
NEXT_PUBLIC_MONAD_RPC=https://rpc.testnet.monad.xyz
NEXT_PUBLIC_CHAIN_ID=10143
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=tu-project-id

# APIs
WEATHER_API_KEY=tu-api-key
CONAGUA_API_KEY=tu-api-key
HEALTH_DATA_API=tu-api-key
CRIME_STATS_API=tu-api-key

# WhatsApp
TWILIO_ACCOUNT_SID=tu-sid
TWILIO_AUTH_TOKEN=tu-token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

# Database
NEXT_PUBLIC_SUPABASE_URL=tu-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-key
```

## 📱 Funcionalidades PWA

### Características Móviles
- **Instalación nativa** en dispositivos móviles
- **Funcionamiento offline** con Service Workers
- **Notificaciones push** para claims y pagos
- **Acceso rápido** desde pantalla de inicio

### Optimizaciones
- **Lazy loading** de componentes
- **Compresión de imágenes** automática
- **Caching inteligente** de recursos
- **Hidratación optimizada** para SSR

## 🔐 Seguridad

### Smart Contracts
- **Auditoría de código** con herramientas automáticas
- **Pruebas exhaustivas** para todos los contratos
- **Pausado de emergencia** en caso de vulnerabilidades
- **Control de acceso** basado en roles

### Frontend
- **Validación de entrada** en todos los formularios
- **Sanitización de datos** antes de procesar
- **HTTPS obligatorio** en producción
- **Headers de seguridad** configurados

## 📊 Analytics y Monitoreo

### Métricas Clave
- **Pólizas activas** por tipo
- **Claims procesados** y pagados
- **Satisfacción del cliente**
- **Rendimiento de pools** de reaseguro

### Herramientas
- **Sentry** - Monitoreo de errores
- **Mixpanel** - Analytics de usuarios
- **Google Analytics** - Métricas web
- **Logs personalizados** para auditoría

## 🤝 Contribución

### Desarrollo Local
1. Fork del repositorio
2. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -m 'Agregar nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

### Estándares de Código
- **TypeScript** para todo el código
- **ESLint** y **Prettier** para formato
- **Tests unitarios** para smart contracts
- **Documentación** en español

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## 🆘 Soporte

### Contacto
- **Email**: info@microseguro.com
- **WhatsApp**: 800-MICRO-SEGURO
- **Documentación**: [docs.microseguro.com](https://docs.microseguro.com)

### Comunidad
- **Discord**: [discord.gg/microseguro](https://discord.gg/microseguro)
- **Twitter**: [@microseguro](https://twitter.com/microseguro)
- **LinkedIn**: [MicroInsurance](https://linkedin.com/company/microinsurance)

---

**MicroInsurance** - Democratizando el acceso a seguros en México 🇲🇽
