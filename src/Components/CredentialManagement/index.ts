import CredentialManagement from './CredentialManagement';
import CredentialLogic from '../../Logics/credentialManagementLogic';
import ProcessLogic from '../../Logics/processManagement';

export default ProcessLogic(CredentialLogic(CredentialManagement));
