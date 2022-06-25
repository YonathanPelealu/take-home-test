
export interface OutputModel {
    daily_product_type_revenue : DailyProductTypeRevenueInterface[],
    mentor_payment : MentorPaymentInterface[],
    mentor_top_percentile : MentorTopPercentileInterface,
    customer_top_percentile : CustomerTopPercentileInterface,
}

export interface DailyProductTypeRevenueInterface {
    product_type : string;
    revenue? : number;
}

export interface MentorPaymentInterface {
    mentor_name : string;
    due_payment : number;
}

export interface MentorTopPercentileInterface {
    ninetieth_percentile : MentorPercentile[],
    fiftieth_percentile : MentorPercentile[]
}

export interface CustomerTopPercentileInterface {
    ninetieth_percentile : CustomerPercentile[],
    fiftieth_percentile : CustomerPercentile[]
}

export interface MentorPercentile {
    mentor_name : string,
    revenue : number,
}
export interface CustomerPercentile {
    customer_name : string,
    revenue : number,
}