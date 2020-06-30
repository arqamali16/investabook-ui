/**
 * @author Mohammed Arqam Ali Saad <arqam.ali16@gmail.com>
 * @description Menu Config Definition
 */


/**
 * Function to get the menu configurations
 * @function getMenuConfig
 */
export const getMenuConfig = () => {
  const config = [
    {
      url: '/home-tax',
      component: 'HouseTax',
      icon: 'home',
      label: 'House Tax'
    },
    {
      url: '/land-payments',
      component: 'LandEmi',
      icon: 'home',
      label: 'Land EMIs'
    }
  ]
  return config
}

