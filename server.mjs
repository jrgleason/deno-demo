import {serve} from "https://deno.land/std@0.69.0/http/server.ts";
import {serveFile} from "https://deno.land/std@0.58.0/http/file_server.ts";

const fileExists = async (path) => {
    try {
        const stats = await Deno.lstat(path);
        return stats && stats.isFile;
    } catch (e) {
        if (e && e instanceof Deno.errors.NotFound) {
            return false;
        } else {
            throw e;
        }
    }
}
// build().then(async (result)=>{
// Start Server
const s = serve({port: 8000});
console.log("http://localhost:8000/");
console.log("Build worked");
for await (const req of s) {
    const path = `${Deno.cwd()}/${req.url}`;
    // TODO: Should probably be whitelist
    if (await fileExists(path)) {
        const content = await serveFile(req, path);
        req.respond(content);
        continue;
    }
    if (req.url === '/') {
        const content = await serveFile(req, `${Deno.cwd()}/index.html`);
        req.respond(content);
    } else {
        req.respond({status: 404})
    }
}
// })

