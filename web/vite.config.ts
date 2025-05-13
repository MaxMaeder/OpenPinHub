import { defineConfig, PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import mdx from "@mdx-js/rollup";
import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Heading } from "mdast";

const demoteHeadings: Plugin = () => {
  return (tree) => {
    visit(tree, "heading", (node: Heading) => {
      if (node.depth < 6) {
        node.depth += 1;
      }
    });
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "electron" ? "./" : "/",

  plugins: [
    {
      enforce: "pre",
      ...mdx({
        remarkPlugins: [demoteHeadings],
      }),
    } as PluginOption,
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
}));

// export default defineConfig(({ mode }) => ({
//   plugins: [react()],

//   // 👇 absolute for web, relative (“./”) for Electron
//   base: mode === 'electron' ? './' : '/',

//   build: {
//     outDir: 'dist',          // keep same folder
//     assetsDir: 'assets'
//   }
// }));
