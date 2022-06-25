export enum ProductTypeEnum {
    Mentorship = 'mentorship',
    Masterclass = 'masterclass',
}

export enum ProductIdEnum {
    Masterclass = 'masterclass',
    OneOnOneMentorship = 'one_on_one_mentorship',
    GroupMentorship = "group_mentorship",
}

export interface ProductInterface {
    product_id : string;
    product_type : string;
    price : number;
}