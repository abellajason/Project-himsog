export function updateById(byId = {}, newObject = {}, key = '_id') {
  return {
    ...byId,
    [newObject[key]]: { ...(byId[newObject[key]] || {}), ...newObject },
  };
}
