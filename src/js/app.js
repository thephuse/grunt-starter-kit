/** Modules */
import Page from './modules/page';
import Example from './modules/example';

const page = new Page();

/** All pages */
page.all(() => {
  let example = new Example();
});