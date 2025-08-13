// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'   // ← 여기 이름과 설치한 패키지가 반드시 일치!

export default defineConfig({
  plugins: [react()],
  base: '/Quiz/',                          // GitHub Pages 프로젝트 레포면 /레포명/ (앞뒤 슬래시 필수)
})
