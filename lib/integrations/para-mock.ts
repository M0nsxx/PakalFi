// Mock implementation for Para SDK when it's not installed

export const ParaMock = {
  init: () => Promise.resolve(),
  createAppClip: () => Promise.resolve({ url: 'mock://para-app-clip' }),
  processPayment: () => Promise.resolve({ success: true, txId: 'mock-tx' }),
  generateQR: () => Promise.resolve('mock-qr-code'),
  enableBiometrics: () => Promise.resolve(true)
};

export default ParaMock;
