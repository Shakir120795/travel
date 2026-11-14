import ClientApp from "@/components/ClientApp";
import { packages } from "@/content/site";
export default function Page(){
  const jsonLd = {"@context":"https://schema.org","@type":"TravelAgency", name:"[PLACEHOLDER Brand]", description:"Private Agra tours with a local driver-guide host.", areaServed:"Agra, India", makesOffer: packages.map(p=>({"@type":"TouristTrip", name:p.title, description:p.route}))};
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/><ClientApp/></>);
}
