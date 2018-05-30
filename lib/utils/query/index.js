export function getPaging(query = {}) {
  let { skip, limit } = query
  if (typeof skip === 'undefined') {
    skip = 0
  }
  if (typeof limit === 'undefined') {
    limit = 20
  }
  return { skip, limit }
}

export default {
  getPaging,
}
