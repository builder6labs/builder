import React from 'react';
import { RenderBuilderContent } from '@/components/builder6';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import BuilderJS from '@builder6/builder6.js' 

export const endpointUrl = "https://api.builder6.com"
export const apiKey = "ak-b48d25e0-c712-45c2-afc9-493ee01e2423"
export const baseId = "spc-6660429c6fe37305abdcf5e6"
export const adminBjs = new BuilderJS({endpointUrl, apiKey});


export const getProjectBySlug = async (baseId:string, projectSlug:string) => {

  const base = await adminBjs.base(baseId);

  const projects = await base('b6_projects').select({
    'filterByFormula': `slug === "${projectSlug}"`
  }).firstPage();
  

  if (!projects || projects.length === 0) {
    return null;
  }

  const project = projects[0].fields;

  return project
}
  
export const getProjectPageByUrl = async (baseId:string, projectId:string, pageUrl: string) => {

  const base = await adminBjs.base(baseId);

  const pages = await base("b6_pages").select({
    'filterByFormula': `AND(url === "${pageUrl}", project_id === "${projectId}")`
  }).firstPage();

  if (!pages || pages.length === 0) {
    return null;
  }
  
  const page = pages[0].fields
  return page
}

interface PageProps {
  params: {
    projectId: string;
    page: string[];
  };
}
 


export async function generateMetadata({ params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  
  const projectSlug = 'homepage';
  const pageUrl = '/' + (params.page?.join('/') || '');

  const project = await getProjectBySlug(baseId, projectSlug);
  if (!project) return {};

  const page = await getProjectPageByUrl(baseId, project._id as string, pageUrl) as any;
  return page && {
    title: `${page.name} - ${project.name}`,
    description: page.description || project.description
  }
}

 
export default async function Page({ params }: PageProps) {

  console.log('root', params)

  const projectSlug = 'homepage';
  
  const pageUrl = '/' + (params.page?.join('/') || '');

  const project = await getProjectBySlug(baseId, projectSlug);
  if (!project) return notFound();

  const page = await getProjectPageByUrl(baseId, project._id as string, pageUrl) as any;

  if (page && page.builder) {
    const builderJson = JSON.parse(page.builder)
    builderJson.name = page.name;
    return (
      <>
        {/* Render the Builder page */}
        <RenderBuilderContent content={builderJson}/>
      </>
    );
  }
  
  return notFound();

}