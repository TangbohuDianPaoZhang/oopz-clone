"use client";

import { useState } from "react";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
  onChange: (file?: {
    fileUrl: string;
    fileType: string;
    fileName: string;
  }) => void;
  value?: {
    fileUrl: string;
    fileType: string;
    fileName: string;
  };
  endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({
  onChange,
  value,
  endpoint
}: FileUploadProps) => {

  const [fileType, setFileType] = useState<string>("");
  const [fileName, setFileName] = useState("");

  const isImage = fileType.startsWith("image/");
  const isPdf = fileType === "application/pdf";
  console.log("file name is" + value?.fileName);


  if (value && isImage) {
    return (
      <div className="relative h-20 w-20">
        <Image
          fill
          src={value.fileUrl}
          alt="Upload"
          className="rounded-full"
        />

        <button
          onClick={() => {
            onChange(undefined);
          }}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }


  if (value && isPdf) {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {value?.fileName}
        </a>
        <button
          onClick={() => {
            onChange(undefined);
          }}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>

      </div>
    );
  }


  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        const file = res?.[0];

        if (!file) return;

        onChange({
          fileUrl: file.ufsUrl,
          fileType: file.type,
          fileName: file.name
        });
        setFileType(file.type);
        setFileName(file.name);

        console.log(file);
      }}

      onUploadError={(error) => {
        console.log(error);
      }}
    />
  );
};