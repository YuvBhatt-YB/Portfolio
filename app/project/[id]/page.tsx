

import { projects } from "@/app/data";
import Footer from "@/components/footer";
import ProjectContent from "@/components/project/ProjectContent";
import ProjectFooter from "@/components/project/ProjectFooter";
import ProjectHeader from "@/components/project/ProjectHeader";
import ProjectMainImage from "@/components/project/ProjectMainImage";
import ProjectSlider from "@/components/project/ProjectSlider";
import { notFound } from "next/navigation";
import ProjectClientLayout from "./ProjectClientLayout";


type ProjectData = {
    pId: number,
    project_name: string,
    project_img:string,
    project_main_img: string,
    slider_imgs: string[],
    stack: string[],
    role_description: string
}

function getProjectById(id: number): ProjectData | undefined {
    return  projects.find(project => project.pId === id)
}

export default async function ProjectPage({params}:{params:any}){
    const projectIndex:{id: string} = await params
    const index = Number(projectIndex.id)
    const projectData = getProjectById(index)

    if(!projectData){
        notFound()
    }
    
    const remainingProjects:ProjectData[] = projects.filter((project) => project.pId !== index)
    
    return (
        <ProjectClientLayout>
            <ProjectHeader projectTitle={projectData.project_name} projectStacks={projectData.stack} />
            <ProjectMainImage mainImage={projectData.project_main_img} />
            <ProjectContent roleDescription={projectData.role_description} />
            <ProjectSlider sliderImages={projectData.slider_imgs}  />
            <ProjectFooter remainingProjects={remainingProjects} />
            <Footer />
        </ProjectClientLayout>
    )
}