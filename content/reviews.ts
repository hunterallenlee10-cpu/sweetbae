/** Reviews, word for word from the live site. `recommends` items link to a dish sheet when they exist on the current menu. */
export type Review = {
  id: string;
  title: string;
  body: string;
  author: string;
  recommends?: { label: string; dishId?: string }[];
};

export const reviewsTitle = "Rave Reviews";

export const reviews: Review[] = [
  {
    id: "jay",
    title: "Overall great experience. The food was amazing.",
    body: "I don't think you can miss coming here for a drink, some food, or both. Definitely will be coming back to enjoy a WinesDay.",
    author: "Jay",
    recommends: [{ label: "Pan Roasted Duck Breast", dishId: "pan-roasted-duck-breast" }],
  },
  {
    id: "fr",
    title: "Fantastic late Sunday afternoon dinner with my wife.",
    body: "Very popular with the mature young crowd. Outdoor seating looks great for summer sundown dining. Gents, it's a great date night place. Splurge a little!",
    author: "FR",
  },
  {
    id: "caleb",
    title: "Great food and service!",
    body: "Our waiter was very friendly and helpful since it was our first time. The food and drinks were excellent. We got the seafood linguine and salmon on rice. Both were great! Espresso martini was also very good.",
    author: "Caleb",
    // Neither is on the current menu, so they render as plain text.
    recommends: [{ label: "Creme Brulé" }, { label: "Seafood Linguine" }],
  },
  {
    id: "thomas",
    title: "I've been here twice, loved everything...",
    body: "The bar service is as fantastic as the food. I've tried the chef's paella, seafood pappardelle, stuffed mushrooms, and the grilled cheese with tomato soup. Recommend them all.",
    author: "Thomas",
  },
  {
    id: "katie",
    title: "I don’t know how this place could ever get anything below a 5 star rating!",
    body: "The food was perfect and so much better than anything in the area! The service is first class!",
    author: "Katie",
  },
  {
    id: "kali",
    title: "I love this place!",
    body: "I came here for my mom’s 60th birthday. It was 12 of us so we reserved the private dinning area in the wine tasting room. We had an amazing server who recommended the best drinks and food!",
    author: "Kali",
  },
];
