'use server'

import { revalidatePath } from "next/cache";
import { Configuration, OpenAIApi } from "openai";
const fs = require("fs");


const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY || "",
  })
);

export async function handleDelete(id: string) {
  await openai.deleteFile(id);
  revalidatePath('/');
}

export async function handleView(id: string) {
  const res = await openai.downloadFile(id);
  return res.data;
}

export async function handleUpload(path: any) {
  const res = await openai.createFile(
    fs.createReadStream(path),
    'fine-tune'
  );
  return res.data;
}

export async function handleCreateFineTune(fileId: string) {
  await openai.createFineTune({
    training_file: fileId,
    model: 'davinci'
  })
  revalidatePath('/');
}

export async function handleCancelFineTune(id: string) {
  await openai.cancelFineTune(id);
  revalidatePath('/');
}


export async function handleViewFineTune(id: string) {
  const res = await openai.listFineTuneEvents(id);
  return res.data;
}

export async function handleDeleteModal(modalId: string) {
  const res = await openai.deleteModel(modalId);
  console.log({ res });
  revalidatePath('/');
}