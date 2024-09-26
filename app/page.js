import Image from "next/image";
import { Button } from "../components/ui/button";
import Hero from "./_components/Hero";
import Categories from "./_components/categories";
import CategorySearch from "./_components/CategorySearch";
import "./page.css";

export default function Home() {
  return (
    <div>
      <Hero />
      <CategorySearch />
      <Categories />
    </div>
  );
}
