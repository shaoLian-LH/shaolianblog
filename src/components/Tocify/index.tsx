import { last } from 'lodash';
import React from 'react';
import './tocify.scss';
import $ from 'jquery';
export interface TocItem {
  anchor: string;
  level: number;
  text: string;
  children?: TocItem[];
}

export type TocItems = TocItem[]; // TOC目录树结构

class Tocify {
  tocItems: TocItems = [];
  targetContainer : string;
  index: number = 0;
  choiceItem: string = '';

  constructor() {
    this.tocItems = [];
    this.index = 0;
    this.targetContainer = '';
    this.choiceItem = '';
  }

  setContainer(target :string){
    this.targetContainer = target;
  }

  changeChoiceItem(targetAnchor: string) {
    if(targetAnchor !== this.choiceItem) {
      let pre;
      if(this.choiceItem === ''){
        pre = $(`.active-li`);
      } else {
        pre = $(`.${this.choiceItem}`);
      }
      if(pre) {
        pre.removeClass('active-li');
      }
      this.choiceItem = targetAnchor;
      const next = $(`.${targetAnchor}`);
      if(next) {
        next.addClass('active-li');
      }
    }
  }

  add(text: string, level: number) {
    const anchor = `toc${level}${++this.index}`;
    const item = { anchor, level, text };
    const items = this.tocItems;

    // 没有选择目标时获取遍历的第一个anchor
    if(this.choiceItem === '') {
      this.choiceItem = anchor;
    }

    // 第一个 item 直接 push
    if (items.length === 0) { 
      items.push(item);
    } else {
      let lastItem = last(items) as TocItem; // 最后一个 item

      if (item.level > lastItem.level) { // item 是 lastItem 的 children
        for (let i = lastItem.level + 1; i <= 2; i++) {
          const { children } = lastItem;
          if (!children) { // 如果 children 不存在
            lastItem.children = [item];
            break;
          }

          lastItem = last(children) as TocItem; // 重置 lastItem 为 children 的最后一个 item

          if (item.level <= lastItem.level) { // item level 小于或等于 lastItem level 都视为与 children 同级
            children.push(item);
            break;
          }
        }
      } else { // 置于最顶级
        items.push(item);
      }
    }

    return anchor;
  }

  reset = () => {
    this.tocItems = [];
    this.index = 0;
    this.choiceItem = '';
  };

  
  // 解决在hash中无法跳转的问题
  scrollToTagetDoc = (item: TocItem) => {
    if (item.anchor && !item.children) {
      let anchorElement = document.getElementById(item.anchor) as HTMLElement;
      // 如果对应id的锚点存在，就跳转到锚点
      if(anchorElement) { 
        anchorElement.scrollIntoView(
          { 
            behavior: "smooth", 
            block: "start", 
            inline: "nearest"
          }
        ); 
      }
      this.choiceItem = item.anchor;
      
    }
  }

  // 递归 render
  renderToc(items: TocItem[]) { 
    return items.map(item => (
      <ul 
        key = { `ul-${item.anchor}` } 
      >
        <li 
          className = { this.choiceItem === item.anchor ? `active-li ${item.anchor}` : `normal-li ${item.anchor}` }
          key = { item.anchor }
          onClick = { () => { this.scrollToTagetDoc(item) } }
          > 
            { item.text }
            {item.children && this.renderToc(item.children)}
        </li>
      </ul>
    ));
  }

  render() {
    return (
      <div className = 'tocify-div'>
         { this.renderToc(this.tocItems) }
      </div>
    );
  }
}

export default Tocify;