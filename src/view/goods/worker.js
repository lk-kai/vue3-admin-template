import { createChunk } from './utils'

onmessage = async (event) => {
  const proms= [ ]
  const { file, CHUNK_SIZE, startIndex, endIndex } = event.data
  for (let i = startIndex; i < endIndex; i++) {
    proms.push(createChunk(file, i, CHUNK_SIZE))
  }
  const chunks = await Promise.all(proms)
  postMessage(chunks)
}
