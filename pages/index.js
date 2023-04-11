import { Button } from "react-bootstrap";
import Card from "../components/card";
import Link from "next/link";
import styles from "../styles/home.module.css";

export default function Home() {
  return (

    <div className="m-2">
      Home 
      <Link href="/about">About</Link>
      <Button>Click me</Button>

      <Card />
    </div>
  )
}
