import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export function customerService() {
  return htmlSafe(`<a href='mailto:customerservice@barbershop.org'>customerservice@barbershop.org</a>`)
}

export default helper(customerService);
