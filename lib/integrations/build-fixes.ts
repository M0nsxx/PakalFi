// Temporary fixes for build issues

// Mock Para SDK export to prevent module not found errors
export const ParaSDK = {
  init: () => Promise.resolve(),
  createAppClip: () => Promise.resolve({ url: 'mock://clip' }),
  processPayment: () => Promise.resolve({ success: true }),
};

// Export default to replace missing @getpara/react-sdk
export default ParaSDK;
