import Form from "@/components/auth/login";  // Import the login form component
import ProductComponent from "../components/Product/Product";  // Import the product component
import { useEffect, useState } from "react";
import Loader from '@/ui/loader'   // Import the loader component
export default function Home() {
  const [authVal, setAuthVal] = useState<string | undefined>();   // State to store auth token value
  const [isLoading, setIsLoading] = useState(true);  // State to manage loading status

  useEffect(() => {
    let value = localStorage.getItem('authToken');  // Get auth token from localStorage
    if (value) {
      setAuthVal(value);  // Set auth token state if available
    }
    setIsLoading(false); // Set loading to false after checking localStorage
  }, [])

  if (isLoading) {
    return <Loader />   // Show loader while checking auth token
  }

  return (
    <>
      {authVal ?
        <ProductComponent />
        :
        <Form setAuthVal={setAuthVal} />
      }
    </>
  );
}
