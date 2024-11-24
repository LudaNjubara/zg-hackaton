import { Header } from "@/components/common";
import { Link } from "react-router-dom";


export function GuestPage()
{
    
    return (<>
    <p className="mt-4 text-center text-xl leading-relaxed text-slate-800">You are logged in as guest for demonstration purpuses.</p>
    <p className="mt-4 text-center text-xl leading-relaxed text-slate-800">
        <Link
          to="/feed"
          className="py-1 px-2 rounded-sm bg-slate-900 text-slate-500 hover:bg-slate-800 transition-colors duration-300"
        >
          Home
        </Link>
      </p>
      <Header /></>);
}