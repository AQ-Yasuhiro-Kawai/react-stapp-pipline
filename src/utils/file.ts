/**
 * バイト単位のファイルサイズを、GB, MB, KBに変換します。
 * 1以上の数値で表現できる最大の単位を選択し、小数点第一位まで表示します。
 *
 * @param props - sizeプロパティを持つオブジェクト
 * @param props.size - バイト単位のファイルサイズ
 * @returns フォーマットされた文字列 (例: "1.5 GB", "200 MB", "50 KB")
 */
export const formatBytes = (props: { size: number }): string => {
  const { size } = props;

  if (size <= 0) {
    return "0 KB";
  }

  const KB = 1024;
  const MB = KB * 1024;
  const GB = MB * 1024;

  if (size >= GB) {
    const result = size / GB;
    // toFixed(1)で小数点第一位に丸め、parseFloatで末尾の不要な`.0`を削除
    return `${parseFloat(result.toFixed(1))} GB`;
  }

  if (size >= MB) {
    const result = size / MB;
    return `${parseFloat(result.toFixed(1))} MB`;
  }

  // 上記の条件に当てはまらない場合はKB単位で返す
  const result = size / KB;
  return `${parseFloat(result.toFixed(1))} KB`;
};

/**
 * サイズが5GB未満かどうかを判定する。
 *
 * @param props - sizeプロパティを持つオブジェクト
 * @param props.size - バイト単位のサイズ
 * @returns サイズが5GB未満の場合はtrue、5GB以上の場合はfalseを返す。
 */
export const isSizeUnder5GB = (props: { size: number }): boolean => {
  const { size } = props;

  // 1GBをバイト単位で定義
  const GIGABYTE = 1024 * 1024 * 1024;

  // 5GBをバイト単位で計算
  const FIVE_GIGABYTES = 5 * GIGABYTE;

  return size < FIVE_GIGABYTES;
};
