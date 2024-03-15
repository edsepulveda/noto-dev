interface PriceProps {
  planName: string;
  price: string;
  description: string;
  highlightFeature: string;
  features: string[];
}

//Just for now, later we create plans with mercado pago and bound it to a subscription
export const PRICING: PriceProps[] = [
  {
    planName: "Free tier",
    price: "0",
    description: "An very enthutiast tier",
    highlightFeature: "",
    features: [
      "Unlimited banner photos",
      "5 Organizations",
      "Your history saved for 15 days",
      "Invite 1 guest",
    ],
  },
  {
    planName: "Pro tier",
    price: "9.99",
    description: "Great for growing teams that need more resources",
    highlightFeature: "+ Everything that free tier provide",
    features: [
      "Unlimited banner photos",
      "Unlimited Organizations",
      "1 year history save",
      "Invite 4 guest",
    ],
  },
];

export const PRICE_PLANS = { proPlan: "Pro tier", freePlan: "Free tier" };

export const MAX_FOLDERS = 3;
