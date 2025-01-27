"use server"
import sharp from "sharp"

export const img2ascii = async (src: string, rows: number, columns: number, scale: number) => {
  const wasmModule = await import('@/public/wasm/img2ascii.js');
  // console.log("wasmModule: ", wasmModule)
  const Module = await wasmModule.default({
    locateFile: (file:any) => {
      if (file.endsWith('.wasm')) {
        // Force it to look in /wasm/
        return `${process.cwd()}/public/wasm/${file}`;
      }
      return file;
    }});
  
  const resultPtr = await Module.ccall('img2ascii', 'number', ['string', 'number', 'number', 'number'], [src, rows, columns, scale]);

  const json = Module.UTF8ToString(resultPtr)

  Module.ccall("free", null, ["number"], resultPtr);

  return json
};
