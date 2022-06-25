import { finder, FinderInterface } from "../helper/finder";
import { SalesInputInterface } from "../models/input.model";
import { DailyProductTypeRevenueInterface } from "../models/output.model";
import {
  ProductIdEnum,
  ProductInterface,
  ProductTypeEnum,
} from "../models/product.model";

export const daily_revenue = async (
  products: ProductInterface[],
  sales: SalesInputInterface[]
) => {
  const masterclass: DailyProductTypeRevenueInterface = {
    product_type: ProductTypeEnum.Masterclass,
    revenue: 0,
  };

  let mentorRev = 0;
  for (let i = 0; i < sales.length; i++) {
    const { price } = await finder(
      FinderInterface.product,
      products,
      sales[i].product_id
    );

    let session_quantity: any = sales[i].session_quantity
      ? sales[i].session_quantity
      : 0;

    let participants: any = sales[i].participants ? sales[i].participants : 0;

    if (ProductIdEnum.Masterclass === sales[i].product_id) {
      masterclass.revenue += price;
    }
    if (ProductIdEnum.OneOnOneMentorship === sales[i].product_id) {
      mentorRev += price * session_quantity;
    }
    if (ProductIdEnum.GroupMentorship === sales[i].product_id) {
      mentorRev += price * participants * session_quantity;
    }
  }
  const mentorship: DailyProductTypeRevenueInterface = {
    product_type: ProductTypeEnum.Mentorship,
    revenue: mentorRev,
  };
  const daily_product_type_revenue = [];
  daily_product_type_revenue.push(masterclass, mentorship);
  return daily_product_type_revenue;
};
