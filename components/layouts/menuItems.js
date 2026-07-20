// components/layout/menuItems.js

import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Settings,
  Package,
  UserPlus,
  List,
  Plus,
  Vault,
  ChartBarStacked,
  Banknote,
} from "lucide-react";
import { FaChrome } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { MdFormatListBulletedAdd } from "react-icons/md";

export const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    activePath: ["/dashboard"],
  },
  {
    name: "Orders",
    icon: ShoppingCart,
    path: "/order",
    activePath: ["/order"],
  },

  {
    name: "Menu Management",
    icon: AiFillProduct,
    path: "#",
    activePath: ["/product-management/"],

    children: [
      {
        name: "Category",
        path: "/product-management/categories",
        icon: ChartBarStacked,
      },
      {
        name: "Menu Items",
        path: "/product-management/products",
        icon: MdFormatListBulletedAdd,
      },
    ],
  },

  {
    name: "Tables",
    icon: Vault,
    path: "/tables",
    activePath: ["/tables"],
  },
  {
    name: "Others Expense",
    icon: Banknote,
    path: "/expenses",
    activePath: ["/expenses"]
  },
   {
    name: "User Management",
    icon: Users,
    path: "#",
    activePath: ["/user-management/"],

    children: [
      {
        name: "Users",
        path: "/user-management/users",
        icon: UserPlus,
        activePath: ["/user-management/users/"],
      },
      {
        name: "Role & Permissions",
        path: "/user-management/roles",
        icon: FaChrome,
      },
    ],
  },
];
