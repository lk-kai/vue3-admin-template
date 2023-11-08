import SparkMD5 from 'spark-md5'

const CHUNK_SIZE = 5 * 1024 * 1025; // 切片大小
const THREAD_COUNT = navigator.hardwareConcurrency || 4;  // 定义一个线程数量
export const createChunk = (file, index, chunkSize) => {
  return new Promise(resolve => {
    const start = index * chunkSize;
    const end = start + chunkSize;
    const chunkFile = file.slice(start,end)
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();
    fileReader.onload = e => {
      spark.append(e.target.result);
      resolve({
        start,
        end,
        index,
        hash: spark.end(),
        chunkFile
      });
    };
    fileReader.readAsArrayBuffer(chunkFile);
  });
};

export const cutFile = async file => {
  return new Promise(resolve => {
    const result = [];
    const chunkCount = Math.ceil(file.size / CHUNK_SIZE);
    const workerChunkCount = Math.ceil(chunkCount / THREAD_COUNT);

    let finishCount = 0;
    for (let i = 0; i < THREAD_COUNT; i++) {
      const worker = new Worker(new URL('./worker.js', import.meta.url), {
        type: "module"
      });
      let startIndex = i * workerChunkCount;
      let endIndex = startIndex + workerChunkCount;
      if (endIndex > chunkCount) {
        endIndex = chunkCount;
      }
      worker.postMessage({
        file,
        CHUNK_SIZE,
        startIndex,
        endIndex
      });
      worker.onmessage = e => {
        for (let j = startIndex; j < endIndex; j++) {
          result[j] = e.data[j - startIndex];
        }
        worker.terminate();
        finishCount++;
        if (finishCount === THREAD_COUNT) {
          const md5 = calculateCombinedHash(result)
          resolve({
            md5,
            hashList: result,
            file,
            chunkCount
          });
        }
      };
    }
  });
};

// 合并多个哈希值并计算总体哈希值
export const calculateCombinedHash = hashArray =>{
  const combinedHashString = hashArray.join('-'); // 使用分隔符连接哈希值
  const spark = new SparkMD5();
  spark.append(combinedHashString);
  return spark.end();
}


/**
 * 并发请求
 * @param urls  请求地址
 * @param maxNum  最大请求数
 * @returns {Promise<unknown>}
 */
export const concurRequest = (urls=[], maxNum = 3) => {
  return new Promise(async resolve => {
    if (!urls.length) {
      resolve([])
    }
    let index = 0
    const result = []
    const request = async () => {
      const i = index
      const url = urls[index]
      index++
      try {
        // result[i] = await fetch(url)
        result[i] = await url.getInfo()
      } catch (e) {
        try {
          // result[i] = await requestAgain(url)
          result[i] = await requestAgain(url.getInfo)
        }catch (e) {
          result[i] = e
        }
        result[i] = e
      } finally {
        if (result.length === urls.length) {
          resolve(result)
        }
        if (isPause) {
          return
        }
        if (index < urls.length) {
          await request()
        }
      }
    }
    for (let i = 0; i < Math.min(urls.length, maxNum); i++) {
      request()
    }
  })
}

/**
 * 请求重试
 * @param url
 * @param max
 */
const requestAgain = (url, max = 3) => {
  // return fetch(url).catch(err => {
  //   max <= 0 ? Promise.reject(err) : requestAgain(url, max-1)
  // })
  return url().catch(err => {
    max <= 0 ? Promise.reject(err) : requestAgain(url, max-1)
  })
}
