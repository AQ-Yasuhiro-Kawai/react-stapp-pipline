import type { ConvertedPdf, Project } from "@/domain/Projects/type";
import type { StoreSlice } from "../store";

type Status = "idle" | "converting" | "converted" | "failed";
/**
 * 正文書登録申請で登録するファイル(pdf)を管理するスライス
 * 下記2点を管理する
 * 1. プロジェクトトップ画面のトレイに追加されたファイル
 * 2. 申請画面で選択されたファイル
 */
type Files = {
  projectId: Project["projectId"];
  // PDF変換前の元のファイル情報
  originalItemInfo: {
    // 基本的にはAPI-002-01 ファイル一覧取得APIからのレスポンス内容が入る想定
    url: Project["items"][number]["url"];
    folderName: Project["items"][number]["parentReferencePath"]; // ファイルが属している階層のパス
    fileName: Project["items"][number]["itemName"];
    fileId: Project["items"][number]["providerItemId"]; // SharePoint上のファイルID
    lastUpdatedAt: Project["items"][number]["lastModifiedAt"];
    version: Project["items"][number]["version"];
  };
  // PDF変換リクエストのid 変換不要のファイルも一度PDF変換リクエストをするので必ず存在する
  // ただし、PDF変換APIのレスポンスでrequestIdが返ってくるのでundefined許容
  requestId?: ConvertedPdf["requestId"];
  originalFileBlobUrl?: string; // 元のファイルのBlob URL
  generatedFileBlobUrl?: string; // 変換後のファイルのBlob URL
  fileContentHash?: ConvertedPdf["fileContentHash"]; // ファイルのコンテンツハッシュ
  status: Status;
};

type FileState = {
  // 新規に選択したファイル。変換APIを呼び出す前の状態。申請画面でのみ使用する想定
  selectedFiles: Files[];
  // トレイに追加されたファイル or 申請画面で表示されているファイル。変換中|変換完了の両方を含む。ただし変換中のfileはrequestIdが無い
  files: Files[];
};

type FileActions = {
  // 行クリックによって選択されたファイルを状態で持っておく
  selectFile: (file: Files) => void;
  startConversion: () => void;
  addFiles: (files: Files[]) => void;
  removeFile: (fileId: Project["items"][number]["providerItemId"]) => void;
  completeFileConversion: ({
    providerItemId,
    requestId,
    originalFileBlobUrl,
    generatedFileBlobUrl,
    fileContentHash,
  }: {
    providerItemId: Project["items"][number]["providerItemId"];
    requestId?: ConvertedPdf["requestId"];
    originalFileBlobUrl?: string;
    generatedFileBlobUrl?: string;
    fileContentHash?: ConvertedPdf["fileContentHash"];
  }) => void;
  reset: () => void;
};

type Selector = {
  // ファイルのステータスが変換中のものがあるかどうか確認する関数
  isConverting: () => boolean;
};

export type FileSlice = FileState & FileActions & Selector;

const initialState: FileState = {
  selectedFiles: [],
  files: [],
};

export const createPdfFileSlice: StoreSlice<FileSlice> = (set, get) => ({
  ...initialState,

  selectFile: (file: Files) =>
    set((state) => {
      // 既に選択されているファイルなら削除
      const existingIndex = state.selectedFiles.findIndex(
        (f) => f.originalItemInfo.fileId === file.originalItemInfo.fileId,
      );
      if (existingIndex !== -1) {
        state.selectedFiles.splice(existingIndex, 1);
        return;
      }
      state.selectedFiles.push(file);
    }),

  startConversion: () =>
    set((state) => {
      // state.filesにstate.selectedFilesの要素のproviderItemIdと同じ要素がある場合は追加しないのでfilterする
      const existingFileIds = new Set(
        state.files.map((file) => file.originalItemInfo.fileId),
      );
      state.selectedFiles = state.selectedFiles.filter(
        (file) => !existingFileIds.has(file.originalItemInfo.fileId),
      );
      const startConversionFiles = state.selectedFiles.map((file) => ({
        ...file,
        status: "converting" as Status,
      }));

      state.files = [...state.files, ...startConversionFiles];
      state.selectedFiles = [];
    }),

  addFiles: (files: Files[]) =>
    set((state) => {
      state.files = [...state.files, ...files];
    }),

  removeFile: (fileId: Project["items"][number]["providerItemId"]) =>
    set((state) => {
      state.files = state.files.filter(
        (file) => file.originalItemInfo.fileId !== fileId,
      );
    }),
  completeFileConversion: ({
    providerItemId,
    requestId,
    originalFileBlobUrl,
    generatedFileBlobUrl,
    fileContentHash,
  }) =>
    set((state) => {
      state.files = state.files.map((file) => {
        if (file.originalItemInfo.fileId === providerItemId) {
          return {
            ...file,
            requestId: requestId ?? file.requestId,
            originalFileBlobUrl:
              originalFileBlobUrl ?? file.originalFileBlobUrl,
            generatedFileBlobUrl:
              generatedFileBlobUrl ?? file.generatedFileBlobUrl,
            fileContentHash: fileContentHash ?? file.fileContentHash,
            status: requestId ? "converted" : "failed",
          };
        }
        return file;
      });
    }),
  isConverting: () => {
    const { files } = get();
    return files.some((file) => file.status === "converting");
  },
  reset: () => set(initialState),
});

// selector
export const pdfFileSelector = (state: FileSlice) => ({
  files: state.files,
  selectedFiles: state.selectedFiles,
  selectFile: state.selectFile,
  addFiles: state.addFiles,
  removeFile: state.removeFile,
  completeFileConversion: state.completeFileConversion,
  startConversion: state.startConversion,
  isConverting: state.isConverting,
  reset: state.reset,
});
