/**
 * Repository Model
 */
export class Repository {
  /**
   * Repository URL
   */
  url: string;

  /**
   * Repository Name
   */
  full_name: string;

  /**
   * Repository Description
   */
  description: string;

  /**
   * Repository type
   * @type {string}
   */
  type = '';

  /**
   * Creates a Repository object
   * @param obj {any} Base object to use
   */
  constructor(obj: any = {}) {
    Object.assign(this, obj);
  }
}
