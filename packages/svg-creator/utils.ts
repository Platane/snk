export const h = (element: string, attributes: any) =>
  `<${element} ${toAttribute(attributes)}/>`;

export const toAttribute = (o: any) =>
  Object.entries(o)
    .filter(([, value]) => value !== null)
    .map(([name, value]) => `${name}="${value}"`)
    .join(" ");
