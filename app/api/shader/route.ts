import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fsPromises  from 'fs/promises'

export const POST = async (req: NextRequest) => {
  // console.log('/api/shader')
  const {name} = await req.json()

  // console.log('name: ', name)
  const filePath = `${path.resolve('shaders',`${name}.glsl`)}`

  // try {
  const shader = await fsPromises.readFile(filePath, {encoding:'utf8', flag:'rs+'})
  // console.log('shader: ', shader)

  const response = NextResponse.json({shader})
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  return response
  // } catch (e) {
  //   console.log(e)
  //   return NextResponse.json({shader:'error'})
  // }
}

export const dynamic = 'force-dynamic'