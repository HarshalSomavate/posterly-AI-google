"use client";
import React from "react";
import { FloatingDock } from "../components/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

export function FloatingDockDemo() {
    const links = [
      {
        title: "Home",
        icon: (
          <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "#",
      },
      {
        title: "Products",
        icon: (
          <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "#",
      },
      {
        title: "Components",
        icon: (
          <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "#",
      },
      {
        title: "Aceternity UI",
        icon: (
          // <Image
          //   src=""
          //   width={20}
          //   height={20}
          //   alt="Aceternity Logo"
          // />
          <FcGoogle className="h-full w-full text-neutral-500 dark:text-neutral-300"/>
        ),
        href: "#",
      },
      {
        title: "Changelog",
        icon: (
          <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "#",
      },
      {
        title: "Twitter",
        icon: (
          <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "#",
      },
      {
        title: "GitHub",
        icon: (
          <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "#",
      },
    ];
  
    return (
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-[5rem] w-full">
        <FloatingDock
          mobileClassName="translate-y-20" // only for demo, remove for production
          items={links}
        />
      </div>
    );
  }
  