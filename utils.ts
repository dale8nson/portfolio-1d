import { Vector2, Vector3 } from 'three'
import { revalidateTag } from 'next/cache'

export const post: (url: string, body:object) => Promise<any> = async (url: string, body:object) => {

  

  const res = await fetch(url, {
    method:'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
    next: { tags: [`${JSON.stringify(body)}`] },
    cache:'no-store'
  },
  
)

  const json = await res.json()

  return json
}

export const vec3 = ([x, y, z]: [x: number, y: number, z: number]) => {
  return new Vector3(x, y, z)
}

export const vec2 = ([x, y]: [x: number, y: number]) => {
  return new Vector2(x, y)
}

export const create2DMeshData = (width: number, height: number, verticeX: number, verticeY: number) => {
  const totalVertexCount = verticeX * verticeY * 2
  const vertices = new Float32Array(totalVertexCount)
  const uvs = new Float32Array(totalVertexCount)
  const indices = new Uint16Array(6 * (verticeX) * (verticeY))

  // let indiceCounter = 0

  for (let i = 0; i < totalVertexCount; i += 2) {
    const index = i / 2
    const vx = width / (verticeX - 1) * (index % verticeX)
    const vy = height / (verticeY - 1) * Math.floor(index / verticeY)
    vertices[i] = vx
    vertices[i + 1] = vy

    const uvX = 1 / (verticeX - 1) * (index % verticeX)
    const uvY = 1 / (verticeY - 1) * Math.floor(index / verticeY)
    uvs[i] = uvX
    uvs[i + 1] = uvY

    const indiceCounter = index * 6

    if (uvX < 1 && uvY < 1) {
      indices[indiceCounter] = index
      indices[indiceCounter + 1] = index + verticeX
      indices[indiceCounter + 2] = index + verticeX + 1
      indices[indiceCounter + 3] = index
      indices[indiceCounter + 4] = index + 1
      indices[indiceCounter + 5] = index + verticeX + 1
    }
  }

  return [vertices, uvs, indices]

}