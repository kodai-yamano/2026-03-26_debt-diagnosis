import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "借金タイプ診断 | あなたに合った返済方法を見つけよう",
  description:
    "あなたの性格や行動パターンから「借金タイプ」を診断し、あなたに合った返済方法をご提案します。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
