// vite.config.js
import { fileURLToPath, URL } from "node:url";
import path from "path";
import { defineConfig } from "file:///F:/front_end/json_schema_vue/node_modules/vite/dist/node/index.js";
import vue from "file:///F:/front_end/json_schema_vue/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///F:/front_end/json_schema_vue/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import vueDevTools from "file:///F:/front_end/json_schema_vue/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import AutoImport from "file:///F:/front_end/json_schema_vue/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///F:/front_end/json_schema_vue/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///F:/front_end/json_schema_vue/node_modules/unplugin-vue-components/dist/resolvers.js";
import mockDevServerPlugin from "file:///F:/front_end/json_schema_vue/node_modules/vite-plugin-mock-dev-server/dist/index.js";
import Unocss from "file:///F:/front_end/json_schema_vue/node_modules/unocss/dist/vite.mjs";
import {
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from "file:///F:/front_end/json_schema_vue/node_modules/unocss/dist/index.mjs";
import IconsResolver from "file:///F:/front_end/json_schema_vue/node_modules/unplugin-icons/dist/resolver.js";
import Icons from "file:///F:/front_end/json_schema_vue/node_modules/unplugin-icons/dist/vite.js";
import Inspect from "file:///F:/front_end/json_schema_vue/node_modules/vite-plugin-inspect/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///F:/front_end/json_schema_vue/vite.config.js";
var pathSrc = path.resolve(fileURLToPath(new URL("./", __vite_injected_original_import_meta_url)), "src");
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ["vue"],
      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),
        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: "Icon"
        })
      ],
      eslintrc: {
        enabled: true
      }
    }),
    Components({
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ["ep"]
        }),
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver({
          importStyle: "sass"
        })
      ]
    }),
    Icons({
      autoInstall: true
    }),
    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
          warn: true
        })
      ],
      transformers: [
        transformerDirectives(),
        transformerVariantGroup()
      ]
    }),
    //前端mock数据插件
    mockDevServerPlugin(
      /* plugin options */
    ),
    //插件生效检查插件
    Inspect()
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)),
      "~/": `${pathSrc}/`
    }
  },
  //为了引入命名空间ep，的其中一部分操作
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/element/index.scss" as *;`
      }
    }
  },
  server: {
    port: 4e3,
    // 端口号
    open: false,
    // 是否自动开启浏览器
    proxy: {
      "/xdata-succeed-mill": {
        target: "http://localhost:8080",
        changeOrigin: true
      }
    }
  },
  build: {
    sourcemap: true
    // 确保 sourcemap 启用
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxmcm9udF9lbmRcXFxcanNvbl9zY2hlbWFfdnVlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFxmcm9udF9lbmRcXFxcanNvbl9zY2hlbWFfdnVlXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi9mcm9udF9lbmQvanNvbl9zY2hlbWFfdnVlL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcblxyXG5cclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXHJcbmltcG9ydCB2dWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXHJcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXHJcbmltcG9ydCB7IGRpcm5hbWUgfSBmcm9tICdwYXRoJztcclxuaW1wb3J0IG1vY2tEZXZTZXJ2ZXJQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tbW9jay1kZXYtc2VydmVyJ1xyXG5cclxuaW1wb3J0IFVub2NzcyBmcm9tICd1bm9jc3Mvdml0ZSdcclxuaW1wb3J0IHtcclxuICBwcmVzZXRBdHRyaWJ1dGlmeSxcclxuICBwcmVzZXRJY29ucyxcclxuICBwcmVzZXRVbm8sXHJcbiAgdHJhbnNmb3JtZXJEaXJlY3RpdmVzLFxyXG4gIHRyYW5zZm9ybWVyVmFyaWFudEdyb3VwLFxyXG59IGZyb20gJ3Vub2NzcydcclxuXHJcbmltcG9ydCBJY29uc1Jlc29sdmVyIGZyb20gJ3VucGx1Z2luLWljb25zL3Jlc29sdmVyJ1xyXG5pbXBvcnQgSWNvbnMgZnJvbSAndW5wbHVnaW4taWNvbnMvdml0ZSdcclxuaW1wb3J0IEluc3BlY3QgZnJvbSAndml0ZS1wbHVnaW4taW5zcGVjdCdcclxuXHJcbmNvbnN0IHBhdGhTcmMgPSBwYXRoLnJlc29sdmUoZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuLycsIGltcG9ydC5tZXRhLnVybCkpLCAnc3JjJylcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKCksXHJcbiAgICB2dWVKc3goKSxcclxuICAgIHZ1ZURldlRvb2xzKCksXHJcbiAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgLy8gQXV0byBpbXBvcnQgZnVuY3Rpb25zIGZyb20gVnVlLCBlLmcuIHJlZiwgcmVhY3RpdmUsIHRvUmVmLi4uXHJcbiAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NSBWdWUgXHU3NkY4XHU1MTczXHU1MUZEXHU2NTcwXHVGRjBDXHU1OTgyXHVGRjFBcmVmLCByZWFjdGl2ZSwgdG9SZWYgXHU3QjQ5XHJcbiAgICAgIGltcG9ydHM6IFsndnVlJ10sXHJcblxyXG4gICAgICAvLyBBdXRvIGltcG9ydCBmdW5jdGlvbnMgZnJvbSBFbGVtZW50IFBsdXMsIGUuZy4gRWxNZXNzYWdlLCBFbE1lc3NhZ2VCb3guLi4gKHdpdGggc3R5bGUpXHJcbiAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NSBFbGVtZW50IFBsdXMgXHU3NkY4XHU1MTczXHU1MUZEXHU2NTcwXHVGRjBDXHU1OTgyXHVGRjFBRWxNZXNzYWdlLCBFbE1lc3NhZ2VCb3guLi4gKFx1NUUyNlx1NjgzN1x1NUYwRilcclxuICAgICAgcmVzb2x2ZXJzOiBbXHJcbiAgICAgICAgRWxlbWVudFBsdXNSZXNvbHZlcigpLFxyXG5cclxuICAgICAgICAvLyBBdXRvIGltcG9ydCBpY29uIGNvbXBvbmVudHNcclxuICAgICAgICAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcdTU2RkVcdTY4MDdcdTdFQzRcdTRFRjZcclxuICAgICAgICBJY29uc1Jlc29sdmVyKHtcclxuICAgICAgICAgIHByZWZpeDogJ0ljb24nLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICBdLFxyXG4gICAgICBlc2xpbnRyYzoge1xyXG4gICAgICAgIGVuYWJsZWQ6IHRydWVcclxuICAgICAgfSxcclxuICAgIH0pLFxyXG4gICAgQ29tcG9uZW50cyh7XHJcbiAgICAgIHJlc29sdmVyczogW1xyXG4gICAgICAgIC8vIEF1dG8gcmVnaXN0ZXIgaWNvbiBjb21wb25lbnRzXHJcbiAgICAgICAgLy8gXHU4MUVBXHU1MkE4XHU2Q0U4XHU1MThDXHU1NkZFXHU2ODA3XHU3RUM0XHU0RUY2XHJcbiAgICAgICAgSWNvbnNSZXNvbHZlcih7XHJcbiAgICAgICAgICBlbmFibGVkQ29sbGVjdGlvbnM6IFsnZXAnXSxcclxuICAgICAgICB9KSxcclxuICAgICAgICAvLyBBdXRvIHJlZ2lzdGVyIEVsZW1lbnQgUGx1cyBjb21wb25lbnRzXHJcbiAgICAgICAgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1IEVsZW1lbnQgUGx1cyBcdTdFQzRcdTRFRjZcclxuICAgICAgICBFbGVtZW50UGx1c1Jlc29sdmVyKHtcclxuICAgICAgICAgIGltcG9ydFN0eWxlOiAnc2FzcycsXHJcbiAgICAgICAgfSksXHJcbiAgICAgIF1cclxuICAgIH0pLFxyXG4gICAgSWNvbnMoe1xyXG4gICAgICBhdXRvSW5zdGFsbDogdHJ1ZSxcclxuICAgIH0pLFxyXG4gICAgVW5vY3NzKHtcclxuICAgICAgcHJlc2V0czogW1xyXG4gICAgICAgIHByZXNldFVubygpLFxyXG4gICAgICAgIHByZXNldEF0dHJpYnV0aWZ5KCksXHJcbiAgICAgICAgcHJlc2V0SWNvbnMoe1xyXG4gICAgICAgICAgc2NhbGU6IDEuMixcclxuICAgICAgICAgIHdhcm46IHRydWUsXHJcbiAgICAgICAgfSksXHJcbiAgICAgIF0sXHJcbiAgICAgIHRyYW5zZm9ybWVyczogW1xyXG4gICAgICAgIHRyYW5zZm9ybWVyRGlyZWN0aXZlcygpLFxyXG4gICAgICAgIHRyYW5zZm9ybWVyVmFyaWFudEdyb3VwKCksXHJcbiAgICAgIF1cclxuICAgIH0pLFxyXG4gICAgLy9cdTUyNERcdTdBRUZtb2NrXHU2NTcwXHU2MzZFXHU2M0QyXHU0RUY2XHJcbiAgICBtb2NrRGV2U2VydmVyUGx1Z2luKC8qIHBsdWdpbiBvcHRpb25zICovKSxcclxuICAgIC8vXHU2M0QyXHU0RUY2XHU3NTFGXHU2NTQ4XHU2OEMwXHU2N0U1XHU2M0QyXHU0RUY2XHJcbiAgICBJbnNwZWN0KClcclxuICBdLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgICAnfi8nOiBgJHtwYXRoU3JjfS9gXHJcbiAgICB9XHJcbiAgfSxcclxuICAvL1x1NEUzQVx1NEU4Nlx1NUYxNVx1NTE2NVx1NTQ3RFx1NTQwRFx1N0E3QVx1OTVGNGVwXHVGRjBDXHU3Njg0XHU1MTc2XHU0RTJEXHU0RTAwXHU5MEU4XHU1MjA2XHU2NENEXHU0RjVDXHJcbiAgY3NzOiB7XHJcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgIHNjc3M6IHtcclxuICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEB1c2UgXCJ+L3N0eWxlcy9lbGVtZW50L2luZGV4LnNjc3NcIiBhcyAqO2AsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBwb3J0OiA0MDAwLCAvLyBcdTdBRUZcdTUzRTNcdTUzRjdcclxuICAgIG9wZW46IGZhbHNlLCAvLyBcdTY2MkZcdTU0MjZcdTgxRUFcdTUyQThcdTVGMDBcdTU0MkZcdTZENEZcdTg5QzhcdTU2NjhcclxuICAgIHByb3h5OiB7XHJcbiAgICAgICcveGRhdGEtc3VjY2VlZC1taWxsJzoge1xyXG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MCcsXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBzb3VyY2VtYXA6IHRydWUsIC8vIFx1Nzg2RVx1NEZERCBzb3VyY2VtYXAgXHU1NDJGXHU3NTI4XHJcbiAgfVxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRRLFNBQVMsZUFBZSxXQUFXO0FBRy9TLE9BQU8sVUFBVTtBQUVqQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsMkJBQTJCO0FBRXBDLE9BQU8seUJBQXlCO0FBRWhDLE9BQU8sWUFBWTtBQUNuQjtBQUFBLEVBQ0U7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsT0FDSztBQUVQLE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8sV0FBVztBQUNsQixPQUFPLGFBQWE7QUExQmlKLElBQU0sMkNBQTJDO0FBNEJ0TixJQUFNLFVBQVUsS0FBSyxRQUFRLGNBQWMsSUFBSSxJQUFJLE1BQU0sd0NBQWUsQ0FBQyxHQUFHLEtBQUs7QUFHakYsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsWUFBWTtBQUFBLElBQ1osV0FBVztBQUFBO0FBQUE7QUFBQSxNQUdULFNBQVMsQ0FBQyxLQUFLO0FBQUE7QUFBQTtBQUFBLE1BSWYsV0FBVztBQUFBLFFBQ1Qsb0JBQW9CO0FBQUE7QUFBQTtBQUFBLFFBSXBCLGNBQWM7QUFBQSxVQUNaLFFBQVE7QUFBQSxRQUNWLENBQUM7QUFBQSxNQUNIO0FBQUEsTUFDQSxVQUFVO0FBQUEsUUFDUixTQUFTO0FBQUEsTUFDWDtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1QsV0FBVztBQUFBO0FBQUE7QUFBQSxRQUdULGNBQWM7QUFBQSxVQUNaLG9CQUFvQixDQUFDLElBQUk7QUFBQSxRQUMzQixDQUFDO0FBQUE7QUFBQTtBQUFBLFFBR0Qsb0JBQW9CO0FBQUEsVUFDbEIsYUFBYTtBQUFBLFFBQ2YsQ0FBQztBQUFBLE1BQ0g7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELE1BQU07QUFBQSxNQUNKLGFBQWE7QUFBQSxJQUNmLENBQUM7QUFBQSxJQUNELE9BQU87QUFBQSxNQUNMLFNBQVM7QUFBQSxRQUNQLFVBQVU7QUFBQSxRQUNWLGtCQUFrQjtBQUFBLFFBQ2xCLFlBQVk7QUFBQSxVQUNWLE9BQU87QUFBQSxVQUNQLE1BQU07QUFBQSxRQUNSLENBQUM7QUFBQSxNQUNIO0FBQUEsTUFDQSxjQUFjO0FBQUEsUUFDWixzQkFBc0I7QUFBQSxRQUN0Qix3QkFBd0I7QUFBQSxNQUMxQjtBQUFBLElBQ0YsQ0FBQztBQUFBO0FBQUEsSUFFRDtBQUFBO0FBQUEsSUFBd0M7QUFBQTtBQUFBLElBRXhDLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLE1BQ3BELE1BQU0sR0FBRyxPQUFPO0FBQUEsSUFDbEI7QUFBQSxFQUNGO0FBQUE7QUFBQSxFQUVBLEtBQUs7QUFBQSxJQUNILHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQSxRQUNKLGdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQTtBQUFBLElBQ04sTUFBTTtBQUFBO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCx1QkFBdUI7QUFBQSxRQUNyQixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsTUFDaEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsV0FBVztBQUFBO0FBQUEsRUFDYjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
