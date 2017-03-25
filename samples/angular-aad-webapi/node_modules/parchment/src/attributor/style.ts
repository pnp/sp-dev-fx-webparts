import Attributor from './attributor';


function camelize(name: string): string {
  let parts = name.split('-');
  let rest = parts.slice(1).map(function(part) {
    return part[0].toUpperCase() + part.slice(1);
  }).join('');
  return parts[0] + rest;
}


class StyleAttributor extends Attributor {
  static keys(node): string[] {
    return (node.getAttribute('style') || '').split(';').map(function(value) {
      let arr = value.split(':');
      return arr[0].trim();
    });
  }

  add(node: HTMLElement, value: string): boolean {
    if (!this.canAdd(node, value)) return false;
    node.style[camelize(this.keyName)] = value;
    return true;
  }

  remove(node: HTMLElement): void {
    node.style[camelize(this.keyName)] = '';
    if (!node.getAttribute('style')) {
      node.removeAttribute('style');
    }
  }

  value(node: HTMLElement): string {
    return node.style[camelize(this.keyName)];
  }
}


export default StyleAttributor;
