import { StackNavigationOptions } from '@react-navigation/stack'
import { Home as HomeScreen } from '../screens/Home'
import { Map as MapScreen } from '../screens/Map'
import { AddPoint as AddPointScreen } from '../screens/Point/Add'
import { AddPointDetails as AddPointDetailsScreen } from '../screens/Point/Add/AddPointDetails'
import { DetailsPoint as DetailsPointScreen } from '../screens/Point/Details'
import { Account as AccountScreen } from '../screens/Account'
import { LoginAccount as LoginAccountScreen } from '../screens/Account/Login'
import { SignUpAccount as SignUpAccountScreen } from '../screens/Account/SignUp'
import { AddItem as AddItemScreen } from '../screens/Item/Add'

type RoutesProps = {
  name: string
  options: StackNavigationOptions
  component: () => JSX.Element
}

export enum RoutesName {
  HOME = 'home',
  MAPS = 'Maps',
  ADDNEWPOINT = 'AddPoint',
  ADDDETAILSNEWPOINT = 'AddPointDetails',
  DETAILSPOINT = 'DetailsPoint',
  ACCOUNT = 'Account',
  LOGIN = 'Login',
  SIGNUP = 'SignUp',
  ADDNEWITEM = 'AddItem'
}

const NotHeaderShown = {
  headerShown: false
}

const tintColor = '#285d19'

const NoTitleHeaderCustomTintColor = {
  title: '',
  headerTintColor: tintColor,
  headerTransparent: true
}

export const registerRoutes: RoutesProps[] = [
  {
    options: NotHeaderShown,
    component: HomeScreen,
    name: RoutesName.HOME
  },
  {
    options: NotHeaderShown,
    component: MapScreen,
    name: RoutesName.MAPS
  },
  {
    options: NoTitleHeaderCustomTintColor,
    component: AddPointScreen,
    name: RoutesName.ADDNEWPOINT
  },
  {
    options: NoTitleHeaderCustomTintColor,
    component: AddPointDetailsScreen,
    name: RoutesName.ADDDETAILSNEWPOINT
  },
  {
    options: NoTitleHeaderCustomTintColor,
    component: DetailsPointScreen,
    name: RoutesName.DETAILSPOINT
  },
  {
    options: NoTitleHeaderCustomTintColor,
    component: AccountScreen,
    name: RoutesName.ACCOUNT
  },
  {
    options: NoTitleHeaderCustomTintColor,
    component: LoginAccountScreen,
    name: RoutesName.LOGIN
  },
  {
    options: NoTitleHeaderCustomTintColor,
    component: SignUpAccountScreen,
    name: RoutesName.SIGNUP
  },
  {
    options: NoTitleHeaderCustomTintColor,
    component: AddItemScreen,
    name: RoutesName.ADDNEWITEM
  }
]
