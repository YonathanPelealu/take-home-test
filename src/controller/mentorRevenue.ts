import { finder, FinderInterface } from "../helper/finder";
import { SalesInputInterface } from "../models/input.model";
import { ProductInterface } from "../models/product.model";

export const mentorRevenue = async (
  products: ProductInterface[],
  sales: SalesInputInterface[]
) => {
  try {
    for (let i = 0; i < sales.length; i++) {
      const { mentor_name, product_id } = await finder(
        FinderInterface.mentor_name,
        sales,
        sales[i].mentor_name
      );
      const product = await finder(
        FinderInterface.product,
        products,
        sales[i].product_id
      );
      console.log("line 21 mentor revenue", mentor_name, product_id, product);
    }
    console.log("mentor revenue");

    /**
     * Find mentor_name and product_id from, then grouped them by their name also of each product_id (on helper function)    /**
     * expected return :
     *      {
     *  [
     * Dini : [
     *  {
     *      product_id : masterclass
     *      count : 2
     *  },
     * {
     *      product_id : one_on_one_mentorship
     *      count : 1
     * }
     * ],
     *  joko : [
     *  {
     *      product_id : 0
     *      count : 0
     *  }
     * ]
     * ]
     * }
     * calculate count from product_id :
     * - counting the masterclass as per mentor_name
     * - counting one_on_one_mentorship as per mentor_name = session_quantity
     * - counting group_mentorship as per mentor_name = participants * session_quantity
     */
  } catch (e: any) {
    throw new Error(e);
  }
};
