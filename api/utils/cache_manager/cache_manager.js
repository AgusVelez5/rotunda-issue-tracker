const { promisify } = require('util')
const redis = require('redis')

class CacheManager {
  constructor(cache_endpoint_url) {
    this.client = redis.createClient(`//${ cache_endpoint_url }`)
    this.promisified_get = promisify(this.client.get).bind(this.client)
    this.promisified_set = promisify(this.client.set).bind(this.client)
    this.promisified_hgetall = promisify(this.client.hgetall).bind(this.client)
  }

  store(k, v, ...extra) {
    return this.promisified_set(k, JSON.stringify(v), ...extra)
  }

  async get(k) {
    let entry = await this.promisified_get(k)
    if (entry) {
      try {
        return JSON.parse(entry)
      }
      catch {
        return null
      }
    }
  }

  async get_or_store(key, expire_time, on_miss) {
    const cache_entry = await this.get(key)
    if (cache_entry)
      return cache_entry
    const data = await on_miss()
    if (data)
      this.store(key, data, 'EX', expire_time)
    return data
  }

  async get_full_hash(k) {
    let entry = await this.promisified_hgetall(k)
    if (entry) {
      try {
        for (const subkey in entry)
          entry[subkey] = JSON.parse(entry[subkey])
        return entry
      }
      catch {
        return null
      }
    }
  }
}

module.exports = CacheManager