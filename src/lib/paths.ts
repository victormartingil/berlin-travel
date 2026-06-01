const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function appPath(path: string): string {
  if (!path.startsWith("/")) return `${basePath}/${path}`;
  return `${basePath}${path}`;
}

export function publicAssetPath(path: string): string {
  return appPath(path);
}

