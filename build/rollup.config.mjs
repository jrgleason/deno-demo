import nodeResolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import html from "rollup-plugin-html";
import commonjs from '@rollup/plugin-commonjs';
export default {
    input: "./ui/index.mjs",
    output: [
        {
            file: "./target/ng-demo.esm.mjs",
            format: "esm",
            sourcemap: "inline"
        },
        {
            file: "./target/ng-demo.min.esm.mjs",
            format: "esm",
            sourcemap: false,
            plugins:[
                terser()
            ]
        }
    ],
    plugins: [
        html({
            include:"ui/**/*.html"
        }),
        commonjs(),
        nodeResolve(),

    ]
}