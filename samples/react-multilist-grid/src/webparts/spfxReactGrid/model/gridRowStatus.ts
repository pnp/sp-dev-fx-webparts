/** if status is null row is fresh from server */
enum GridRowStatus{
  new,
  pristine,
  modified,
  toBeDeleted

}
/**Status of row  */
export default GridRowStatus;