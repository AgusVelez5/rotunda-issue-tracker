class DevCacheManager {
  constructor() {
    this.cache = {}
  }

  store(k, v, ...extra) {
    console.log(`[DevCache] Storing in ${ k }${ extra.length ? ` with ${ extra.join(', ') }` : ''}`)
    this.cache[k] = v
  }

  get(k) {
    console.log(`[DevCache] Fetching ${ k }`)
    if (this.cache[k])
      console.log(`[DevCache] Returning ${ k }`)
    return this.cache[k]
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
    console.log(`[DevCache] Fetching full hash ${ k }`)
    if (this.cache[k])
      console.log(`[DevCache] Returning full hash ${ k }`)
    return this.cache[k]
  }
}

module.exports = DevCacheManager