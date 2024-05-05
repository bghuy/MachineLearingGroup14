import HomePage from "../components/HomePage/HomePage";
export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "*",
    page: HomePage,
  },
];
