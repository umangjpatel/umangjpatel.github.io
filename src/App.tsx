import { Card } from "@/components/ui/card";
import {BriefcaseBusiness, Users} from "lucide-react";

function WorkExCompanyCard({logoUrl, companyName, jobTitle, duration}: {logoUrl: string, companyName: string, jobTitle: string, duration: string}) {
    return (
        <div className="flex gap-4">
            <img src={`${logoUrl}`} className="size-10 rounded-sm"/>
            <div className="">
                <p className="">{companyName}</p>
                <p className="text-xs">{jobTitle}</p>
                <p className="text-xs">{duration}</p>
            </div>
        </div>
    )
}

function WorkExperience() {
    return (
        <div className="flex flex-col gap-4">
            <Card className="p-4">
                <Users color="orange" className="size-4"></Users>
                <h2 className="font-bold text-sm">Currently on</h2>
                <p>Working on Analytics team at Wind River</p>
            </Card>
            <Card className="p-4">
                <BriefcaseBusiness className="size-4" color="skyblue"/>
                <h2 className="font-bold text-sm">Past</h2>
                <WorkExCompanyCard
                    logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Kubernetes_logo_without_workmark.svg/960px-Kubernetes_logo_without_workmark.svg.png"
                    companyName="Ericsson"
                    jobTitle="Software Developer"
                    duration="2022-26"
                />
                <WorkExCompanyCard
                    logoUrl="https://images.icon-icons.com/2699/PNG/512/societegenerale_logo_icon_169742.png"
                    companyName="Societe Generale"
                    jobTitle="Software Analyst Intern"
                    duration="2021-22"
                />
            </Card>
        </div>
    )
}

function TechStacks() {
    // TODO: Add content later on
    return (
        <div className="flex flex-col gap-4">
            <Card className="p-4">
                <BriefcaseBusiness className="size-4" color="skyblue"/>
                <h2 className="font-bold text-sm">Tech Stacks</h2>
                <ul>
                    <li>Kubernetes</li>
                    <li>Docker</li>
                    <li>Helm</li>
                </ul>
            </Card>
        </div>
    )
}

function BentoGrid() {
    return (
        <div className="flex justify-self-center gap-6">
            <WorkExperience />
            <TechStacks />
        </div>
    )
}

export function App() {
  return (
    <div className="p-6">
      <h1 className="text-center mb-6 text-5xl">Hi, I'm Umang Patel</h1>
      <BentoGrid />
    </div>
  )
}

export default App
