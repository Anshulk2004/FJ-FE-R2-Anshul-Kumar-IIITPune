import { Suspense } from "react";
import BookingDetailsPage from "../../components/BookingDetailsComponent";

export default function AccountPage() {
  return (
   
    <Suspense>
      <BookingDetailsPage/>
    </Suspense>
  )
}