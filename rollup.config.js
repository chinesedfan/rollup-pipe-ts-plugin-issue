const path = require('path');

// const t = require('rollup-plugin-typescript'); // can't emit type errors
const t2 = require('rollup-plugin-typescript2');
const tsc = require('rollup-plugin-tsc');

const xx2ts = {
    name: 'xx2ts-plugin',
    resolveId(importee, importer) {
        // if commented the next holder-trick, some errors will occur
        if (/\.xx$/.test(importee)) return path.resolve(__dirname, 'holder.ts');

        return null;
    },
    transform() {
        // for testing, here always outputs same typescript
        return `
import { SampleInterface } from './def';

const foo: SampleInterface = {
    // if changed to other types, i.e. number,
    // the next plugin will throw an error
    s: 'hello'
};
console.log(foo);
`;
    }
};

module.exports = {
    input: './entry.xx',
    output: {
        file: './entry.out',
        format: 'iife'
    },
    plugins: [
        xx2ts,
        t2({
            // should add *.xx into the language service
            include: ['*.ts', '*.xx']
        })
        // tsc({
        //     // should add *.xx into the language service
        //     include: ['*.ts', '*.xx']
        // })
    ]
};
