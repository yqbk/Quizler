import { NavigationActions } from 'react-navigation';

export function goBack(key) {
    return NavigationActions.back({ key });
}
