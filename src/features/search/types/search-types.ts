export type TPriceFilterItem = {
  label: string;
  value: string;
};

export type TCategoryFilterItem = {
  id: number;
  name: string;
};

export type TSearchState = {
  query: string;
  filters: {
    fromDate: string;
    toDate: string;
    price: string;
    category: string[];
  };
};

export type TFilterType = "fromDate" | "toDate" | "price" | "category";

export type TEvent = {
  id: number;
  eventImageUrl: string;
  shortName: string;
  longName: string;
  startDate: string | null;
  endDate: string | null;
  location: string | null; // Ensure location has lat and lng
  description: string;
  eventCategories: string[] | null;
  eventTypes: string[];
};
