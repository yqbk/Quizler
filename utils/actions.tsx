import { NavigationActions } from 'react-navigation'

type RouteName = string

export function goBack(key: RouteName) {
  return NavigationActions.back({ key })
}
