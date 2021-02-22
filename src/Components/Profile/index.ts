/**
 * @author Mohammed Arqam Ali Saad <arqam.ali16@gmail.com>
 * @description Container component for Login page
 */

import Profile from './Profile';
import DashboardLogic from '../../Logics/dashboardLogic';
import LayoutLogic from '../../Logics/layoutLogic';

export default LayoutLogic(DashboardLogic(Profile));
