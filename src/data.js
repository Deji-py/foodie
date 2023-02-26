import food from "./Assets/Images/food.png";
import snacks from "./Assets/Images/snacks.png";
import drinks from "./Assets/Images/drinks.png";
import food2 from "./Assets/Images/food.jpg";

const data = [
  {
    id: 0,
    category: "food",
    image: food,
    list: [
      {
        id: 0,
        name: "Eba",
        rating: 2,
        description: "pepered burger with salmon fish and potash grease",
        price: "$200",
        unit: 1,
        image:
          "https://img.freepik.com/free-photo/crispy-fried-chicken-plate-with-salad-carrot_1150-20212.jpg?w=826&t=st=1677311781~exp=1677312381~hmac=8176ce46d17c4ae202794199848cffeaa37ea2951919af7a8eb676643f4b727a",
      },
      {
        id: 1,
        name: "Chips",
        rating: 4,
        description: "pepered burger with salmon fish and potash grease",
        price: "$200",
        image:
          "https://img.freepik.com/free-photo/delicious-food-white-plate_144627-34705.jpg?w=826&t=st=1677311858~exp=1677312458~hmac=a04f0fd58effa56fddcd1ac33e1635b8db69f2b0d26950ffac0f33b284c9f8f7",
      },
      {
        id: 2,
        name: "Burger",
        rating: 5,
        description: "pepered burger with salmon fish and potash grease",
        price: "$200",
        image:
          "https://img.freepik.com/free-photo/beyti-kebab-wraps-tomato-sauce-with-grilled-peppers-close-up_140725-10441.jpg?w=826&t=st=1677311939~exp=1677312539~hmac=33a5782fca81416687d15d2c9bec133d835661717172087f72a1b75b2c9176a9",
      },
      {
        id: 3,
        name: "Burger and Chips",
        rating: 4,
        description: "pepered burger with salmon fish and potash grease",
        price: "$200",
        image:
          "https://img.freepik.com/free-photo/high-angle-table-full-delicious-food-arrangement_23-2149141347.jpg?w=826&t=st=1677311963~exp=1677312563~hmac=dc60ed974efb640f7b4fc3be90e41f0e3ad4b0b69931b7d6ac43a5a0ef6aeea9",
      },
    ],
  },
  {
    id: 1,
    category: "drinks",
    image: drinks,
    list: [
      {
        id: 0,
        name: "Burger and Chips",
        rating: 2,
        description: "pepered burger with salmon fish and potash grease",
        price: "$200",
        image:
          "https://img.freepik.com/free-psd/orange-juice-food-menu-social-media-template_17005-1608.jpg?w=740&t=st=1677312002~exp=1677312602~hmac=f90c59c4ed0e3e4602da2f97ffaa4e93b70b20fd460f8fcd1c558426ff16d96b",
      },
      {
        id: 1,
        name: "Burger and Chips",
        rating: 3,
        description: "pepered burger with salmon fish and potash grease",
        price: "$200",
        image:
          "https://img.freepik.com/free-photo/top-view-fresh-delicious-fruit-juices-served-with-apple-feijoas-oranges-wooden-cutting-board_140725-94735.jpg?w=826&t=st=1677312030~exp=1677312630~hmac=25ad01cf2ccf975e1f6d43e2d0faa2e98a4ec86d486092bdba089900e966d241",
      },
      {
        id: 2,
        name: "Burger and Chips",
        rating: 4,
        description: "pepered burger with salmon fish and potash grease",
        price: "$200",
        image:
          "https://img.freepik.com/free-psd/organic-juice-banner-template_23-2148911055.jpg?w=996&t=st=1677312084~exp=1677312684~hmac=d9f633d9d1cec833e54b1f5e00027fcd1012fb5301ea868e1116659ab6896bdf",
      },
    ],
  },
  {
    id: 2,
    category: "snacks",
    image: snacks,
    list: [
      {
        id: 0,
        name: "Burger and Chips",
        rating: 1,
        description: "pepered burger with salmon fish and potash grease",
        price: "$200",
        image: food2,
      },
      {
        id: 1,
        name: "Burger and Chips",
        rating: 4,
        description: "pepered burger with salmon fish and potash grease",
        price: "$200",
        image: food2,
      },
      {
        id: 2,
        name: "Burger and Chips",
        rating: 3,
        description: "pepered burger with salmon fish and potash grease",
        price: "$200",
        image: food2,
      },
      {
        id: 4,
        name: "Burger and Chips",
        rating: 2,
        description: "pepered burger with salmon fish and potash grease",
        price: "$200",
        image: food2,
      },
      {
        id: 5,
        name: "Burger and Chips",
        rating: 4,
        description: "pepered burger with salmon fish and potash grease",
        price: "$200",
        image: food2,
      },
    ],
  },
];
export default data;
