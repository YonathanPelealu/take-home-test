export enum FinderInterface {
  product = "product_type",
  mentor_name = "mentor_name",
}
export const finder = async (
  type: FinderInterface,
  data: any[],
  key: string
) => {
  switch (type) {
    case FinderInterface.product:
      return data.find((product: any) => product.product_id === key);
    case FinderInterface.mentor_name:
      return data.find((mentor: any) => mentor.mentor_name === key);
    default:
      return data;
  }
};
