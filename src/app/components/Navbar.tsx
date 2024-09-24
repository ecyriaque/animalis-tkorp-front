"use client";

import React from "react";
import { Menubar } from "primereact/menubar";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const router = useRouter();

  const items = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      command: () => {
        router.push("/");
      },
    },
    {
      label: "Owner",
      icon: "pi pi-fw pi-users",
      command: () => {
        router.push("/person");
      },
    },
  ];

  return (
    <div>
      <Menubar model={items} />
    </div>
  );
};

export default Navbar;
