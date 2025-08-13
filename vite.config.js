// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Quiz/',   // ← 레포 이름과 정확히 일치, 반드시 슬래시로 감싸기
})
