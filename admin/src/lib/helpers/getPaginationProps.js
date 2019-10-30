export function getPaginationProps(pageNum, $limit = 10, $sort = { _id: -1 }) {
  pageNum = parseInt(pageNum, 10);
  const $skip = pageNum ? (pageNum - 1) * $limit : 0;
  return { $skip, $limit, $sort };
}
