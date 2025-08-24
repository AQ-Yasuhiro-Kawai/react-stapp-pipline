import { File, FileQuestion, FileText, Folder } from "lucide-react";
import { Icon } from "./index";

const fileIconMap = {
  word: <Icon className="w-6 h-6" type="word" />,
  excel: <Icon className="w-6 h-6" type="excel" />,
  powerpoint: <Icon className="w-6 h-6" type="powerpoint" />,
  sharePoint: <Icon className="w-6 h-6" type="sharePoint" />,
  circleStop: <Icon className="w-6 h-6" type="circleStop" />,
  pdf: <File className="w-6 h-6" />,
  folder: <Folder className="w-6 h-6" />,
  fileText: <FileText className="w-6 h-6" />,
  fileQuestion: <FileQuestion className="w-6 h-6" />,
};

export const getIconForFileName = (extension: string) => {
  const key = extension.toLowerCase();

  switch (key) {
    case "doc":
    case "docx":
      return fileIconMap.word;
    case "xls":
    case "xlsx":
      return fileIconMap.excel;
    case "ppt":
    case "pptx":
      return fileIconMap.powerpoint;
    case "pdf":
      return fileIconMap.pdf;
    case "txt":
      return fileIconMap.fileText;
    case "folder":
      return fileIconMap.folder;
    default:
      return fileIconMap.fileQuestion; // デフォルトのアイコン
  }
};
