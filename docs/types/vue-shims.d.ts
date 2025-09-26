declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 声明Node.js模块
declare module 'node:fs' {
  export function readFileSync(path: string, encoding: BufferEncoding): string
  export function readFileSync(path: string): Buffer
  export * from 'fs'
}

declare module 'node:path' {
  export function parse(path: string): {
    root: string
    dir: string
    base: string
    ext: string
    name: string
  }
  export function basename(path: string, ext?: string): string
  export * from 'path'
}

// UnoCSS类型
declare module 'uno.css'

// VitePress插件类型
declare module 'vitepress-plugin-51la' {
  export interface LaPluginOptions {
    id: string
    ck: string
    importMode?: 'sync' | 'async'
  }

  export function La51Plugin(options: LaPluginOptions): any
}
