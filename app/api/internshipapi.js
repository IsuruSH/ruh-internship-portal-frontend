
import axios from "axios";
import { env } from "process";


const url = `${process.env.NEXT_PUBLIC_API_URLL}`;
const saveinternshipdetails = async (internship) =>{
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URLL}api/internship-selection/save`, internship);
       
        alert("Internship details saved successfully!");
      } catch (error) {
        console.error("Error saving internship details:", error);
        alert("Failed to save internship details.");
  
      }
    };
export default saveinternshipdetails; // Default export