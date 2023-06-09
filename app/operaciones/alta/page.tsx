import Footer from "@/components/Footer";
import Input from "@/components/Input";
import Subtitle from "@/components/Subtitle";
import { redirect } from "next/navigation";

async function Demo(data: FormData) {
  "use server"

  const first = data.get('first')?.valueOf()

  if(typeof first !== "string" || first.length === 0) {
    throw new Error("Invalid Fisrt")
  }

  console.log(JSON.stringify(first))
  redirect("/operaciones/alta")
}

export default function Page() {
  return (
    <>
      <form action={Demo} method="post">
        <label htmlFor="first">First name:</label>
        <input type="text" id="first" name="first" />
        <label htmlFor="last">Last name:</label>
        <input type="text" id="last" name="last" />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}
