import CredCategory from './Main';
import AddCredCatLogic from '../../Logics/addCredCategoryLogic';
import ProcessLogic from '../../Logics/processManagement';

export default AddCredCatLogic(ProcessLogic(CredCategory));
