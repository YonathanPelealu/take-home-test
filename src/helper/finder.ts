import { SalesInputInterface } from "../models/input.model";
import { ProductIdEnum } from "../models/product.model";

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

let data: any[] = [];
let obj: any = {};
export const counter = async (
  sales: SalesInputInterface[],
  products: any[]
) => {
  const mentor_name: any = [];

  for (let i = 0; i < sales.length; i++) {
    if (mentor_name.indexOf(sales[i].mentor_name) == -1) {
      mentor_name.push(sales[i].mentor_name);
    }
  }
  console.log("mentor name line 39", mentor_name);

  let masterclassCounter = {
    counter: 0,
    price: 0,
  };
  let oneOnOneCounter: any = {
    counter: 0,
    due_payment: 0,
  };
  let groupMentorship: any = {
    counter: 0,
    due_payment: 0,
  };

  mentor_name.map(async (name: string) => {
    console.log(name);

    for (let i = 0; i < sales.length; i++) {
      if (
        sales[i].mentor_name === name &&
        sales[i].product_id === ProductIdEnum.Masterclass
      ) {
        const { price } = await finder(
          FinderInterface.product,
          products,
          sales[i].product_id
        );
        masterclassCounter.counter++;
        masterclassCounter.price = price;
        console.log(masterclassCounter, "Test counter masterclass");
      } else if (
        sales[i].mentor_name === name &&
        sales[i].product_id === ProductIdEnum.OneOnOneMentorship
      ) {
        const { session_quantity, price } = await finder(
          FinderInterface.product,
          products,
          sales[i].product_id
        );
        console.log(oneOnOneCounter, "Test One On One Counter");
        oneOnOneCounter.session_quantity = session_quantity;
        oneOnOneCounter.price = price;
      } else if (
        sales[i].mentor_name === name &&
        sales[i].product_id === ProductIdEnum.GroupMentorship
      ) {
        const { participants, session_quantity, price } = await finder(
          FinderInterface.product,
          products,
          sales[i].product_id
        );
        groupMentorship.participant = participants;
        groupMentorship.price = price;
        groupMentorship.session_quantity = session_quantity;
        console.log(groupMentorship, "Test GroupMentorship");
      }
      obj = {
        mentor_name: name,
        masterclassCounter,
        oneOnOneCounter,
        groupMentorship,
      };
    }
    data.push(obj);
    masterclassCounter.counter = 0;
    oneOnOneCounter = {
      due_payment: 0,
    };
    groupMentorship = {
      due_payment: 0,
    };
  });
  return data;
};

/**
 * count participants in mentorship product
 * after grouping by name, count total product_id * price * 10%
 * total product_id >= 5 === price * 12,5%
 */
