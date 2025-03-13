"use client";
import Link from "next/link";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function NavbarItemContent({ title, param }) {
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre");

  return (
    <Link
      href={`/?genre=${param}`}
      className={`hover:text-amber-600 ${
        genre === param
          ? "underline underline-offset-8 decoration-4 decoration-amber-500 rounded-lg"
          : ""
      }`}
    >
      {title}
    </Link>
  );
}

export default function Navbaritem({ title, param }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavbarItemContent title={title} param={param} />
    </Suspense>
  );
}
