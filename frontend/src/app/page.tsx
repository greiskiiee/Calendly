import Image from "next/image";
import { ServiceCartComponent } from "../../components/ServiceCard";

export default function Home() {
  return (
    <div className="flex flex-wrap gap-8">
      <ServiceCartComponent />
      <ServiceCartComponent />
      <ServiceCartComponent />
      <ServiceCartComponent />
    </div>
  );
}
