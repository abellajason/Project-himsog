export function getPageNumber(props = {}) {
  let { match: { params: { pageNum = 1} } } = props;

  if (isNaN(pageNum) || pageNum < 1) {
    pageNum = 1;
  }

  return pageNum;
}
