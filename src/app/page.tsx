"use client";

import SampleForm from "@/components/common/Form/SampleForm";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.40:8080/sectiondetails/SectionDetails13"
        );
        if (response.data) {
          setData(response.data);        
  
        } else {
          console.warn("No data received");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Stop loading when API call is done
      }
    };

    fetchData();
  }, []);

  // Early return for loading state
  if (loading) return <p>Loading...</p>;

  // Early return for no data
  if (data.length === 0) return <p>No data available</p>;

  // Render the form once the data is available
  return <SampleForm department={data[0]} />;
}
