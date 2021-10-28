
export default interface IGraphService {
  getTransitiveMemberOf(): Promise<Array<string>>;
}
