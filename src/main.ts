import * as salesInput from "../input.json";
import * as productsData from "../product.json";
import { daily_revenue } from "./controller/dailyRevenue";
import { mentorRevenue } from "./controller/mentorRevenue";
import { SalesInputInterface } from "./models/input.model";
// import { OutputModel } from "./models/output.model";
import { ProductInterface } from "./models/product.model";

const mainFunction: any = async () => {
  const products: ProductInterface[] = productsData.products;
  const sales: SalesInputInterface[] = salesInput.sales;

  //good luck! :)
  //please return results from this mainFunction.
  /**
   * A. Daily Revenue Product Type:
   * pseudocode:
   * 1. find(product_type by product_id) then grouping by type(for get the price)
   * 2. calculate daily_revenue should be by product_id(masterclass, one-one mentorship, group-mentorship), which each of product_id had price
   * 3. calculate revenue masterclass = price
   * 4. calculate revenue mentorship = revenue one-on-one (price * session_quantity) + revenue group (price * participants * session_quantity)
   */

  const daily_product_type_revenue = await daily_revenue(products, sales);
  const mentor_revenue = await mentorRevenue(products, sales);
  return { daily_product_type_revenue, mentor_revenue };
};

const debug = async () => {
  console.log(await mainFunction());
};
debug();
