// import AccountInf from "@/app/components/AccountInf";
import { Suspense } from "react";
import BookingDetailsPage from "../components/BookingDetailsComponent";

export default function AccountPage() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <BookingDetailsPage/>
    </Suspense>
  )
}