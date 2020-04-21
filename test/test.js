import path from 'path'
import fs from 'fs'
import { transformFileSync } from '@babel/core'
import plugin from '../src'


const examplesPath = path.resolve(__dirname, 'examples')
const examples = fs.readdirSync(examplesPath)

examples.forEach((examplePath) => {
    const output = transformFileSync(`${examplesPath}/${examplePath}`, {
        plugins: [plugin],
        babelrc: false,
        retainLines: true,
    })

    /*
    const Home = require("@pages/Home/Home");

    const NotFound = require("@pages/NotFound/NotFound");
    */
    console.log(examplePath)
    console.log(output.code, '\n')
})
