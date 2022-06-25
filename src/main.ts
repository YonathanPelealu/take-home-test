import * as salesInput from "../input.json";
import * as productsData from "../product.json";
import { daily_revenue } from "./controller/dailyRevenue";
import { mentorRevenue } from "./controller/mentorRevenue";
import { counter } from "./helper/finder";
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
  /**
   * 2. Daily Payment for Mentors Summary
   * 1. Get the Price from products.price of each product_id
   * 2. Find mentor_name and product_id from, then grouped them by their name also of each product_id (on helper function)
   * {Fransiska PW (masterclass: 2, one_on_one_mentorship: 3, group_mentorship: 3)}
   * {Windy Natriavi (masterclass: 2, one_on_one_mentorship: 3, group_mentorship: 3)}
   * {Nadhira Aureliya (masterclass: 2, one_on_one_mentorship: 3, group_mentorship: 3)}
   * 3. due_amount of each mentor (basePrice) = price * 10% (either masrclass and mentorship)
   * 4. Validate if total_participants of total mentors_name on product_id >= 5, bonusPrice = basePrice += 2,5% * productRevenue (products earning) (masterclass exclude, mentorship only)
   * 5. due_payment = basePrice + bonusPrice
   * 6. Return the daily_payment for mentors that include mentors name and due_amount of them
   */
  const mentor_revenue = await mentorRevenue(products, sales);
  const counters = await counter(sales, products);
  return { daily_product_type_revenue, mentor_revenue, counters };
};

const debug = async () => {
  console.log(await mainFunction());
};
debug();
