import { SalesInputInterface } from "../models/input.model";
import { ProductInterface } from "../models/product.model";

export const mentorRevenue = async (
  products: ProductInterface[],
  sales: SalesInputInterface[]
) => {
  try {
    console.log("mentor revenue");
  } catch (e: any) {
    throw new Error(e);
  }
};
