"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const salesInput = __importStar(require("../input.json"));
const productsData = __importStar(require("../product.json"));
const product_model_1 = require("./models/product.model");
const mainFunction = async () => {
    const products = productsData.products;
    const sales = salesInput.sales;
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
    const getProductType = async (product_id) => {
        return products.find((product) => product.product_id === product_id);
    };
    let masterRev = 0;
    let mentorRev = 0;
    for (let i = 0; i < sales.length; i++) {
        const { price } = await getProductType(sales[i].product_id);
        let session_quantity = sales[i].session_quantity
            ? sales[i].session_quantity
            : 0;
        let participants = sales[i].participants ? sales[i].participants : 0;
        if (product_model_1.ProductIdEnum.Masterclass === sales[i].product_id) {
            masterRev += price;
        }
        if (product_model_1.ProductIdEnum.OneOnOneMentorship === sales[i].product_id) {
            mentorRev += price * session_quantity;
        }
        if (product_model_1.ProductIdEnum.GroupMentorship === sales[i].product_id) {
            mentorRev += price * participants * session_quantity;
        }
    }
    const masterclass = {
        product_type: "masterclass",
        revenue: masterRev,
    };
    const mentorship = {
        product_type: "mentorship",
        revenue: mentorRev,
    };
    const daily_product_type_revenue = [];
    daily_product_type_revenue.push(masterclass, mentorship);
    return { daily_product_type_revenue };
};
const debug = async () => {
    console.log(await mainFunction());
};
debug();
//# sourceMappingURL=main.js.map