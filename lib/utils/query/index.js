export function getPaging(query = {}) {
  const { skip, limit } = query
  return {
    skip: skip || 0,
    limit: limit || 20,
  }
}

export default {
  getPaging,
}
