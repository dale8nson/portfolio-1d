#!/usr/bin/env node
import fs from "node:fs/promises"
import Sharp from "sharp"

const [, , filename] = process.argv
// const componentName = filename.match(/(?<=\/)\w+?(?=\..{3})$/)
const componentName = "ProfilePicture"

// const gscale = ["$", "@", "B", "%", "8", "&", "W", "M", "#", "*", "o", "a", "h", "k", "b", "d", "p", "q", "w", "m", "Z", "O", "0", "Q", "L", "C", "J", "U", "Y", "X", "z", "c", "v", "u", "n", "x", "r", "j", "f", "t", "/", "|", "(", ")", "1", "&#123;", "&#125;", "[", "]", "?", "-", "_", "+", "~", "&lt;", "&gt;", "i", "!", "l", "I", ";", ":", ",", "\\", '\"', "^", "\`", "\'", "."]

const gscale = ["0", "1"]

// const gscale = ["◼︎","▪︎","◻︎"]


// const gscale = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]

const [scaleX, scaleY] = [0.03125, 0.03125]

export const img2Ascii = async (filename) => {
  let img = await new Sharp(filename).removeAlpha()
  const meta = await img.metadata()
  const { width, height } = meta
  const [scaledWidth, scaledHeight] = [Math.floor(width * scaleX), Math.floor(height * scaleY)]
  console.log(`scaledWidth: ${scaledWidth}\tscaledHeight: ${scaledHeight}`)
  img = await img.resize({ width: scaledWidth, height: scaledHeight, fit: "contain" })


  // console.log(`width: ${width}\theight: ${height}`)
  let imgData = await img.raw().toBuffer()
  console.log(`imgData.length: ${imgData.length}`)
  const ascii = []
  for (let j = 0; j < scaledHeight * 3; j += 3) {
    const row = []
    for (let k = 0; k < scaledWidth * 3; k += 3) {
        
      let r = Math.floor(imgData[j * scaledWidth + k])
      let g = Math.floor(imgData[j * scaledWidth + k + 1])
      let b = Math.floor(imgData[j * scaledWidth + k + 2])

      // if (k === 0) console.log(`r:${r}\tg:${g}\tb:${b}`)

      row.push(`<span className='text-[rgb(${r},${g},${b})]'>${gscale[Math.floor((r + g + b) / 3 / 255 * gscale.length)]}</span>`)

    }
    row.push("<br/>")
    
    // row.push("\n")
    ascii.push(row.join(""))
  }

  const component = await fs.open(`/Users/dale8nson/dev/portfolio-1d/components/${componentName}.tsx`, "w")
  await component.writeFile(`export const ${componentName} = async ({ rows=1, columns=1, className }:{rows?: number, columns?: number className?: string }) => {
  return (
    <div className={\`w-full h-full m-auto flex flex-col justify-center items-center overflow-clip bg-[#000000] $\{ className }\`}>
      <p className="text-nowrap text-[0.75rem] tracking-[0.55rem] leading-[0.76rem)] font-[fira-code]">${ascii.join("\n")}</p>
    </div>
  ) 
}`)
  await component.close()
}

await img2Ascii(filename)