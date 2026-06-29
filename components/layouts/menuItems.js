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
} from "lucide-react";
import { FaChrome } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { MdCategory } from "react-icons/md";

export const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    activePath: ["/dashboard"],
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

  {
    name: "Orders",
    icon: ShoppingCart,
    path: "/admin/orders",
    activePath: ["/admin/orders"],
  },

  {
    name: "Product Management",
    icon: AiFillProduct,
    path: "#",
    activePath: ["/product-management/"],

    children: [
      {
        name: "Categories",
        path: "/product-management/categories",
        icon: MdCategory,
      },
      {
        name: "Products",
        path: "/product-management/products",
        icon: MdFormatListBulletedAdd,
      },
      {
        name: "Stocks",
        path: "/product-management/stocks",
        icon: Plus,
      },
    ],
  },

  {
    name: "Settings",
    icon: Settings,
    path: "/admin/settings",
    activePath: ["/admin/settings"],
  },
  {
    name: "CMS",
    icon: Settings,
    path: "/content-management",
    activePath: ["/content-management/"]
  }
];
