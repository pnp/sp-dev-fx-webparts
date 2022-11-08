import fs from "fs";
import path from "path";

declare const __dirname: string;

declare global {
    namespace NodeJS {
        interface Global {
            define: any;
        }
    }
}

module.exports = async () => {
    const mockModulesPath = "mock_loc_modules";
    const config = JSON.parse(fs.readFileSync("./config/config.json").toString());

    const packageJson = (stringModule: string) =>
        `{"name":"${stringModule}","main":"index.js"}`;

    const rel = (pathString: string) => path.join(__dirname, ...pathString.split("/"));

    if (!fs.existsSync(rel(`${mockModulesPath}`))) {
        fs.mkdirSync(rel(`${mockModulesPath}`));
    }

    Object.keys(config.localizedResources).forEach((stringModule: string) => {
        if (!fs.existsSync(rel(`${mockModulesPath}/${stringModule}`))) {
            fs.mkdirSync(rel(`${mockModulesPath}/${stringModule}`));
        }

        // try to get strings - check various combinations until the file is found
        let stringsPath = config.localizedResources[stringModule].replace(
            "{locale}",
            "en-us"
        );

        if (!fs.existsSync(rel(stringsPath)))
            stringsPath = stringsPath.replace("lib", "src");

        if (!fs.existsSync(rel(stringsPath)))
            stringsPath = stringsPath.replace("en-us", "en_us");

        if (!fs.existsSync(rel(stringsPath)))
            stringsPath = stringsPath.replace("src", "lib");

        // set requirejs define function
        global.define = (name: string, ready: Function): void => {
            fs.writeFileSync(
                rel(`${mockModulesPath}/${stringModule}/index.js`),
                "module.exports = " + JSON.stringify(ready(), null, 2)
            );
        };
        require(rel(stringsPath).replace(/\.js$/, ""));

        fs.writeFileSync(
            rel(`${mockModulesPath}/${stringModule}/package.json`),
            packageJson(stringModule)
        );
    });
};