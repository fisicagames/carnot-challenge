/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_INSPECTOR_ENABLED: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  