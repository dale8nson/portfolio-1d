import { NextRequest, NextResponse } from "next/server"
import sharp from "sharp"
// import wasm from "img2ascii.wasm"
// import img2ascii from "@/public/wasm/img2ascii";

export const POST = async (req: NextRequest) => {

  // const importObject = {}

  // const results = await WebAssembly.instantiateStreaming(fetch("/wasm/img2ascii.wasm"), importObject)

  // console.log("results.instance:\n", results.instance)

  // const result = init().then((result: any) => console.log("result:\n", result))
  // img2ascii().then(result => console.log("result:\n", result))
  
 


  
  const { src, rows = 1, columns = 1, scale = 0.03125 } = await req.json()

  const gscale = ["0", "1"]
    let img = sharp(process.cwd() + "/public/" + src).removeAlpha()
    const meta = await img.metadata()
    const { width, height } = meta
  
    if (!width || !height) return
  
    const [scaledWidth, scaledHeight] = [Math.floor(width * scale), Math.floor(height * scale)]
  
    img = img.resize({ width: scaledWidth, height: scaledHeight, fit: "contain" })
  
    const imgData = await img.raw().toBuffer()
  
    const ascii = []

    const rowHeight =  Math.floor(scaledHeight / rows)
    const columnWidth =  Math.floor(scaledWidth / columns)
  
    for (let j = 0; j < scaledHeight * 3; j += 3 * rowHeight) {
      for (let k = 0; k < scaledWidth * 3; k += 3 * columnWidth) {
  
        let r = Math.floor(imgData[j * scaledWidth + k])
        let g = Math.floor(imgData[j * scaledWidth + k + 1])
        let b = Math.floor(imgData[j * scaledWidth + k + 2])
  
        ascii.push(<span className={`text-[rgb(${r},${g},${b})]`}>{gscale[Math.floor((r + g + b) / 3 / 255 * gscale.length)]}</span>)
      }
  
      ascii.push(<br />)
    }

    return NextResponse.json({ascii})
}