import { Component, ElementRef, Input, OnChanges, SimpleChange, ViewChild, Renderer2 } from '@angular/core';

import { Xml } from '../../utils/xml';

declare let document: any;
declare let Node: any;

@Component({
  selector: 'xmlview',
  templateUrl: './xmlview.component.html',
  styleUrls: ['./xmlview.component.css']
})
export class XmlviewComponent implements OnChanges {

  public static KEY = ' W0RTVV0gMTcvMTAvMTcgQ2l0eXdheSBhc3NvY2lhdGlvbiBkZSBtw6lkaW9jcmVzCg==';  
  private static MAX: number = 100;
  private counter: number = 0;

  @Input()
  private model: any;

  constructor(private elementRef: ElementRef,
    private renderer: Renderer2) { }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    this.update(changes['model'].currentValue);
  }

  private clear(parent: any) {
    if (parent.hasChildNodes()) {
      let children = parent.children;
      for (let i = 0; i < children.length; i++) {
        let child = children[i];
        this.renderer.removeChild(parent, child);
        child.textContent = '';
      }
    }
  }

  private update(model: any) {

    if (!this.isEmpty(model)) {

      const parent = this.elementRef.nativeElement;
      this.clear(parent);

      let tree = this.renderer.createElement('div');
      this.renderer.addClass(tree, 'pretty-print');
      this.renderer.appendChild(parent, tree);

      for (var child = model.firstChild; child; child = child.nextSibling) {
        this.processNode(tree, child);
      }

      this.initialize();
    }
  }

  private initialize() {
    let elements = document.querySelectorAll('.collapsible');
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];

      this.clear(element);
      this.createCollapsibleExpanded(element, element.data);

    }
  }

  private processNode(parent, node) {

    switch (node.nodeType) {
      case Node.ELEMENT_NODE:
        this.processElement(parent, node);
        break;
      case Node.TEXT_NODE:
        this.processText(parent, node);
        break;
      case Node.CDATA_SECTION_NODE:
        this.processCDATA(parent, node);
        break;
      case Node.PROCESSING_INSTRUCTION_NODE:
        this.processProcessingInstruction(parent, node);
        break;
      case Node.COMMENT_NODE:
        this.processComment(parent, node);
        break;
      default:
        break;
    }
  }

  private processText(parent, node) {
    this.createText(parent, node.nodeValue)
  }

  private processCDATA(parent, node) {
    if (this.isShort(node.nodeValue)) {
      let line = this.createLine(parent);
      this.createText(line, '<![CDATA[ ' + node.nodeValue + ' ]]>');
    } else {
      let collapsible = this.createCollapsibleCollapsed(parent, true);

      this.createText(collapsible.expanded.start, '<![CDATA[');
      this.createText(collapsible.expanded.content, node.nodeValue);
      this.createText(collapsible.expanded.end, ']]>');

      this.createText(collapsible.collapsed.content, '<![CDATA[');
      this.createText(collapsible.collapsed.content, '...');
      this.createText(collapsible.collapsed.content, ']]>');
    }
  }

  private processProcessingInstruction(parent, node) {
    if (this.isShort(node.nodeValue)) {
      let line = this.createLine(parent);
      this.createComment(line, '<?' + node.tagName + ' ' + node.nodeValue + '?>')
    } else {
      let collapsible = this.createCollapsibleCollapsed(parent, true);

      this.createComment(collapsible.expanded.start, '<?' + node.nodeName);
      this.createComment(collapsible.expanded.content, node.nodeValue);
      this.createComment(collapsible.expanded.end, '?>');

      this.createComment(collapsible.collapsed.content, '<?' + node.nodeName);
      this.createComment(collapsible.collapsed.content, '...');
      this.createComment(collapsible.collapsed.content, '?>');
    }
  }

  private processComment(parent, node) {
    if (this.isShort(node.nodeValue)) {
      let line = this.createLine(parent);
      this.createComment(line, '<!-- ' + node.nodeValue + ' -->');
    } else {
      let collapsible = this.createCollapsibleCollapsed(parent, true);

      this.createComment(collapsible.expanded.start, '<!--');
      this.createComment(collapsible.expanded.content, node.nodeValue);
      this.createComment(collapsible.expanded.end, '-->');

      this.createComment(collapsible.collapsed.content, '<!--');
      this.createComment(collapsible.collapsed.content, '...');
      this.createComment(collapsible.collapsed.content, '-->');
    }
  }

  private processElement(parent, node) {
    if (!node.firstChild)
      this.processEmptyElement(parent, node);
    else {
      let child = node.firstChild;
      if (child.nodeType == Node.TEXT_NODE && this.isShort(child.nodeValue) && !child.nextSibling)
        this.processShortTextOnlyElement(parent, node);
      else
        this.processComplexElement(parent, node);
    }
  }

  private processEmptyElement(parent, node) {
    let line = this.createLine(parent);
    this.createTag(line, node, false, true);
  }

  private processShortTextOnlyElement(parent, node) {
    let line = this.createLine(parent);
    this.createTag(line, node, false, false);
    for (let child = node.firstChild; child; child = child.nextSibling) {
      this.createText(line, child.nodeValue);
    }
    this.createTag(line, node, true, false);
  }

  private processComplexElement(parent, node) {
    this.createCollapsible(parent, node);
  }

  private expand(parent: any, node: any, min?: number, max?: number) {
    return () => {
      this.clear(parent);
      this.createCollapsibleExpanded(parent, node, min, max);
    };
  }

  private collapse(parent: any, node: any, min?: number, max?: number) {
    return () => {
      this.clear(parent);
      this.createCollapsibleCollapsed(parent, node, min, max);
    };
  }

  private createCollapsible(parent: any, node: any, min?: number, max?: number) {
    let collapsible = this.createHtmlElement(parent, 'div', ['collapsible']);
    collapsible.data = node;
    collapsible.min = min;
    collapsible.max = max;
    this.renderer.setProperty(collapsible, 'id', 'collapsible' + this.counter++);
    this.createCollapsibleCollapsed(collapsible, node, min, max);
    return collapsible;
  }

  private createCollapsibleExpanded(parent: any, node: any, min?: number, max?: number) {
    let expanded = this.createHtmlElement(parent, 'div', ['expanded']);
    expanded.start = this.createLine(expanded);

    let collapseButton = this.createCollapseButton(expanded.start);
    collapseButton.onclick = this.collapse(parent, node, min, max);
    collapseButton.onmousedown = (e) => e.preventDefault();
    expanded.content = this.createHtmlElement(expanded, 'div', ['collapsible-content']);
    expanded.end = this.createLine(expanded);

    if (min !== undefined && max !== undefined) {

      let tag = this.createHtmlElement(expanded.start, 'span', ['html-tag']);
      let text = this.renderer.createText('[' + min + '...' + max + ']');
      this.renderer.appendChild(tag, text);

      let children = node.childNodes;
      for (let i = min; i < max; i++) {
        let child = children[i];
        this.processNode(expanded.content, child);
      }
    } else {
      this.createTag(expanded.start, node, false, false);
      let children = node.childNodes;
      if (children.length < XmlviewComponent.MAX) {
        for (let child = node.firstChild; child; child = child.nextSibling) {
          this.processNode(expanded.content, child);
        }
      } else {
        let n = Math.ceil(children.length / XmlviewComponent.MAX);
        for (let i = 0; i < n; i++) {
          let min = i * XmlviewComponent.MAX;
          let max = Math.min(children.length, (i + 1) * XmlviewComponent.MAX - 1);
          this.createCollapsible(expanded.content, node, min, max);
        }
      }
      this.createTag(expanded.end, node, true, false);
    }

    return expanded;
  }

  private createCollapsibleCollapsed(parent: any, node: any, min?: number, max?: number) {

    let collapsed = this.createHtmlElement(parent, 'div', ['collapsed']);

    collapsed.content = this.createLine(collapsed);
    let expandButton = this.createExpandButton(collapsed.content);
    expandButton.onclick = this.expand(parent, node, min, max);
    expandButton.onmousedown = (e) => e.preventDefault();

    if (min !== undefined && max !== undefined) {
      let tag = this.createHtmlElement(collapsed.content, 'span', ['html-tag']);
      let text = this.renderer.createText('[' + min + '...' + max + ']');
      this.renderer.appendChild(tag, text);
    } else {
      this.createTag(collapsed.content, node, false, false);
      this.createText(collapsed.content, '...');
      this.createTag(collapsed.content, node, true, false);
    }

    return collapsed;
  }

  private createCollapseButton(parent: any) {
    return this.createHtmlElement(parent, 'span', ['button', 'collapse-button']);
  }

  private createExpandButton(parent: any) {
    return this.createHtmlElement(parent, 'span', ['button', 'expand-button']);
  }

  private createComment(parent: any, value: string) {
    return this.createHtmlElement(parent, 'span', ['html-comment'], value);
  }

  private createText(parent: any, value) {
    return this.createHtmlElement(parent, 'span', ['text'], value);
  }

  private createLine(parent: any) {
    return this.createHtmlElement(parent, 'div', ['line']);
  }

  private createHtmlElement(parent: any, name: string, classes: string[], value?: string) {
    let element = this.renderer.createElement(name);
    classes.forEach(name => this.renderer.addClass(element, name));
    if (value) {
      let text = this.renderer.createText(this.trim(value));
      this.renderer.appendChild(element, text);
    }
    this.renderer.appendChild(parent, element);
    return element;
  }

  private createTag(parent: any, node: any, closed: boolean, empty: boolean) {

    let tag = this.createHtmlElement(parent, 'span', ['html-tag']);

    let stringBeforeAttrs = '<';
    if (closed) {
      stringBeforeAttrs += '/';
    }
    stringBeforeAttrs += node.nodeName;
    let textBeforeAttrs = this.renderer.createText(stringBeforeAttrs);
    this.renderer.appendChild(tag, textBeforeAttrs);

    if (!closed) {
      for (let i = 0; i < node.attributes.length; i++) {
        let attribute = this.createAttribute(tag, node.attributes[i])
      }
    }

    let stringAfterAttrs = '';
    if (empty) {
      stringAfterAttrs += '/';
    }
    stringAfterAttrs += '>';
    let textAfterAttrs = this.renderer.createText(stringAfterAttrs);
    this.renderer.appendChild(tag, textAfterAttrs);

    return tag;
  }

  private createAttribute(parent: any, node: any) {

    let attribute = this.createHtmlElement(parent, 'span', ['html-attribute']);

    let textBefore = this.renderer.createText(' ');
    this.renderer.appendChild(attribute, textBefore);

    let attributeName = this.createHtmlElement(attribute, 'span', ['html-attribute-name'], node.name);

    let textBetween = this.renderer.createText('="');
    this.renderer.appendChild(attribute, textBetween);

    let attributeValue = this.createHtmlElement(attribute, 'span', ['html-attribute-value'], node.value);
    this.renderer.appendChild(attribute, attributeValue);

    let textAfter = this.renderer.createText('"');
    this.renderer.appendChild(attribute, textAfter);

    return attribute;
  }

  private trim(value) {
    return value.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  }

  private isShort(value) {
    return this.trim(value).length <= 50;
  }

  private isEmpty(o: any) {
    return (o === undefined || o === null || Object.keys(o).length === 0 && o.constructor === Object);
  }
}
