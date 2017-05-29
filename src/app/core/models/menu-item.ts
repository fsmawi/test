/**
 * MenuItem Model
 */
export class MenuItem {

  /**
   * Menu Item text
   * @type {string}
   */
  text: string;

  /**
   * Menu Item link
   * @type {string}
   */
  link: string;

  /**
   * Menu Item link
   * @type {string}
   */
  target = '_self';

  /**
   * Copy to clipboard input text
   * @type {string}
   */
  clipboard: string;

  /**
   * Creates a Repository object
   * @param obj {any} Base object to use
   */
  constructor(obj: any = {}) {
    Object.assign(this, obj);
  }
}
