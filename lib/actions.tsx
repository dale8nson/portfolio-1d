"use server"
import sharp from "sharp"

// export const img2ascii = async ({ src, rows = 1, columns = 1, scale = 0.03125 }: { src: string, rows?: number, columns?: number, scale?: number }) => {

//   const gscale = ["0", "1"]
//   let img = sharp(process.cwd() + "/public/" + src).removeAlpha()
//   const meta = await img.metadata()
//   const { width, height } = meta

//   if (!width || !height) return

//   const [scaledWidth, scaledHeight] = [Math.floor(width * scale), Math.floor(height * scale)]

//   img = img.resize({ width: scaledWidth, height: scaledHeight, fit: "contain" })

//   const imgData = await img.raw().toBuffer()

//   const ascii = []

//   for (let j = 0; j < Math.floor(scaledHeight / rows) * 3; j += 3) {
//     const row = []
//     for (let k = 0; k < Math.floor(scaledWidth / columns) * 3; k += 3) {

//       let r = Math.floor(imgData[j * scaledWidth + k])
//       let g = Math.floor(imgData[j * scaledWidth + k + 1])
//       let b = Math.floor(imgData[j * scaledWidth + k + 2])

//       row.push(<span className='text-[rgb(${r},${g},${b})]'>{gscale[Math.floor((r + g + b) / 3 / 255 * gscale.length)]}</span>)
//     }

//     row.push(<br />)
//     ascii.push(row)
//   }

//   return ascii
// }

// export const loadImg2Ascii = async () => {
//   const results = await WebAssembly.instantiateStreaming(fetch("img2ascii/img2ascii.wasm"))
  
//   console.log("results.instance")

//   return results.instance
// }



export const img2ascii = async (src: string, rows: number, columns: number, scale: number) => {
  const wasmModule = await import('@/public/wasm/img2ascii.js');
  console.log("wasmModule: ", wasmModule)
  const Module = await wasmModule.default({
    locateFile: (file:any) => {
      if (file.endsWith('.wasm')) {
        // Force it to look in /wasm/
        return `${process.cwd()}/public/wasm/${file}`;
      }
      return file;
    }});
  console.log("Module:\n", Module)

  console.log("process.cwd(): ", process.cwd())
  
  let resultPtr = await Module.ccall('img2ascii', 'number', ['string', 'number', 'number', 'number'], [src, rows, columns, scale]);

  // let resultPtr = img2ascii("@/public/ProfilePicture.jpg", rows, columns, scale);
  console.log('Result pointer:', resultPtr);
  const json = Module.UTF8ToString(resultPtr)
  // console.log("json string: ", json)
  console.log("json: ", JSON.parse(json))
  Module.ccall("free", null, ["number"], resultPtr);

  return json
};
