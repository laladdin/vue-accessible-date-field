declare module "*.svg" {
  const content: SVGElement;
  export default content;
}

declare module "*.png" {
  const value: string;
  export default value;
}