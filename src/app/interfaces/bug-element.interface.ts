export class BugElement {
    label: string;
    dataLabel: string;
    xPath: string;
    constructor(label: string, xPath: string, dataLabel: string){
      this.label = label;
      this.dataLabel = dataLabel;
      this.xPath = xPath;
    }
}