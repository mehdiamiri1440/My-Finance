import {registerSheet} from 'react-native-actions-sheet';
import AddingExplaintion from './addingExplaintion';
import BookCash from './bookcash';
import Filter from './filter';
import Calculator from './Calculator';
import ChooseImage from './choseImage';
import Notice from './notice';
import BankFilter from './BankFilter';

/**
 * Registering the sheets here because otherwise sheet closes on
 * hot reload during development.
 */
registerSheet('book-cash', BookCash);
registerSheet('filter', Filter);
registerSheet('addingExplaintion', AddingExplaintion);
registerSheet('calculator', Calculator);
registerSheet('choseImage', ChooseImage);
registerSheet('notice', Notice);
registerSheet('bankFilter', BankFilter);
export {};

/**
 * Since we are not importing our Sheets in any component or file, we want to make sure
 * they are bundled by the JS bundler. Hence we will import this file in App.js.
 */
