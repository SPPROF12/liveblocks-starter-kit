import * as LinkModule from "./Link";

export { LinkModule };


export class Link {
  constructor(private url: string, private text: string) {}

  getUrl(): string {
    return this.url;
  }

  getText(): string {
    return this.text;
  }
}


declare module "./Link" {
  export class Link {
    constructor(url: string, text: string);
    getUrl(): string;
    getText(): string;
  }
}


npm install my-link-module


import { LinkModule } from "my-link-module";

const link = new LinkModule.Link("https://www.example.com", "Example");
console.log(link.getText()); // Example
console.log(link.getUrl()); // https://www.example.com
