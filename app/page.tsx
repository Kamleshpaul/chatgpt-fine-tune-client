import FilesTable from '@/components/FilesTable';
import FineTunesTable from '@/components/FineTunesTable';
import { Configuration, OpenAIApi } from 'openai';
import React from 'react';

export default async function Home() {

  const openai = new OpenAIApi(
    new Configuration({
      apiKey: process.env.API_KEY || "",
    })
  );

  const listFiles = await openai.listFiles();
  const files = listFiles.data.data;

  const listFineTunes = await openai.listFineTunes();
  const fineTunes = listFineTunes.data.data;


  return (
    <div className="w-screen h-screen">
      <h1 className="py-5 text-3xl font-bold text-center">Chat GPT Fine-tune</h1>
      <FilesTable files={files} />
      <FineTunesTable fineTunes={fineTunes} />
    </div>
  );
}
